// Beijing AQI Visualization - Main Application

import { BEIJING_CENTER_GRID, VARIABLE_NAMES, getColorForValue, COLOR_SCALES } from './config.js';
import { fetchAllData, loadPredictionIndex, loadPredictionFile, getDataAtTime, getBeijingTimeSeries, findTimeIndex, getTimeRange } from './data.js';
import { initMap, updateDataLayer, updateWindLayer, addLegend } from './map.js';
import { initChart, updateChart, addPastPrediction, removePastPrediction, clearPastPredictions, highlightTime } from './chart.js';

// Application state
let state = {
    currentData: null,
    currentVariable: 'us_aqi',
    currentTimeIndex: 0,
    timeRange: null,
    predictionIndex: { files: [] },
    loadedPredictions: {},
    activePredictions: new Set()
};

// DOM elements
let elements = {};

// Initialize the application
async function init() {
    console.log('Initializing Beijing AQI Visualization...');

    // Get DOM elements
    elements = {
        loadingOverlay: document.getElementById('loading-overlay'),
        loadingText: document.getElementById('loading-text'),
        variableButtons: document.querySelectorAll('.variable-btn'),
        timeSlider: document.getElementById('time-slider'),
        sliderTrack: document.getElementById('slider-track'),
        dayMarkers: document.getElementById('day-markers'),
        timeDisplay: document.getElementById('time-display'),
        aqiDisplay: document.getElementById('aqi-display'),
        predictionList: document.getElementById('prediction-list'),
        predictionsDropdown: document.getElementById('predictions-dropdown'),
        predictionsToggle: document.getElementById('predictions-toggle'),
        refreshBtn: document.getElementById('refresh-btn')
    };

    // Initialize map
    const map = initMap('map');

    // Initialize chart (with annotation plugin if available)
    initChart('chart');

    // Invalidate map size after a short delay to ensure proper rendering
    setTimeout(() => {
        map.invalidateSize();
    }, 100);

    // Set up event listeners
    setupEventListeners();

    // Load prediction index
    await loadPredictions();

    // Fetch live data
    await refreshData();

    console.log('Initialization complete');
}

// Set up event listeners
function setupEventListeners() {
    // Variable switcher buttons
    elements.variableButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.variableButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentVariable = btn.dataset.variable;
            updateVisualization();
        });
    });

    // Time slider
    elements.timeSlider.addEventListener('input', (e) => {
        state.currentTimeIndex = parseInt(e.target.value);
        updateVisualization();
    });

    // Refresh button
    elements.refreshBtn?.addEventListener('click', () => {
        refreshData();
    });

    // Predictions toggle button
    elements.predictionsToggle?.addEventListener('click', () => {
        elements.predictionsDropdown?.classList.toggle('open');
        elements.predictionsToggle?.classList.toggle('active');
    });
}

// Load prediction index and populate the list
async function loadPredictions() {
    try {
        state.predictionIndex = await loadPredictionIndex();
        updatePredictionList();
    } catch (e) {
        console.warn('Could not load prediction index:', e);
    }
}

// Update the prediction list UI
function updatePredictionList() {
    if (!elements.predictionList) return;

    elements.predictionList.innerHTML = '';

    if (state.predictionIndex.files.length === 0) {
        elements.predictionList.innerHTML = '<div class="no-predictions">No stored predictions yet. They will appear after the GitHub Action runs.</div>';
        return;
    }

    // Sort files by date (newest first)
    const sortedFiles = [...state.predictionIndex.files].sort().reverse();

    sortedFiles.slice(0, 20).forEach(filename => {
        const btn = document.createElement('button');
        btn.className = 'prediction-btn';

        // Parse filename to get date
        const match = filename.match(/(\d{4}-\d{2}-\d{2}T\d{2})/);
        if (match) {
            const date = new Date(match[1].replace('T', ' ') + ':00');
            btn.textContent = date.toLocaleDateString() + ' ' + date.getHours() + ':00';
        } else {
            btn.textContent = filename;
        }

        btn.dataset.filename = filename;

        btn.addEventListener('click', () => togglePrediction(filename, btn));

        if (state.activePredictions.has(filename)) {
            btn.classList.add('active');
        }

        elements.predictionList.appendChild(btn);
    });
}

