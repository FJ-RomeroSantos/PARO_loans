# User Personas

> Fictional personas created for the PARO academic project.

## Persona 1: Prince Nwaekwu, the Confident Applicant

| | |
|---|---|
| **Age** | 28 |
| **Occupation** | Freelance graphic designer |
| **Tech skills** | High. Uses banking apps and online shopping daily |
| **Device** | Laptop and smartphone |
| **PARO role** | Regular user |

**Goal:** Get a personal loan to buy new equipment for his business, and know exactly how much he will pay each month.

**Needs**
- A fast and clear calculator
- Transparent total cost and interest
- A short application with no unnecessary steps

**Frustrations**
- Hidden fees and confusing terms
- Long forms that ask for the same data twice
- Not knowing the status of his request

**Key scenario:** Prince registers, tries several amounts and terms in the calculator, picks the one that fits his budget and submits the application in under five minutes.

---

## Persona 2: Naomi Solorio, the Cautious First-Time User

| | |
|---|---|
| **Age** | 54 |
| **Occupation** | Small shop owner |
| **Tech skills** | Low. Uses WhatsApp and little else |
| **Device** | Smartphone |
| **PARO role** | Regular user |

**Goal:** Get an education loan to pay for her son's university tuition, without making mistakes.

**Needs**
- Simple navigation and large, clear buttons
- Plain language with no financial jargon
- Clear messages when something is wrong

**Frustrations**
- Crowded screens with too many options
- Fear of making an error and losing her data
- Technical terms she does not understand

**Key scenario:** Naomi logs in, follows the sidebar to the calculator, tests the education loan and needs clear validation messages and a summary before sending her application.

---

## Persona 3: Alberto Alowayran, the Loan Reviewer

| | |
|---|---|
| **Age** | 41 |
| **Occupation** | Loan officer at PARO |
| **Tech skills** | Medium |
| **Device** | Desktop computer |
| **PARO role** | Administrator |

**Goal:** Review incoming applications quickly and decide whether to approve or reject each one.

**Needs**
- One table with all applications and their status
- Applicant and loan data visible at a glance
- Approve and reject actions in one click
- Filters to find pending applications

**Frustrations**
- Having to open each application separately
- Not telling pending applications from reviewed ones
- Accidentally giving a regular user access to admin tools

**Key scenario:** The admin logs in, filters by "Pending", reviews each application and approves or rejects it.

---

## How the personas guide design

| Design decision | Persona behind it |
|---|---|
| Result card with total payment and total interest | Prince |
| Simple sidebar and large buttons | Naomi |
| Validation messages in plain English | Naomi |
| Request summary before the form | Prince, Naomi |
| Status badges and filters in the admin table | Admin |
| `requireAdmin()` protecting `admin.html` | Admin |
