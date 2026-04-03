// Beijing AQI Visualization - Data Fetching Layer

import { GRID_POINTS, API_CONFIG, BEIJING_CENTER_GRID, calculateAQI } from './config.js';

// Chunk array into batches
function chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

// Fetch air quality data for a batch of coordinates
async function fetchAirQualityBatch(points) {
    const lats = points.map(p => p.lat).join(',');
    const lons = points.map(p => p.lon).join(',');

    const params = new URLSearchParams({
        latitude: lats,
        longitude: lons,
        hourly: 'pm2_5,pm10,nitrogen_dioxide,sulphur_dioxide,us_aqi,ozone',
        past_days: API_CONFIG.pastDays,
        forecast_days: API_CONFIG.forecastDays
    });

    const response = await fetch(`${API_CONFIG.airQualityBase}?${params}`);
    if (!response.ok) throw new Error(`Air quality API error: ${response.status}`);
    return response.json();
}

// Fetch weather data for a batch of coordinates
async function fetchWeatherBatch(points) {
    const lats = points.map(p => p.lat).join(',');
    const lons = points.map(p => p.lon).join(',');

    const params = new URLSearchParams({
        latitude: lats,
        longitude: lons,
        hourly: 'wind_speed_10m,wind_direction_10m,relative_humidity_2m',
        past_days: API_CONFIG.pastDays,
        forecast_days: API_CONFIG.forecastDays
    });

    const response = await fetch(`${API_CONFIG.weatherBase}?${params}`);
    if (!response.ok) throw new Error(`Weather API error: ${response.status}`);
    return response.json();
}

// Merge air quality and weather data for a single location
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

// Fetch all data for all grid points (live from API)
export async function fetchAllData(onProgress) {
    const batches = chunkArray(GRID_POINTS, API_CONFIG.batchSize);
    const allGridData = [];
    let completed = 0;

    console.log(`Fetching ${GRID_POINTS.length} grid points in ${batches.length} batches...`);

    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
        const batch = batches[batchIndex];
        console.log(`Fetching batch ${batchIndex + 1}/${batches.length} (${batch.length} points)...`);

        try {
            // Fetch air quality and weather in parallel for this batch
            const [aqResponse, weatherResponse] = await Promise.all([
                fetchAirQualityBatch(batch),
                fetchWeatherBatch(batch)
            ]);

            console.log('AQ response type:', Array.isArray(aqResponse) ? 'array' : 'object',
                        'length:', Array.isArray(aqResponse) ? aqResponse.length : 1);

            // Handle single vs multiple locations (API returns differently)
            const aqDataArray = Array.isArray(aqResponse) ? aqResponse : [aqResponse];
            const weatherDataArray = Array.isArray(weatherResponse) ? weatherResponse : [weatherResponse];

            // Merge data for each location in this batch
            for (let i = 0; i < batch.length; i++) {
                if (!aqDataArray[i] || !weatherDataArray[i]) {
                    console.error(`Missing data at index ${i}:`, { aq: aqDataArray[i], weather: weatherDataArray[i] });
                    continue;
                }
                const merged = mergeLocationData(aqDataArray[i], weatherDataArray[i]);
                allGridData.push(merged);
            }

            completed += batch.length;
            if (onProgress) {
                onProgress(completed, GRID_POINTS.length);
            }

            // Small delay between batches to avoid rate limiting
            if (batchIndex < batches.length - 1) {
                await new Promise(r => setTimeout(r, 100));
            }
        } catch (error) {
            console.error(`Error fetching batch ${batchIndex + 1}:`, error);
            throw error;
        }
    }

    console.log(`Successfully fetched ${allGridData.length} grid points`);

    return {
        fetched_at: new Date().toISOString(),
        grid_points: allGridData
    };
}

