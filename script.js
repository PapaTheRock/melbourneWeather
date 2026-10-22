// AI Traffic Node - Data Collection
const aiNode = {
    nodeId: 'AI-Node-001',
    nodeType: 'AI-TRAFFIC-TRAFFIC',
    connections: [
        { source: 'Melbourne-Stations', target: 'AI-Node-001', type: 'data' },
        { source: 'Payment-Gateway', target: 'AI-Node-001', type: 'payment' }
    ],
    metadata: {
        location: 'Melbourne, Victoria, Australia',
        coordinates: '-37.8136, 144.9831',
        station: 'Melbourne Weather Station'
    },
    currentState: {
        active: true,
        dataRate: 0,
        lastUpdate: new Date()
    },
    events: [
        { time: '01:00', type: 'startup', message: 'AI Node Initialized' },
        { time: '01:01', type: 'initialize', message: 'Melbourne Station Connected' },
        { time: '01:02', type: 'connected', message: 'Data streams established' },
        { time: '01:03', type: 'connected', message: 'Payment integration ready' },
        { time: '01:04', type: 'ready', message: 'AI Processing: 98.5% efficiency' }
    ]
};

// Payment Gateway Status
const paymentGateway = {
    nodeId: 'AI-Node-002',
    nodeType: 'AI-PAYMENT-GATEWAY',
    connections: [
        { source: 'AI-Node-001', target: 'AI-Node-002', type: 'payment' },
        { source: 'Melbourne-Station', target: 'AI-Node-002', type: 'data' },
        { source: 'External-Providers', target: 'AI-Node-002', type: 'data' }
    ],
    metadata: {
        location: 'Melbourne, Victoria, Australia',
        status: 'processing',
        lastUpdate: new Date()
    },
    currentState: {
        active: true,
        status: 'pending',
        approvedCount: 0,
        pendingCount: 0,
        lastProcessed: new Date()
    },
    events: [
        { time: '01:00', type: 'initialization', message: 'Payment Gateway Connected' },
        { time: '01:01', type: 'connected', message: 'Melbourne Station Data Stream Active' },
        { time: '01:02', type: 'connected', message: 'External Provider Data Stream Active' },
        { time: '01:03', type: 'ready', message: 'Payment processing enabled' },
        { time: '01:04', type: 'ready', message: 'AI Payment Gateway Active' }
    ]
};

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    updateAIData();
    setInterval(updateAIData, 500);
    setInterval(updatePaymentGateway, 500);
    setInterval(updateMetrics, 1000);
    setInterval(updateWeather, 30000);
    setInterval(updateTimeline, 30000);
});

function updateAIData() {
    const aiNode = aiNode.nodeState;
    const dataRate = aiNode.dataRate || 0;
    const dataPoints = aiNode.dataPoints || 0;
    
    document.getElementById('ai-data').textContent = dataRate.toFixed(2);
    document.getElementById('ai-progress').style.width = dataRate + '%';
    
    // Update progress bars
    document.getElementById('data-progress').style.width = dataPoints + '%';
    const paymentRate = (dataPoints / 100000) * 73.6;
    document.getElementById('payment-progress').style.width = paymentRate + '%';
    document.getElementById('active-progress').style.width = (dataPoints / 1000) * 89.2 + '%';
}

function updatePaymentGateway() {
    const paymentGateway = paymentGateway.nodeState;
    const statusEl = document.getElementById('payment-status');
    const statusLabel = document.querySelector('.status-label');
    
    switch(paymentGateway.currentState.status) {
        case 'processing':
            statusEl.textContent = 'Processing';
            statusLabel.textContent = 'Processing';
            paymentGateway.currentState.status = 'approved';
            paymentGateway.currentState.approvedCount++;
            break;
        case 'approved':
            statusEl.textContent = 'Approved';
            statusLabel.textContent = 'Approved';
            paymentGateway.currentState.status = 'pending';
            paymentGateway.currentState.pendingCount++;
            break;
        case 'failed':
            statusEl.textContent = 'Failed';
            statusLabel.textContent = 'Failed';
            paymentGateway.currentState.status = 'rejected';
            break;
        default:
            statusEl.textContent = 'Processing';
            statusLabel.textContent = 'Processing';
            paymentGateway.currentState.status = 'pending';
    }
}

function updateMetrics() {
    const aiNode = aiNode.nodeState;
    const paymentGateway = paymentGateway.nodeState;
    
    document.getElementById('ai-progress').style.width = (aiNode.currentState.active * 100).toFixed(1) + '%';
    const paymentRate = (paymentGateway.currentState.approvedCount / 100000) * 87.2;
    document.getElementById('data-progress').style.width = paymentRate + '%';
    const paymentRate2 = (paymentGateway.currentState.approvedCount / 100000) * 73.6;
    document.getElementById('payment-progress').style.width = paymentRate2 + '%';
    document.getElementById('active-progress').style.width = (paymentGateway.currentState.approvedCount / 1000) * 89.2 + '%';
}

function updateWeather() {
    const currentWeather = getCurrentWeather();
    document.getElementById('temp').textContent = currentWeather.temperature.toFixed(1) + '°C';
    document.getElementById('humidity').textContent = currentWeather.humidity + '%';
    document.getElementById('wind').textContent = currentWeather.windSpeed + ' km/h';
    document.getElementById('pressure').textContent = currentWeather.pressure + ' hPa';
    
    document.getElementById('weather-icon').textContent = currentWeather.icon;
    document.getElementById('humidity-icon').textContent = currentWeather.icon;
    document.getElementById('wind-icon').textContent = currentWeather.icon;
    document.getElementById('pressure-icon').textContent = currentWeather.icon;
}

function getCurrentWeather() {
    // Return simulated Melbourne weather data
    const temp = (Math.random() * (35 - 15) + 15).toFixed(1);
    const humidity = (Math.random() * 80 + 40).toFixed(0) + '%';
    const windSpeed = (Math.random() * 40 + 10).toFixed(1) + ' km/h';
    const pressure = (Math.random() * 990 + 990).toFixed(0) + ' hPa';
    
    const weatherTypes = ['Sunny', 'Rainy', 'Cloudy', 'Partly Cloudy', 'Light Rain'];
    const weather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    
    const iconMap = {
        'Sunny': '☀️',
        'Rainy': '🌧️',
        'Cloudy': '☁️',
        'Partly Cloudy': '🌤️',
        'Light Rain': '🌦️'
    };
    
    return {
        temperature: temp,
        humidity: humidity,
        windSpeed: windSpeed,
        pressure: pressure,
        icon: iconMap[weather] || '☀️'
    };
}

function updateTimeline() {
    const timelineEl = document.querySelector('.payment-timeline');
    
    let html = '';
    const events = paymentGateway.currentState.events || [];
    
    events.forEach(event => {
        const timestamp = event.time.replace(/-/g, '/');
        const status = event.type === 'active' ? 'Active' : event.type === 'ready' ? 'Active' : 'Completed';
        
        html += `
            <div class="timeline-item">
                <div class="timeline-marker">${timestamp}</div>
                <div class="timeline-content">
                    <span>${event.message}</span>
                    <span class="timeline-status">${status}</span>
                </div>
            </div>
        `;
    });
    
    timelineEl.innerHTML = html;
}

// Initialize nodes
aiNode.nodeState = { active: true, dataRate: 0, dataPoints: 0 };
paymentGateway.nodeState = { active: true, status: 'pending', approvedCount: 0, pendingCount: 0, lastProcessed: new Date() };