// Beijing AQI Visualization - Chart Module

import { getColorForValue, VARIABLE_NAMES, VARIABLE_UNITS, COLOR_SCALES } from './config.js';

let chart = null;
let currentVariable = 'us_aqi';
let pastPredictions = [];

// Initialize the Chart.js chart
export function initChart(canvasId) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: []
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        title: function (context) {
                            const date = new Date(context[0].label);
                            return date.toLocaleString();
                        },
                        label: function (context) {
                            const value = context.raw;
                            if (value === null || value === undefined) return 'N/A';
                            const unit = VARIABLE_UNITS[currentVariable] || '';
                            return `${context.dataset.label}: ${Math.round(value * 10) / 10}${unit}`;
                        }
                    }
                },
                annotation: {
                    annotations: {
                        nowLine: {
                            type: 'line',
                            xMin: null,
                            xMax: null,
                            borderColor: 'rgba(0, 0, 0, 0.5)',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            label: {
                                content: 'Now',
                                enabled: true,
                                position: 'start'
                            }
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        displayFormats: {
                            hour: 'MMM d, HH:mm',
                            day: 'MMM d'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Time'
                    },
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'AQI'
                    },
                    beginAtZero: true,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });

    return chart;
}

// Update chart with Beijing center time series data
export function updateChart(timeSeries, variable, nowTime) {
    if (!chart || !timeSeries) return;

    currentVariable = variable;

    const times = timeSeries.time.map(t => new Date(t));
    const values = timeSeries[variable] || [];

    // Find "now" index to split past/future
    const nowMs = nowTime ? nowTime.getTime() : Date.now();
    const nowIndex = times.findIndex(t => t.getTime() > nowMs);

    // Create gradient based on color scale
    const backgroundColors = values.map(v => {
        const color = getColorForValue(variable, v);
        return color + '40'; // Add transparency
    });

    // Main data line
    const mainDataset = {
        label: `${VARIABLE_NAMES[variable] || variable} (Beijing)`,
        data: values,
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        fill: false,
        tension: 0.2,
        segment: {
            borderColor: ctx => {
                // Dashed line for forecast (after now)
                const index = ctx.p0DataIndex;
                if (nowIndex > 0 && index >= nowIndex - 1) {
                    return '#2196F3';
                }
                return '#2196F3';
            },
            borderDash: ctx => {
                const index = ctx.p0DataIndex;
                if (nowIndex > 0 && index >= nowIndex - 1) {
                    return [5, 5]; // Dashed for forecast
                }
                return []; // Solid for past
            }
        }
    };

    // Build datasets array
    const datasets = [mainDataset, ...pastPredictions];

    chart.data.labels = times;
    chart.data.datasets = datasets;

    // Update Y-axis label
    chart.options.scales.y.title.text = `${VARIABLE_NAMES[variable] || variable} ${VARIABLE_UNITS[variable] ? `(${VARIABLE_UNITS[variable]})` : ''}`;

    // Update "now" line annotation
    if (chart.options.plugins.annotation) {
        chart.options.plugins.annotation.annotations.nowLine.xMin = nowMs;
        chart.options.plugins.annotation.annotations.nowLine.xMax = nowMs;
    }

    // Add color bands for AQI
    if (variable === 'us_aqi') {
        addAQIColorBands();
    } else {
        removeColorBands();
    }

    chart.update('none');
}

// Add AQI color bands to background
function addAQIColorBands() {
    if (!chart.options.plugins.annotation) {
        chart.options.plugins.annotation = { annotations: {} };
    }

    const scale = COLOR_SCALES.us_aqi;
    let prevMax = 0;

    scale.forEach((level, i) => {
        const max = level.max === Infinity ? 500 : level.max;
        chart.options.plugins.annotation.annotations[`band${i}`] = {
            type: 'box',
            yMin: prevMax,
            yMax: max,
            backgroundColor: level.color + '15', // Very transparent
            borderWidth: 0
        };
        prevMax = max;
    });
}

// Remove color bands
function removeColorBands() {
    if (!chart.options.plugins.annotation) return;

    Object.keys(chart.options.plugins.annotation.annotations).forEach(key => {
        if (key.startsWith('band')) {
            delete chart.options.plugins.annotation.annotations[key];
        }
    });
}

// Add a past prediction overlay to the chart
export function addPastPrediction(predictionData, predictionTime, variable) {
    if (!chart || !predictionData) return;

    const fetchedAt = new Date(predictionData.fetched_at);

    // Find Beijing center point in this prediction
    const centerPoint = predictionData.grid_points.find(p =>
        Math.abs(p.lat - 39.9) < 0.3 && Math.abs(p.lon - 116.4) < 0.3
    );

    if (!centerPoint) return;

    // Only include forecast data (times after the prediction was fetched)
    const times = centerPoint.hourly.time;
    const values = centerPoint.hourly[variable];

    const forecastData = times.map((t, i) => {
        const time = new Date(t);
        // Only show forecast portion (after fetch time)
        if (time <= fetchedAt) return null;
        return { x: time, y: values[i] };
    }).filter(d => d !== null);

    // Create a lighter color for past predictions
    const hue = (pastPredictions.length * 40) % 360;
    const color = `hsl(${hue}, 60%, 50%)`;

    const dataset = {
        label: `Pred. ${fetchedAt.toLocaleDateString()} ${fetchedAt.getHours()}:00`,
        data: forecastData,
        borderColor: color,
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderDash: [3, 3],
        pointRadius: 0,
        fill: false,
        tension: 0.2,
        _predictionId: predictionData.fetched_at
    };

    pastPredictions.push(dataset);
    chart.data.datasets = [chart.data.datasets[0], ...pastPredictions];
    chart.update('none');
}

// Remove a past prediction from the chart
export function removePastPrediction(fetchedAt) {
    pastPredictions = pastPredictions.filter(d => d._predictionId !== fetchedAt);
    chart.data.datasets = [chart.data.datasets[0], ...pastPredictions];
    chart.update('none');
}

// Clear all past predictions
export function clearPastPredictions() {
    pastPredictions = [];
    if (chart && chart.data.datasets.length > 0) {
        chart.data.datasets = [chart.data.datasets[0]];
        chart.update('none');
    }
}

// Highlight a specific time on the chart
export function highlightTime(time) {
    if (!chart) return;

    // Update the vertical line position
    if (chart.options.plugins.annotation?.annotations?.selectedTime) {
        chart.options.plugins.annotation.annotations.selectedTime.xMin = time.getTime();
        chart.options.plugins.annotation.annotations.selectedTime.xMax = time.getTime();
    } else {
        if (!chart.options.plugins.annotation) {
            chart.options.plugins.annotation = { annotations: {} };
        }
        chart.options.plugins.annotation.annotations.selectedTime = {
            type: 'line',
            xMin: time.getTime(),
            xMax: time.getTime(),
            borderColor: 'rgba(255, 0, 0, 0.5)',
            borderWidth: 2
        };
    }

    chart.update('none');
}

// Get the chart instance
export function getChart() {
    return chart;
}
