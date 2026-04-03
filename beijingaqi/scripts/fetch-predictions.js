// Beijing AQI - Fetch Predictions Script
// Run by GitHub Actions every 3 hours to archive predictions

const fs = require('fs');
const path = require('path');

// Configuration (duplicated from config.js for Node.js compatibility)
const BEIJING_CENTER = { lat: 39.9042, lon: 116.4074 };
const RADIUS_KM = 300;
const GRID_RESOLUTION = 0.4;
const KM_PER_DEG_LAT = 111;
const KM_PER_DEG_LON = 85;

const API_CONFIG = {
    airQualityBase: 'https://air-quality-api.open-meteo.com/v1/air-quality',
    weatherBase: 'https://api.open-meteo.com/v1/forecast',
    pastDays: 7,
    forecastDays: 5,
    batchSize: 50
};

// US EPA AQI breakpoints for PM2.5 (μg/m³)
const PM25_BREAKPOINTS = [
    { cLow: 0, cHigh: 12.0, iLow: 0, iHigh: 50 },
    { cLow: 12.1, cHigh: 35.4, iLow: 51, iHigh: 100 },
    { cLow: 35.5, cHigh: 55.4, iLow: 101, iHigh: 150 },
    { cLow: 55.5, cHigh: 150.4, iLow: 151, iHigh: 200 },
    { cLow: 150.5, cHigh: 250.4, iLow: 201, iHigh: 300 },
    { cLow: 250.5, cHigh: 350.4, iLow: 301, iHigh: 400 },
    { cLow: 350.5, cHigh: 500.4, iLow: 401, iHigh: 500 }
];

// Calculate US EPA AQI from PM2.5 concentration
function calculateAQI(pm25) {
    if (pm25 === null || pm25 === undefined || pm25 < 0) return null;
    const c = Math.floor(pm25 * 10) / 10;
    for (const bp of PM25_BREAKPOINTS) {
        if (c <= bp.cHigh) {
            const aqi = ((bp.iHigh - bp.iLow) / (bp.cHigh - bp.cLow)) * (c - bp.cLow) + bp.iLow;
            return Math.round(aqi);
        }
    }
    return 500;
}

// Haversine distance
function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Generate grid points
function generateGridPoints() {
    const points = [];
    const latRange = RADIUS_KM / KM_PER_DEG_LAT;
    const lonRange = RADIUS_KM / KM_PER_DEG_LON;

    const minLat = BEIJING_CENTER.lat - latRange;
    const maxLat = BEIJING_CENTER.lat + latRange;
    const minLon = BEIJING_CENTER.lon - lonRange;
    const maxLon = BEIJING_CENTER.lon + lonRange;

    for (let lat = minLat; lat <= maxLat; lat += GRID_RESOLUTION) {
        for (let lon = minLon; lon <= maxLon; lon += GRID_RESOLUTION) {
            const distKm = haversineDistance(BEIJING_CENTER.lat, BEIJING_CENTER.lon, lat, lon);
            if (distKm <= RADIUS_KM) {
                points.push({
                    lat: Math.round(lat * 100) / 100,
                    lon: Math.round(lon * 100) / 100
                });
            }
        }
    }

    return points;
}

// Chunk array
function chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

// Fetch with retry
async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return await response.json();
        } catch (e) {
            console.log(`Attempt ${i + 1} failed: ${e.message}`);
            if (i === retries - 1) throw e;
            await new Promise(r => setTimeout(r, 2000 * (i + 1)));
        }
    }
}

// Fetch air quality batch
async function fetchAirQualityBatch(points) {
    const lats = points.map(p => p.lat).join(',');
    const lons = points.map(p => p.lon).join(',');

    const url = `${API_CONFIG.airQualityBase}?latitude=${lats}&longitude=${lons}&hourly=pm2_5,pm10,nitrogen_dioxide,sulphur_dioxide,us_aqi,ozone&past_days=${API_CONFIG.pastDays}&forecast_days=${API_CONFIG.forecastDays}`;

    return fetchWithRetry(url);
}

