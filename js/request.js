// Only logged-in users can stay on this page (function from auth.js)
const session = requireLogin();

// Read the loan chosen in the calculator
let draft = null;
try {
  draft = JSON.parse(sessionStorage.getItem("paro_draft"));
} catch (e) {
  draft = null;
}

// No loan chosen yet: go back to the calculator
if (session && !draft) {
  window.location.href = "calculator.html";
}

// Format a number as money: $1,234.56
function money(value) {
  return "$" + Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Read the saved applications (empty list if there are none)
function getRequests() {
  try {
    return JSON.parse(localStorage.getItem("paro_requests")) || [];
  } catch (e) {
    return [];
  }
}

// Fill the summary card with the loan from the calculator
function showSummary() {
  document.getElementById("sum-type").textContent = draft.type;
  document.getElementById("sum-amount").textContent = money(draft.amount);
  document.getElementById("sum-months").textContent = draft.months;
  document.getElementById("sum-rate").textContent = draft.annualRate + "%";
  document.getElementById("sum-monthly").textContent = money(draft.monthlyPayment);
  document.getElementById("sum-total").textContent = money(draft.totalPayment);
  document.getElementById("sum-interest").textContent = money(draft.totalInterest);
}

// Save the application and show the success message
function submitRequest(event) {
  event.preventDefault();
  const form = event.target;

  // Bootstrap validation: show red messages if a field is wrong
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  const requests = getRequests();

  // Next ID = highest existing ID + 1 (or 1 if the list is empty)
  const newId = requests.length > 0
    ? Math.max(...requests.map(r => Number(r.id) || 0)) + 1
    : 1;

  // Today's date as YYYY-MM-DD (local time)
  const today = new Date().toLocaleDateString("en-CA");

  // Structure exactly as in the Data Contract
  const newRequest = {
    id: newId,
    date: today,
    username: session.username,
    applicant: {
      fullName: document.getElementById("fullName").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      monthlyIncome: Number(document.getElementById("monthlyIncome").value)
    },
    loan: {
      type: draft.type,
      amount: Number(draft.amount),
      months: Number(draft.months),
      annualRate: Number(draft.annualRate),
      monthlyPayment: Number(draft.monthlyPayment),
      totalPayment: Number(draft.totalPayment),
      totalInterest: Number(draft.totalInterest)
    },
    status: "pending"
  };

  requests.push(newRequest);
  localStorage.setItem("paro_requests", JSON.stringify(requests));

  // The loan has been used, so remove the draft
  sessionStorage.removeItem("paro_draft");

  // Hide summary + form, show the success message
  document.getElementById("request-section").classList.add("d-none");
  document.getElementById("success-id").textContent = newId;
  document.getElementById("success-section").classList.remove("d-none");
}

if (session && draft) {
  showSummary();
  document.getElementById("request-form").addEventListener("submit", submitRequest);
}