// Fetch data for Beijing center only (for quick updates)
export async function fetchBeijingCenterData() {
    const point = BEIJING_CENTER_GRID;

    const [aqResponse, weatherResponse] = await Promise.all([
        fetchAirQualityBatch([point]),
        fetchWeatherBatch([point])
    ]);

    return mergeLocationData(aqResponse, weatherResponse);
}

// Load a stored prediction file from the data folder
export async function loadPredictionFile(filename) {
    const response = await fetch(`data/predictions/${filename}`);
    if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Failed to load prediction file: ${response.status}`);
    }
    return response.json();
}

// Load the index of available prediction files
export async function loadPredictionIndex() {
    try {
        const response = await fetch('data/predictions/index.json');
        if (!response.ok) return { files: [] };
        return response.json();
    } catch (e) {
        console.warn('No prediction index found, starting fresh');
        return { files: [] };
    }
}

// Get data for a specific time index from grid data
export function getDataAtTime(gridData, timeIndex) {
    return gridData.grid_points.map(point => ({
        lat: point.lat,
        lon: point.lon,
        pm2_5: point.hourly.pm2_5[timeIndex],
        pm10: point.hourly.pm10[timeIndex],
        nitrogen_dioxide: point.hourly.nitrogen_dioxide[timeIndex],
        sulphur_dioxide: point.hourly.sulphur_dioxide[timeIndex],
        us_aqi: point.hourly.us_aqi[timeIndex],
        ozone: point.hourly.ozone[timeIndex],
        wind_speed_10m: point.hourly.wind_speed_10m[timeIndex],
        wind_direction_10m: point.hourly.wind_direction_10m[timeIndex],
        relative_humidity_2m: point.hourly.relative_humidity_2m[timeIndex]
    }));
}

// Get Beijing center data for all times (for the chart)
export function getBeijingTimeSeries(gridData) {
    // Find point closest to BEIJING_CENTER_GRID (40.0, 116.5)
    const centerPoint = gridData.grid_points.find(p =>
        Math.abs(p.lat - BEIJING_CENTER_GRID.lat) < 0.25 &&
        Math.abs(p.lon - BEIJING_CENTER_GRID.lon) < 0.25
    );

    if (!centerPoint) {
        console.warn('Beijing center point not found in grid data. Looking for:', BEIJING_CENTER_GRID);
        console.warn('Available points sample:', gridData.grid_points.slice(0, 5).map(p => ({lat: p.lat, lon: p.lon})));
        return null;
    }

    console.log('Using Beijing center point:', centerPoint.lat, centerPoint.lon);

    return {
        time: centerPoint.hourly.time,
        us_aqi: centerPoint.hourly.us_aqi,
        pm2_5: centerPoint.hourly.pm2_5,
        pm10: centerPoint.hourly.pm10,
        nitrogen_dioxide: centerPoint.hourly.nitrogen_dioxide,
        sulphur_dioxide: centerPoint.hourly.sulphur_dioxide,
        ozone: centerPoint.hourly.ozone,
        relative_humidity_2m: centerPoint.hourly.relative_humidity_2m
    };
}

// Find the time index closest to a given Date
export function findTimeIndex(gridData, targetDate) {
    if (!gridData.grid_points.length) return 0;

    const times = gridData.grid_points[0].hourly.time;
    const targetMs = targetDate.getTime();

    let closestIndex = 0;
    let closestDiff = Infinity;

    for (let i = 0; i < times.length; i++) {
        const diff = Math.abs(new Date(times[i]).getTime() - targetMs);
        if (diff < closestDiff) {
            closestDiff = diff;
            closestIndex = i;
        }
    }

    return closestIndex;
}

// Get the time range from grid data
export function getTimeRange(gridData) {
    if (!gridData.grid_points.length) return { start: new Date(), end: new Date(), times: [] };

    const times = gridData.grid_points[0].hourly.time;
    return {
        start: new Date(times[0]),
        end: new Date(times[times.length - 1]),
        times: times.map(t => new Date(t))
    };
}