// Fetch weather batch
async function fetchWeatherBatch(points) {
    const lats = points.map(p => p.lat).join(',');
    const lons = points.map(p => p.lon).join(',');

    const url = `${API_CONFIG.weatherBase}?latitude=${lats}&longitude=${lons}&hourly=wind_speed_10m,wind_direction_10m,relative_humidity_2m&past_days=${API_CONFIG.pastDays}&forecast_days=${API_CONFIG.forecastDays}`;

    return fetchWithRetry(url);
}

// Merge data
function mergeLocationData(aqData, weatherData) {
    // Calculate AQI from PM2.5 using EPA formula (Open-Meteo's us_aqi is buggy)
    const calculatedAQI = aqData.hourly.pm2_5.map(pm25 => calculateAQI(pm25));

    return {
        lat: aqData.latitude,
        lon: aqData.longitude,
        hourly: {
            time: aqData.hourly.time,
            pm2_5: aqData.hourly.pm2_5,
            pm10: aqData.hourly.pm10,
            nitrogen_dioxide: aqData.hourly.nitrogen_dioxide,
            sulphur_dioxide: aqData.hourly.sulphur_dioxide,
            us_aqi: calculatedAQI,
            ozone: aqData.hourly.ozone,
            wind_speed_10m: weatherData.hourly.wind_speed_10m,
            wind_direction_10m: weatherData.hourly.wind_direction_10m,
            relative_humidity_2m: weatherData.hourly.relative_humidity_2m
        }
    };
}

// Main fetch function
async function fetchAllData() {
    const gridPoints = generateGridPoints();
    console.log(`Fetching data for ${gridPoints.length} grid points...`);

    const batches = chunkArray(gridPoints, API_CONFIG.batchSize);
    const allGridData = [];

    for (let i = 0; i < batches.length; i++) {
        const batch = batches[i];
        console.log(`Fetching batch ${i + 1}/${batches.length} (${batch.length} points)...`);

        const [aqResponse, weatherResponse] = await Promise.all([
            fetchAirQualityBatch(batch),
            fetchWeatherBatch(batch)
        ]);

        // Handle single vs multiple locations
        const aqDataArray = Array.isArray(aqResponse) ? aqResponse : [aqResponse];
        const weatherDataArray = Array.isArray(weatherResponse) ? weatherResponse : [weatherResponse];

        for (let j = 0; j < batch.length; j++) {
            const merged = mergeLocationData(aqDataArray[j], weatherDataArray[j]);
            allGridData.push(merged);
        }

        // Rate limiting - wait 500ms between batches
        if (i < batches.length - 1) {
            await new Promise(r => setTimeout(r, 500));
        }
    }

    return {
        fetched_at: new Date().toISOString(),
        grid_points: allGridData
    };
}

// Update index file
function updateIndex(newFilename) {
    const indexPath = path.join(__dirname, '..', 'data', 'predictions', 'index.json');

    let index = { files: [] };
    if (fs.existsSync(indexPath)) {
        index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    }

    // Add new file if not already present
    if (!index.files.includes(newFilename)) {
        index.files.push(newFilename);
    }

    // Keep only last 60 files (about 7.5 days at 3-hour intervals)
    index.files.sort();
    if (index.files.length > 60) {
        const toRemove = index.files.slice(0, index.files.length - 60);
        index.files = index.files.slice(-60);

        // Delete old files
        toRemove.forEach(filename => {
            const filePath = path.join(__dirname, '..', 'data', 'predictions', filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`Deleted old file: ${filename}`);
            }
        });
    }

    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
    console.log(`Updated index with ${index.files.length} files`);
}

// Main
async function main() {
    try {
        // Ensure output directory exists
        const outputDir = path.join(__dirname, '..', 'data', 'predictions');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Fetch data
        const data = await fetchAllData();

        // Generate filename based on current time (rounded to nearest 3 hours)
        const now = new Date();
        const hour = Math.floor(now.getUTCHours() / 3) * 3;
        const timestamp = now.toISOString().slice(0, 10) + 'T' + hour.toString().padStart(2, '0');
        const filename = `${timestamp}.json`;

        // Save file
        const filePath = path.join(outputDir, filename);
        fs.writeFileSync(filePath, JSON.stringify(data));
        console.log(`Saved: ${filename} (${(fs.statSync(filePath).size / 1024).toFixed(1)} KB)`);

        // Update index
        updateIndex(filename);

        console.log('Done!');
    } catch (e) {
        console.error('Error:', e);
        process.exit(1);
    }
}

main();
