
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
loanType.addEventListener("change", function () {
    const selectedLoan = loanTypes.find(function (loan) {
        return loan.id === loanType.value;
    });

    if (selectedLoan) {
        annualRate.textContent = selectedLoan.annualRate + "%";
    } else {
        annualRate.textContent = "--";
    }
});

loadLoanTypes();
