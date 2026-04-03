// Beijing AQI Visualization - Map Module

import { BEIJING_CENTER, RADIUS_KM, getColorForValue, VARIABLE_NAMES, VARIABLE_UNITS, COLOR_SCALES } from './config.js';

let map = null;
let dataLayer = null;
let windLayer = null;

// Initialize the Leaflet map
export function initMap(containerId) {
    map = L.map(containerId, {
        center: [BEIJING_CENTER.lat, BEIJING_CENTER.lon],
        zoom: 7,
        zoomControl: true
    });

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);

    // Add a circle showing the 300km radius
    L.circle([BEIJING_CENTER.lat, BEIJING_CENTER.lon], {
        radius: RADIUS_KM * 1000,
        color: '#666',
        weight: 1,
        fill: false,
        dashArray: '5, 5'
    }).addTo(map);

    // Add Beijing center marker
    L.marker([BEIJING_CENTER.lat, BEIJING_CENTER.lon], {
        icon: L.divIcon({
            className: 'beijing-marker',
            html: '<div class="beijing-marker-inner"></div>',
            iconSize: [12, 12],
            iconAnchor: [6, 6]
        })
    }).addTo(map).bindPopup('Beijing Center');

    // Create layer groups for data and wind
    dataLayer = L.layerGroup().addTo(map);
    windLayer = L.layerGroup().addTo(map);

    // Make sure wind layer is below data layer
    windLayer.setZIndex(100);
    dataLayer.setZIndex(200);

    return map;
}

// Update the data layer with colored circles
export function updateDataLayer(pointData, variable) {
    if (!dataLayer) return;

    dataLayer.clearLayers();

    pointData.forEach(point => {
        const value = point[variable];
        const color = getColorForValue(variable, value);

        const circle = L.circleMarker([point.lat, point.lon], {
            radius: 15,
            fillColor: color,
            fillOpacity: 0.7,
            color: '#333',
            weight: 1,
            opacity: 0.8
        });

        // Format value for display
        const displayValue = value !== null && value !== undefined
            ? `${Math.round(value * 10) / 10}${VARIABLE_UNITS[variable] || ''}`
            : 'N/A';

        circle.bindPopup(`
            <strong>${VARIABLE_NAMES[variable] || variable}</strong><br>
            Value: ${displayValue}<br>
            Lat: ${point.lat.toFixed(2)}, Lon: ${point.lon.toFixed(2)}
        `);

        circle.addTo(dataLayer);
    });
}

// Update the wind layer with arrows
export function updateWindLayer(pointData) {
    if (!windLayer) return;

    windLayer.clearLayers();

    pointData.forEach(point => {
        const speed = point.wind_speed_10m;
        const direction = point.wind_direction_10m;

        if (speed === null || speed === undefined || direction === null || direction === undefined) {
            return;
        }

        // Create wind arrow
        const arrow = createWindArrow(point.lat, point.lon, speed, direction);
        arrow.addTo(windLayer);
    });
}

// Create a wind arrow marker
function createWindArrow(lat, lon, speed, direction) {
    // Arrow length based on wind speed
    // Min 8px (for calm), scales up to max 35px for strong winds
    const minLength = 8;
    const maxLength = 35;
    const length = Math.min(minLength + speed * 2.5, maxLength);

    // Wind direction is where wind comes FROM, arrow shows where it goes TO
    const arrowDirection = (direction + 180) % 360;

    // Create SVG arrow
    const svg = createArrowSVG(length, arrowDirection, speed);

    return L.marker([lat, lon], {
        icon: L.divIcon({
            className: 'wind-arrow',
            html: svg,
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        }),
        interactive: false
    });
}

// Create SVG for wind arrow
function createArrowSVG(length, direction, speed) {
    const size = 40;
    const center = size / 2;

    // Color based on wind speed
    const color = getWindColor(speed);

    // Arrow points
    const headLength = Math.min(length * 0.4, 8);
    const headWidth = Math.min(length * 0.3, 6);

    return `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="opacity: 0.6;">
            <g transform="rotate(${direction}, ${center}, ${center})">
                <!-- Arrow line -->
                <line
                    x1="${center}"
                    y1="${center + length / 2}"
                    x2="${center}"
                    y2="${center - length / 2}"
                    stroke="${color}"
                    stroke-width="2"
                    stroke-linecap="round"
                />
                <!-- Arrow head -->
                <polygon
                    points="${center},${center - length / 2}
                            ${center - headWidth},${center - length / 2 + headLength}
                            ${center + headWidth},${center - length / 2 + headLength}"
                    fill="${color}"
                />
            </g>
        </svg>
    `;
}

// Get color for wind speed
function getWindColor(speed) {
    if (speed < 2) return '#88ccff';      // Light blue - calm
    if (speed < 5) return '#4499dd';      // Blue - light
    if (speed < 10) return '#2266aa';     // Dark blue - moderate
    if (speed < 15) return '#ffaa00';     // Orange - strong
    return '#ff4444';                      // Red - very strong
}

// Get the map instance
export function getMap() {
    return map;
}

// Fit map to show all data points
export function fitToData(pointData) {
    if (!map || !pointData.length) return;

    const bounds = L.latLngBounds(pointData.map(p => [p.lat, p.lon]));
    map.fitBounds(bounds, { padding: [20, 20] });
}

// Add legend to map
export function addLegend(variable) {
    // Remove existing legend if any
    const existingLegend = document.querySelector('.map-legend');
    if (existingLegend) existingLegend.remove();

    const legend = L.control({ position: 'bottomleft' });

    legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'map-legend');
        div.innerHTML = createLegendHTML(variable);
        return div;
    };

    legend.addTo(map);
}

// Create legend HTML
function createLegendHTML(variable) {
    const scale = COLOR_SCALES[variable];

    if (!scale) return '';

    let html = `<h4>${VARIABLE_NAMES[variable] || variable}</h4>`;

    scale.forEach((level, i) => {
        const min = i === 0 ? 0 : scale[i - 1].max;
        const max = level.max === Infinity ? '+' : level.max;
        html += `
            <div class="legend-item">
                <span class="legend-color" style="background: ${level.color}"></span>
                <span class="legend-label">${min}-${max} ${level.label}</span>
            </div>
        `;
    });

    // Add wind legend
    html += `
        <h4 style="margin-top: 10px;">Wind Speed</h4>
        <div class="legend-item">
            <span class="legend-color" style="background: #88ccff"></span>
            <span class="legend-label">&lt;2 m/s Calm</span>
        </div>
        <div class="legend-item">
            <span class="legend-color" style="background: #4499dd"></span>
            <span class="legend-label">2-5 m/s Light</span>
        </div>
        <div class="legend-item">
            <span class="legend-color" style="background: #2266aa"></span>
            <span class="legend-label">5-10 m/s Moderate</span>
        </div>
        <div class="legend-item">
            <span class="legend-color" style="background: #ffaa00"></span>
            <span class="legend-label">10-15 m/s Strong</span>
        </div>
        <div class="legend-item">
            <span class="legend-color" style="background: #ff4444"></span>
            <span class="legend-label">&gt;15 m/s V.Strong</span>
        </div>
    `;

    return html;
}
