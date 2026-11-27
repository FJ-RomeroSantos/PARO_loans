document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
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
  }

  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
      const alertBox = document.getElementById("loginAlert");

      alertBox.textContent = "";
      alertBox.classList.add("d-none");

      try {
        const response = await fetch("data/users.json");

        if (!response.ok) {
          throw new Error("Could not load the account data.");
        }

        const data = await response.json();
        const demoUsers = Array.isArray(data.users) ? data.users : [];
        const registeredUsers = JSON.parse(localStorage.getItem("paro_users") || "[]");

        if (!Array.isArray(registeredUsers)) {
          throw new Error("Stored users are not an array.");
        }

        const user = [...demoUsers, ...registeredUsers].find(
          (account) => account.username === username && account.password === password
        );

        if (!user) {
          alertBox.textContent = "Incorrect username or password.";
          alertBox.classList.remove("d-none");
          return;
        }

        localStorage.setItem(
          "paro_session",
          JSON.stringify({
            username: user.username,
            name: user.name,
            role: user.role
          })
        );

        window.location.href = "home.html";
      } catch (error) {
        alertBox.textContent = "Unable to log in. Please try again.";
        alertBox.classList.remove("d-none");
      }
    });
  }
});

function getSession() {
  try {
    const session = JSON.parse(localStorage.getItem("paro_session"));

    if (
      !session ||
      typeof session.username !== "string" ||
      typeof session.role !== "string"
    ) {
      return null;
    }

    return session;
  } catch (error) {
    return null;
  }
}

function requireLogin() {
  const session = getSession();

  if (!session) {
    window.location.href = "index.html";
    return null;
  }

  return session;
}

function requireAdmin() {
  const session = getSession();

  if (!session) {
    window.location.href = "index.html";
    return null;
  }

  if (session.role !== "admin") {
    window.location.href = "home.html";
    return null;
  }

  return session;
}

function logout() {
  localStorage.removeItem("paro_session");
  window.location.href = "index.html";
}
