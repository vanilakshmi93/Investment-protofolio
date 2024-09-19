const investments = [];
const totalValueElem = document.getElementById('totalValue');
const investmentTableBody = document.querySelector('#investmentTable tbody');

const portfolioChartCanvas = document.getElementById('portfolioChart');
let portfolioChart;

// Function to calculate and update total portfolio value
function updateTotalValue() {
    const totalValue = investments.reduce((acc, investment) => acc + investment.currentValue, 0);
    totalValueElem.textContent = totalValue.toFixed(2);
}

// Function to render the portfolio distribution pie chart
function renderChart() {
    const assetNames = investments.map(investment => investment.assetName);
    const assetValues = investments.map(investment => investment.currentValue);

    if (portfolioChart) {
        portfolioChart.destroy();
    }

    portfolioChart = new Chart(portfolioChartCanvas, {
        type: 'pie',
        data: {
            labels: assetNames,
            datasets: [{
                data: assetValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
}

// Function to add a new investment
function addInvestment() {
    const assetName = document.getElementById('assetName').value;
    const amountInvested = parseFloat(document.getElementById('amountInvested').value);
    const currentValue = parseFloat(document.getElementById('currentValue').value);

    if (!assetName || isNaN(amountInvested) || isNaN(currentValue)) {
        alert('Please fill in all fields');
        return;
    }

    const newInvestment = { assetName, amountInvested, currentValue };
    investments.push(newInvestment);

    updateInvestmentTable();
    updateTotalValue();
    renderChart();
}

// Function to update the investment table
function updateInvestmentTable() {
    investmentTableBody.innerHTML = '';
    
    investments.forEach((investment, index) => {
        const percentageChange = ((investment.currentValue - investment.amountInvested) / investment.amountInvested * 100).toFixed(2);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${investment.assetName}</td>
            <td>$${investment.amountInvested.toFixed(2)}</td>
            <td>$${investment.currentValue.toFixed(2)}</td>
            <td>${percentageChange}%</td>
            <td>
                <button class="update-btn" onclick="updateInvestment(${index})">Update</button>
                <button class="remove-btn" onclick="removeInvestment(${index})">Remove</button>
            </td>
        `;
        investmentTableBody.appendChild(row);
    });
}

// Function to remove an investment
function removeInvestment(index) {
    investments.splice(index, 1);
    updateInvestmentTable();
    updateTotalValue();
    renderChart();
}

// Function to update an investment (you can implement this)
function updateInvestment(index) {
    // Add functionality to update the investment
    console.log(`Updating investment ${index}`);
}