// Toggle a past prediction overlay
async function togglePrediction(filename, btn) {
    if (state.activePredictions.has(filename)) {
        // Remove prediction
        state.activePredictions.delete(filename);
        btn.classList.remove('active');

        const prediction = state.loadedPredictions[filename];
        if (prediction) {
            removePastPrediction(prediction.fetched_at);
        }
    } else {
        // Add prediction
        showLoading('Loading prediction...');

        try {
            let prediction = state.loadedPredictions[filename];
            if (!prediction) {
                prediction = await loadPredictionFile(filename);
                if (prediction) {
                    state.loadedPredictions[filename] = prediction;
                }
            }

            if (prediction) {
                state.activePredictions.add(filename);
                btn.classList.add('active');
                addPastPrediction(prediction, prediction.fetched_at, state.currentVariable);
            }
        } catch (e) {
            console.error('Failed to load prediction:', e);
        }

        hideLoading();
    }
}

// Refresh data from Open-Meteo API
async function refreshData() {
    showLoading('Fetching air quality data...');

    try {
        state.currentData = await fetchAllData((completed, total) => {
            const percent = Math.round((completed / total) * 100);
            updateLoadingText(`Fetching data: ${percent}% (${completed}/${total} points)`);
        });

        // Update time range
        state.timeRange = getTimeRange(state.currentData);

        // Set slider range
        const totalHours = state.currentData.grid_points[0]?.hourly?.time?.length || 0;
        elements.timeSlider.max = totalHours - 1;

        // Set current time to "now"
        const nowIndex = findTimeIndex(state.currentData, new Date());
        state.currentTimeIndex = nowIndex;
        elements.timeSlider.value = nowIndex;

        // Update visualization
        updateVisualization();

        // Update chart and slider track
        const timeSeries = getBeijingTimeSeries(state.currentData);
        console.log('Time series for chart:', timeSeries ? 'found' : 'NOT FOUND');
        if (timeSeries) {
            console.log('Time series length:', timeSeries.time?.length, 'AQI sample:', timeSeries.us_aqi?.slice(0, 5));
            buildSliderTrack(timeSeries);
        }
        updateChart(timeSeries, state.currentVariable, new Date());

        console.log('Data refreshed successfully');
    } catch (e) {
        console.error('Failed to fetch data:', e);
        alert('Failed to fetch air quality data: ' + e.message + '\n\nCheck browser console (F12) for details.');
    }

    hideLoading();
}

// Update the map and displays for current time/variable
function updateVisualization() {
    if (!state.currentData) return;

    // Get data at current time
    const pointData = getDataAtTime(state.currentData, state.currentTimeIndex);

    // Update map layers
    updateDataLayer(pointData, state.currentVariable);
    updateWindLayer(pointData);

    // Update legend
    addLegend(state.currentVariable);

    // Update time display
    const times = state.currentData.grid_points[0]?.hourly?.time || [];
    const currentTime = new Date(times[state.currentTimeIndex]);
    elements.timeDisplay.textContent = currentTime.toLocaleString();

    // Update AQI display (for Beijing center)
    const beijingPoint = pointData.find(p =>
        Math.abs(p.lat - BEIJING_CENTER_GRID.lat) < 0.01 &&
        Math.abs(p.lon - BEIJING_CENTER_GRID.lon) < 0.01
    );

    if (beijingPoint) {
        const aqi = beijingPoint.us_aqi;
        const color = getColorForValue('us_aqi', aqi);
        elements.aqiDisplay.textContent = aqi !== null ? Math.round(aqi) : '--';
        elements.aqiDisplay.style.backgroundColor = color;
        elements.aqiDisplay.style.color = aqi > 150 ? '#fff' : '#000';
    }

    // Highlight time on chart
    highlightTime(currentTime);
}

