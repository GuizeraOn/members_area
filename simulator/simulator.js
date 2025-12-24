import '/style.css'

// --- Elements ---
const monthlyInput = document.getElementById('monthlyInput');
const yearsInput = document.getElementById('yearsInput');
const initialInput = document.getElementById('initialInput');

const monthlyDisplay = document.getElementById('monthlyDisplay');
const yearsDisplay = document.getElementById('yearsDisplay');
const initialDisplay = document.getElementById('initialDisplay');

const totalWealthDisplay = document.getElementById('totalWealth');
const savingWealthDisplay = document.getElementById('savingWealth');
const passiveIncomeDisplay = document.getElementById('passiveIncome');
const multiplierDisplay = document.getElementById('multiplier');

const ctx = document.getElementById('growthChart').getContext('2d');

let chart;

// --- Formatters ---
const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
};

// --- Math Engine ---
function calculateFutureValue(monthly, years, initial, rateYearly) {
    const rateMonthly = rateYearly / 12 / 100; // e.g. 12% -> 0.01 monthly
    const months = years * 12;

    // FV of Initial Deposit: P * (1 + r)^n
    const fvInitial = initial * Math.pow(1 + rateMonthly, months);

    // FV of Monthly Contributions: PMT * (((1 + r)^n - 1) / r)
    // Formula assuming contribution at END of period
    const fvMonthly = monthly * ((Math.pow(1 + rateMonthly, months) - 1) / rateMonthly);

    return fvInitial + fvMonthly;
}

function calculateValues() {
    const monthly = parseInt(monthlyInput.value);
    const years = parseInt(yearsInput.value);
    const initial = parseInt(initialInput.value);

    // 1. Dinero Guardado (0% interest, just the mattress)
    const storedMoney = initial + (monthly * 12 * years);

    // 2. Ahorro Tradicional (5% Yearly - Conservative Bank)
    const traditionalWealth = calculateFutureValue(monthly, years, initial, 5.0);

    // 3. Método Renda Vitalicia (13% Yearly - Strategy Avg)
    const methodWealth = calculateFutureValue(monthly, years, initial, 13.0);

    // Update Displays
    monthlyDisplay.textContent = formatCurrency(monthly);
    yearsDisplay.textContent = `${years} Años`;
    initialDisplay.textContent = formatCurrency(initial);

    totalWealthDisplay.textContent = formatCurrency(methodWealth);
    savingWealthDisplay.textContent = formatCurrency(traditionalWealth); // Comparing to 'Traditional Savings' to be fair, or 'Stored' to be aggressive. Let's use Stored for "Dejando parado" logic or Traditional for "Average Joe". VSL usually compares to "Mattress" or "Bad Bank". Let's stick to Traditional for chart, but comparison text might vary.

    // Passive Income (The "Renda" part): Assume 0.8% monthly safe withdrawal
    const monthlyPassive = methodWealth * 0.008;
    passiveIncomeDisplay.textContent = formatCurrency(monthlyPassive);

    // Multiplier
    const multi = (methodWealth / storedMoney).toFixed(1);
    multiplierDisplay.textContent = `${multi}X`;

    updateChart(years, initial, monthly);
}

// --- Chart Logic ---
function updateChart(totalYears, initial, monthly) {
    const labels = [];
    const dataStored = [];
    const dataTraditional = [];
    const dataMethod = [];

    // Generate data points (yearly steps for chart cleaniness)
    for (let y = 0; y <= totalYears; y++) {
        labels.push(`Año ${y}`);

        // Stored
        dataStored.push(initial + (monthly * 12 * y));

        // Traditional (5%)
        dataTraditional.push(calculateFutureValue(monthly, y, initial, 5.0));

        // Method (13%)
        dataMethod.push(calculateFutureValue(monthly, y, initial, 13.0));
    }

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Colchón (0%)',
                    data: dataStored,
                    borderColor: 'rgba(100, 100, 100, 0.5)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointRadius: 0,
                    tension: 0.4
                },
                {
                    label: 'Banco (5%)',
                    data: dataTraditional,
                    borderColor: 'rgba(239, 68, 68, 0.8)', // Red
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.4
                },
                {
                    label: 'El Código (13%)',
                    data: dataMethod,
                    borderColor: '#39ff14', // Brand Neon
                    backgroundColor: 'rgba(57, 255, 20, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    pointBackgroundColor: '#39ff14',
                    pointRadius: 0, // Clean line
                    tension: 0.4 // Smooth curve
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#9ca3af',
                        font: { family: 'Inter', size: 10 }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(20, 20, 20, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#ccc',
                    borderColor: 'rgba(57, 255, 20, 0.2)',
                    borderWidth: 1,
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#6b7280', maxTicksLimit: 6 }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: '#6b7280',
                        callback: function (value) {
                            return '$' + value / 1000 + 'k';
                        }
                    }
                }
            }
        }
    });
}

// --- Init ---
monthlyInput.addEventListener('input', calculateValues);
yearsInput.addEventListener('input', calculateValues);
initialInput.addEventListener('input', calculateValues);

// Initial Calculation
calculateValues();
