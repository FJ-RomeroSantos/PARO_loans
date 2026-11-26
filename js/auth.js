document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  if (!registerForm) {
    return;
  }

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const alertBox = document.getElementById("registerAlert");

    try {
      const users = JSON.parse(localStorage.getItem("paro_users") || "[]");

      if (!Array.isArray(users)) {
        throw new Error("Stored users are not an array.");
      }

      users.push({
        username,
        password,
        role: "user",
        name
      });

      localStorage.setItem("paro_users", JSON.stringify(users));

      alertBox.textContent = "Account created. You can now log in.";
      alertBox.classList.remove("d-none", "alert-danger");
      alertBox.classList.add("alert-success");
      registerForm.reset();
    } catch (error) {
      alertBox.textContent = "Registration could not be completed. Please try again.";
      alertBox.classList.remove("d-none", "alert-success");
      alertBox.classList.add("alert-danger");
    }
  });
});
