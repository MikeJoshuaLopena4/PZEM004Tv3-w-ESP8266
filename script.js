const MAX_DATA_POINTS = 15; // Set to 15 for more data points
const chartLabels = new Array(MAX_DATA_POINTS).fill('');
const chartData = {
    test: new Array(MAX_DATA_POINTS).fill(0),
    voltage: new Array(MAX_DATA_POINTS).fill(0),
    current: new Array(MAX_DATA_POINTS).fill(0),
    power: new Array(MAX_DATA_POINTS).fill(0),
    energy: new Array(MAX_DATA_POINTS).fill(0),
    frequency: new Array(MAX_DATA_POINTS).fill(0),
    pf: new Array(MAX_DATA_POINTS).fill(0)
};

const units = {
    test: '' ,
    voltage: 'V',
    current: 'A',
    power: 'W',
    energy: 'kWh',
    frequency: 'Hz',
    pf: ''  // Power factor is unitless
};

async function fetchData() {
    try {
        const response = await fetch('http://10.0.11.35/');
        const data = await response.json();

        document.getElementById('address').textContent = data.address; // Display address
        document.getElementById('test').textContent = data.test;
        document.getElementById('voltage').textContent = data.voltage;
        document.getElementById('current').textContent = data.current;
        document.getElementById('power').textContent = data.power;
        document.getElementById('energy').textContent = data.energy;
        document.getElementById('frequency').textContent = data.frequency;
        document.getElementById('pf').textContent = data.pf;

        updateChart(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function updateChart(data) {
    const now = new Date();
    const timeString = now.toLocaleTimeString();

    // Update chart labels and data
    chartLabels.shift();
    chartLabels.push(timeString);

    for (let key in chartData) {
        chartData[key].shift();
        chartData[key].push(data[key]);
    }

    // Update chart with new data
    myGraph.data.labels = chartLabels;
    myGraph.data.datasets.forEach(dataset => {
        dataset.data = chartData[dataset.label.toLowerCase()];
    });
    myGraph.update();
}

document.addEventListener('DOMContentLoaded', () => {
    const GRAPH = document.getElementById('myChart').getContext('2d');
    window.myGraph = new Chart(GRAPH, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [
                {
                    label: 'Test',
                    data: chartData.test,
                    backgroundColor: 'rgba(243, 43, 132, 0.2)',
                    borderColor: 'rgba(243, 43, 132, 1)',
                    borderWidth: 1,
                    borderRadius: 5,
                    borderSkipped: false,
                },
                {
                    label: 'Voltage',
                    data: chartData.voltage,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    borderRadius: 5,
                    borderSkipped: false,
                },
                {
                    label: 'Current',
                    data: chartData.current,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    borderRadius: 5,
                    borderSkipped: false,
                },
                {
                    label: 'Power',
                    data: chartData.power,
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1,
                    borderRadius: 5,
                    borderSkipped: false,
                },
                {
                    label: 'Energy',
                    data: chartData.energy,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    borderRadius: 5,
                    borderSkipped: false,
                },
                {
                    label: 'Frequency',
                    data: chartData.frequency,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                    borderRadius: 5,
                    borderSkipped: false,
                },
                {
                    label: 'PF',
                    data: chartData.pf,
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1,
                    borderRadius: 5,
                    borderSkipped: false,
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Values'
                    }
                }
            },
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y.toFixed(2) + units[label.toLowerCase().split(':')[0]];
                            }
                            return label;
                        }
                    }
                },
                legend: {
                    position: 'top',
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });

    fetchData();
    setInterval(fetchData, 10000); // Update data every 10 seconds
});
