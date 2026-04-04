// Beijing AQI Visualization - Configuration

// Beijing center coordinates
export const BEIJING_CENTER = {
    lat: 39.9042,
    lon: 116.4074
};

// Radius in km
export const RADIUS_KM = 300;

// Open-Meteo grid resolution in degrees
export const GRID_RESOLUTION = 0.4;

// At 40°N latitude: 1° lat ≈ 111km, 1° lon ≈ 85km
const KM_PER_DEG_LAT = 111;
const KM_PER_DEG_LON = 85; // 111 * cos(40°)

// Calculate grid points within radius
function generateGridPoints() {
    const points = [];

    // Calculate bounds
    const latRange = RADIUS_KM / KM_PER_DEG_LAT;
    const lonRange = RADIUS_KM / KM_PER_DEG_LON;

    const minLat = BEIJING_CENTER.lat - latRange;
    const maxLat = BEIJING_CENTER.lat + latRange;
    const minLon = BEIJING_CENTER.lon - lonRange;
    const maxLon = BEIJING_CENTER.lon + lonRange;

    // Generate grid points
    for (let lat = minLat; lat <= maxLat; lat += GRID_RESOLUTION) {
        for (let lon = minLon; lon <= maxLon; lon += GRID_RESOLUTION) {
            // Check if point is within circular radius
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

// Haversine formula for distance between two points
function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function toRad(deg) {
    return deg * Math.PI / 180;
}

// Pre-generate grid points
export const GRID_POINTS = generateGridPoints();

// Grid point to use for Beijing center time series (user specified)
export const BEIJING_CENTER_GRID = { lat: 40.0, lon: 116.5 };

// Color scales for different variables
export const COLOR_SCALES = {
    us_aqi: [
        { max: 50, color: '#00e400', label: 'Good' },
        { max: 100, color: '#ffff00', label: 'Moderate' },
        { max: 150, color: '#ff7e00', label: 'Unhealthy (Sensitive)' },
        { max: 200, color: '#ff0000', label: 'Unhealthy' },
        { max: 300, color: '#8f3f97', label: 'Very Unhealthy' },
        { max: Infinity, color: '#7e0023', label: 'Hazardous' }
    ],
    pm2_5: [
        { max: 12, color: '#00e400', label: 'Good' },
        { max: 35.4, color: '#ffff00', label: 'Moderate' },
        { max: 55.4, color: '#ff7e00', label: 'Unhealthy (Sensitive)' },
        { max: 150.4, color: '#ff0000', label: 'Unhealthy' },
        { max: 250.4, color: '#8f3f97', label: 'Very Unhealthy' },
        { max: Infinity, color: '#7e0023', label: 'Hazardous' }
    ],
    pm10: [
        { max: 54, color: '#00e400', label: 'Good' },
        { max: 154, color: '#ffff00', label: 'Moderate' },
        { max: 254, color: '#ff7e00', label: 'Unhealthy (Sensitive)' },
        { max: 354, color: '#ff0000', label: 'Unhealthy' },
        { max: 424, color: '#8f3f97', label: 'Very Unhealthy' },
        { max: Infinity, color: '#7e0023', label: 'Hazardous' }
    ],
    nitrogen_dioxide: [
        { max: 40, color: '#00e400', label: 'Good' },
        { max: 80, color: '#ffff00', label: 'Moderate' },
        { max: 180, color: '#ff7e00', label: 'High' },
        { max: 280, color: '#ff0000', label: 'Very High' },
        { max: Infinity, color: '#8f3f97', label: 'Extreme' }
    ],
    sulphur_dioxide: [
        { max: 40, color: '#00e400', label: 'Good' },
        { max: 80, color: '#ffff00', label: 'Moderate' },
        { max: 380, color: '#ff7e00', label: 'High' },
        { max: 800, color: '#ff0000', label: 'Very High' },
        { max: Infinity, color: '#8f3f97', label: 'Extreme' }
    ],
    ozone: [
        { max: 50, color: '#00e400', label: 'Good' },
        { max: 100, color: '#ffff00', label: 'Moderate' },
        { max: 130, color: '#ff7e00', label: 'High' },
        { max: 240, color: '#ff0000', label: 'Very High' },
        { max: Infinity, color: '#8f3f97', label: 'Extreme' }
    ],
    relative_humidity_2m: [
        { max: 20, color: '#fff5eb', label: 'Very Dry' },
        { max: 40, color: '#fdbe85', label: 'Dry' },
        { max: 60, color: '#74a9cf', label: 'Comfortable' },
        { max: 80, color: '#2b8cbe', label: 'Humid' },
        { max: Infinity, color: '#045a8d', label: 'Very Humid' }
    ]
};

// Get color for a value based on its scale
export function getColorForValue(variable, value) {
    if (value === null || value === undefined) return '#cccccc';

    const scale = COLOR_SCALES[variable];
    if (!scale) return '#cccccc';

    for (const level of scale) {
        if (value <= level.max) {
            return level.color;
        }
    }
    return scale[scale.length - 1].color;
}

// US EPA AQI breakpoints for PM2.5 (μg/m³)
// Source: https://www.airnow.gov/aqi/aqi-basics/
const PM25_BREAKPOINTS = [
    { cLow: 0, cHigh: 12.0, iLow: 0, iHigh: 50 },
    { cLow: 12.1, cHigh: 35.4, iLow: 51, iHigh: 100 },
    { cLow: 35.5, cHigh: 55.4, iLow: 101, iHigh: 150 },
    { cLow: 55.5, cHigh: 150.4, iLow: 151, iHigh: 200 },
    { cLow: 150.5, cHigh: 250.4, iLow: 201, iHigh: 300 },
    { cLow: 250.5, cHigh: 350.4, iLow: 301, iHigh: 400 },
    { cLow: 350.5, cHigh: 500.4, iLow: 401, iHigh: 500 }
];

// Calculate US EPA AQI from PM2.5 concentration (μg/m³)
export function calculateAQI(pm25) {
    if (pm25 === null || pm25 === undefined || pm25 < 0) return null;

    // Truncate to 1 decimal place as per EPA spec
    const c = Math.floor(pm25 * 10) / 10;

    // Find the appropriate breakpoint
    for (const bp of PM25_BREAKPOINTS) {
        if (c <= bp.cHigh) {
            // Linear interpolation: I = (I_high - I_low) / (C_high - C_low) * (C - C_low) + I_low
            const aqi = ((bp.iHigh - bp.iLow) / (bp.cHigh - bp.cLow)) * (c - bp.cLow) + bp.iLow;
            return Math.round(aqi);
        }
    }

    // Above 500.4 μg/m³
    return 500;
}

// Variable display names
export const VARIABLE_NAMES = {
    us_aqi: 'AQI',
    pm2_5: 'PM2.5',
    pm10: 'PM10',
    nitrogen_dioxide: 'NO₂',
    sulphur_dioxide: 'SO₂',
    ozone: 'O₃',
    relative_humidity_2m: 'Humidity'
};

// Variable units
export const VARIABLE_UNITS = {
    us_aqi: '',
    pm2_5: 'μg/m³',
    pm10: 'μg/m³',
    nitrogen_dioxide: 'μg/m³',
    sulphur_dioxide: 'μg/m³',
    ozone: 'μg/m³',
    relative_humidity_2m: '%',
    wind_speed_10m: 'm/s',
    wind_direction_10m: '°'
};

// API configuration
export const API_CONFIG = {
    airQualityBase: 'https://air-quality-api.open-meteo.com/v1/air-quality',
    weatherBase: 'https://api.open-meteo.com/v1/forecast',
    // WAQI API for accurate ground station readings
    // Get free token at: https://aqicn.org/data-platform/token/
    waqiBase: 'https://api.waqi.info',
    waqiToken: 'demo', // Replace with your token for production
    pastDays: 7,
    forecastDays: 5,
    batchSize: 50 // Max coordinates per API request
};

console.log(`Generated ${GRID_POINTS.length} grid points within ${RADIUS_KM}km of Beijing`);
