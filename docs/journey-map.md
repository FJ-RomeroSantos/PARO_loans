# Journey Map

> Scores go from 1 (frustrated) to 5 (satisfied). Fictional personas.

## Journey 1: Prince applies for a loan

```mermaid
journey
    title Prince: from registration to application
    section Access
      Opens the site and finds the login: 4: Prince
      Creates an account: 4: Prince
      Logs in: 5: Prince
    section Explore
      Reads the home page and the sidebar: 4: Prince
      Opens the loan calculator: 5: Prince
    section Calculate
      Tries different amounts and terms: 5: Prince
      Compares monthly payment and total interest: 4: Prince
    section Apply
      Reviews the loan summary: 5: Prince
      Fills in his personal data: 3: Prince
      Receives the confirmation with an ID: 5: Prince
```

## Journey 2: Naomi's first time

```mermaid
journey
    title Naomi: first-time user
    section Access
      Finds the login page: 3: Naomi
      Registers with help from the form: 2: Naomi
      Logs in: 3: Naomi
    section Explore
      Reads the home page: 3: Naomi
      Finds the calculator in the sidebar: 4: Naomi
    section Calculate
      Chooses the education loan: 4: Naomi
      Enters an amount out of range and sees a message: 2: Naomi
      Fixes the value and sees the result: 4: Naomi
    section Apply
      Reviews the summary before sending: 4: Naomi
      Completes the form: 3: Naomi
      Sees the success message: 5: Naomi
```

## Journey 3: Administrator reviews applications

```mermaid
journey
    title Admin: reviewing applications
    section Access
      Logs in with admin account: 5: Admin
      Opens the Admin Panel from the sidebar: 5: Admin
    section Review
      Filters pending applications: 5: Admin
      Reads applicant and loan data in the table: 4: Admin
    section Decision
      Approves or rejects an application: 5: Admin
      Sees the status badge update: 5: Admin
```

## Flow chart of the system

```mermaid
flowchart TD
    A[Login] -->|New user| B[Register]
    B --> A
    A -->|Role: user| C[Home + Sidebar]
    A -->|Role: admin| C
    C --> D[Loan Calculator]
    D --> E[Request: summary + form]
    E --> F[(paro_requests)]
    C -->|Admin only| G[Admin Panel]
    F --> G
    G --> H{Decision}
    H --> I[Approved]
    H --> J[Rejected]
    C --> K[Log out]
    K --> A
```

## Pain points and opportunities

| Pain point | Persona | Solution in PARO |
|---|---|---|
| Out-of-range amounts confuse the user | Naomi | Clear validation messages in plain English |
| Filling in personal data feels long | Prince | Only 4 required fields |
| Not knowing the total cost | Prince | Result card with total payment and interest |
| Hard to tell pending from reviewed applications | Admin | Status badges and filter |
| Regular users reaching admin tools | Admin | `requireAdmin()` redirect |