// Build the slider track with AQI-colored segments and day markers
function buildSliderTrack(timeSeries) {
    if (!elements.sliderTrack || !elements.dayMarkers || !timeSeries) return;

    const times = timeSeries.time;
    const aqiValues = timeSeries.us_aqi;

    // Clear existing content
    elements.sliderTrack.innerHTML = '';
    elements.dayMarkers.innerHTML = '';

    // Build colored segments for each hour
    times.forEach((timeStr, i) => {
        const aqi = aqiValues[i];
        const color = getColorForValue('us_aqi', aqi);

        const segment = document.createElement('div');
        segment.className = 'hour-segment';
        segment.style.backgroundColor = color;
        segment.title = `${new Date(timeStr).toLocaleString()}: AQI ${aqi !== null ? Math.round(aqi) : 'N/A'}`;
        elements.sliderTrack.appendChild(segment);
    });

    // Find day boundaries and collect day info for center labels
    let currentDay = null;
    const nowIndex = findTimeIndex(state.currentData, new Date());
    const dayBlocks = []; // { startIndex, dayOfWeek }

    times.forEach((timeStr, i) => {
        const date = new Date(timeStr);
        const day = date.toDateString();
        const hour = date.getHours();

        // Add day marker at midnight (hour 0) or first entry of new day
        if (day !== currentDay && (hour === 0 || currentDay === null)) {
            // Record the end of the previous day block
            if (dayBlocks.length > 0) {
                dayBlocks[dayBlocks.length - 1].endIndex = i - 1;
            }

            currentDay = day;
            const dayNames = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
            dayBlocks.push({
                startIndex: i,
                dayOfWeek: dayNames[date.getDay()],
                date: date
            });

            const percent = (i / (times.length - 1)) * 100;

            const marker = document.createElement('div');
            marker.className = 'day-marker';
            marker.style.left = `${percent}%`;

            const line = document.createElement('div');
            line.className = 'day-marker-line';

            const label = document.createElement('div');
            label.className = 'day-marker-label';
            label.textContent = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            marker.appendChild(label);
            marker.appendChild(line);
            elements.dayMarkers.appendChild(marker);
        }
    });

    // Set the end index for the last day block
    if (dayBlocks.length > 0) {
        dayBlocks[dayBlocks.length - 1].endIndex = times.length - 1;
    }

    // Add day-of-week labels in the center of each day block
    dayBlocks.forEach(block => {
        const centerIndex = (block.startIndex + block.endIndex) / 2;
        const centerPercent = (centerIndex / (times.length - 1)) * 100;

        const dowLabel = document.createElement('div');
        dowLabel.className = 'day-of-week-label';
        dowLabel.style.left = `${centerPercent}%`;
        dowLabel.style.transform = 'translateX(-50%)';
        dowLabel.textContent = block.dayOfWeek;
        elements.dayMarkers.appendChild(dowLabel);
    });

    // Add "Now" marker
    if (nowIndex >= 0 && nowIndex < times.length) {
        const nowPercent = (nowIndex / (times.length - 1)) * 100;

        const nowMarker = document.createElement('div');
        nowMarker.className = 'now-marker';
        nowMarker.style.left = `${nowPercent}%`;

        const nowLine = document.createElement('div');
        nowLine.className = 'now-marker-line';

        const nowLabel = document.createElement('div');
        nowLabel.className = 'now-marker-label';
        nowLabel.textContent = 'NOW';

        nowMarker.appendChild(nowLabel);
        nowMarker.appendChild(nowLine);
        elements.dayMarkers.appendChild(nowMarker);
    }
}

// Show loading overlay
function showLoading(text) {
    elements.loadingOverlay.style.display = 'flex';
    elements.loadingText.textContent = text || 'Loading...';
}

// Update loading text
function updateLoadingText(text) {
    elements.loadingText.textContent = text;
}

// Hide loading overlay
function hideLoading() {
    elements.loadingOverlay.style.display = 'none';
}

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', init);
