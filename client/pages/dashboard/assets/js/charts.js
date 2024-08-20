// Function to initialize gauge charts
function loadGaugeCharts() {
    const gauges = ['sensor1-gauge', 'sensor2-gauge', 'sensor3-gauge', 'sensor4-gauge'];
    gauges.forEach(id => {
        const ctx = document.getElementById(id).getContext('2d');
        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Value', ''],
                datasets: [{
                    data: [150, 150],  // Example data
                    backgroundColor: ['#00bfff', '#f5f5f5']
                }]
            },
            options: {
                rotation: Math.PI,
                circumference: Math.PI,
                cutout: '75%',
                plugins: {
                    tooltip: { enabled: false }
                }
            }
        });
    });
}

// Function to initialize Google Map
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
}
