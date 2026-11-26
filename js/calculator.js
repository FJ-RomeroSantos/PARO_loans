
let loanTypes = [];

const loanType = document.getElementById("loanType");
const annualRate = document.getElementById("annualRate");
const errorMessage = document.getElementById("errorMessage");

// Load loan types from the JSON file
async function loadLoanTypes() {
    try {
        const response = await fetch("data/loan-type.json");

        if (!response.ok) {
            throw new Error("Could not load loan types.");
        }

        const data = await response.json();
        loanTypes = data.loanTypes;

        loanTypes.forEach(function (loan) {
            const option = document.createElement("option");

            option.value = loan.id;
            option.textContent = loan.name;

            loanType.appendChild(option);
        });

    } catch (error) {
        errorMessage.textContent = "Could not load loan types.";
        console.error(error);
    }
}

// Display the interest rate of the selected loan

// Input fields
const amountInput = document.getElementById("amount");
const monthsInput = document.getElementById("months");

// Result fields
const monthlyPaymentResult = document.getElementById("monthlyPayment");
const totalPaymentResult = document.getElementById("totalPayment");
const totalInterestResult = document.getElementById("totalInterest");

// Format amounts as currency
function formatMoney(value) {
    return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
}

// Calculate loan payments
function calculateLoan() {
    const selectedLoan = loanTypes.find(function (loan) {
        return loan.id === loanType.value;
    });

    const amount = Number(amountInput.value);
    const months = Number(monthsInput.value);

    if (selectedLoan) {
        annualRate.textContent = selectedLoan.annualRate + "%";
    } else {
        annualRate.textContent = "--";
    }

    if (!selectedLoan || amount <= 0 || months <= 0 ||
        !Number.isInteger(months)) {

        monthlyPaymentResult.textContent = "$0.00";
        totalPaymentResult.textContent = "$0.00";
        totalInterestResult.textContent = "$0.00";

        return;
    }

    const monthlyRate = selectedLoan.annualRate / 12 / 100;

    const monthlyPayment = amount * monthlyRate /
        (1 - Math.pow(1 + monthlyRate, -months));

    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - amount;

    monthlyPaymentResult.textContent = formatMoney(monthlyPayment);
    totalPaymentResult.textContent = formatMoney(totalPayment);
    totalInterestResult.textContent = formatMoney(totalInterest);
}

// Update results when inputs change
loanType.addEventListener("change", calculateLoan);
amountInput.addEventListener("input", calculateLoan);
monthsInput.addEventListener("input", calculateLoan);

loadLoanTypes();
