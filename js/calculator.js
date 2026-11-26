
let loanTypes = [];

const loanType = document.getElementById("loanType");
const annualRate = document.getElementById("annualRate");
const errorMessage = document.getElementById("errorMessage");

// Load loan types from the JSON file
async function loadLoanTypes() {
    try {
        const response = await fetch("data/loan-types.json");

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
const requestButton = document.getElementById("requestButton");

let currentLoan = null;

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

    const amountHelp = document.getElementById("amountHelp");
    const monthsHelp = document.getElementById("monthsHelp");

    errorMessage.textContent = "";
    requestButton.disabled = true;
    currentLoan = null;
    amountInput.classList.remove("is-invalid");
    monthsInput.classList.remove("is-invalid");

    monthlyPaymentResult.textContent = "$0.00";
    totalPaymentResult.textContent = "$0.00";
    totalInterestResult.textContent = "$0.00";

    if (!selectedLoan) {
        annualRate.textContent = "--";
        amountHelp.textContent = "";
        monthsHelp.textContent = "";

        amountInput.removeAttribute("min");
        amountInput.removeAttribute("max");
        monthsInput.removeAttribute("min");
        monthsInput.removeAttribute("max");

        return;
    }

    annualRate.textContent = selectedLoan.annualRate + "%";

    // Update input limits
    amountInput.min = selectedLoan.minAmount;
    amountInput.max = selectedLoan.maxAmount;
    monthsInput.min = selectedLoan.minMonths;
    monthsInput.max = selectedLoan.maxMonths;

    amountHelp.textContent =
        "Min: " + formatMoney(selectedLoan.minAmount) +
        " | Max: " + formatMoney(selectedLoan.maxAmount);

    monthsHelp.textContent =
        "Min: " + selectedLoan.minMonths +
        " | Max: " + selectedLoan.maxMonths + " months";

    // Wait until both fields are filled
    if (amountInput.value === "" || monthsInput.value === "") {
        return;
    }

    // Validate loan amount
    if (amount < selectedLoan.minAmount ||
        amount > selectedLoan.maxAmount) {

        errorMessage.textContent =
            "Loan amount must be between " +
            formatMoney(selectedLoan.minAmount) + " and " +
            formatMoney(selectedLoan.maxAmount) + ".";

        amountInput.classList.add("is-invalid");
        return;
    }

    // Validate loan term
    if (!Number.isInteger(months) ||
        months < selectedLoan.minMonths ||
        months > selectedLoan.maxMonths) {

        errorMessage.textContent =
            "Loan term must be a whole number between " +
            selectedLoan.minMonths + " and " +
            selectedLoan.maxMonths + " months.";

        monthsInput.classList.add("is-invalid");
        return;
    }

    // Calculate payments
    const monthlyRate = selectedLoan.annualRate / 12 / 100;

    const monthlyPayment = amount * monthlyRate /
        (1 - Math.pow(1 + monthlyRate, -months));

    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - amount;

    monthlyPaymentResult.textContent = formatMoney(monthlyPayment);
    totalPaymentResult.textContent = formatMoney(totalPayment);
    totalInterestResult.textContent = formatMoney(totalInterest);

    // Store the calculated loan
currentLoan = {
    type: selectedLoan.name,
    amount: amount,
    months: months,
    annualRate: selectedLoan.annualRate,
    monthlyPayment: Number(monthlyPayment.toFixed(2)),
    totalPayment: Number(totalPayment.toFixed(2)),
    totalInterest: Number(totalInterest.toFixed(2))
};

requestButton.disabled = false;
}

// Update results when inputs change
loanType.addEventListener("change", calculateLoan);
amountInput.addEventListener("input", calculateLoan);
monthsInput.addEventListener("input", calculateLoan);

// Save the loan and open the request page
requestButton.addEventListener("click", function () {
    if (currentLoan === null) {
        return;
    }

    sessionStorage.setItem(
        "paro_draft",
        JSON.stringify(currentLoan)
    );

    window.location.href = "request.html";
});

loadLoanTypes();
