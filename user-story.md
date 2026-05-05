# User Story Template

## User Story
**As a** registered user  
**I need** to log into the application  
**So that** I can access my personalized dashboard  

## Details and Assumptions
* Users must have a registered account before logging in  
* Authentication will be handled using email and password  
* Secure session or token-based authentication will be used  

## Acceptance Criteria

```gherkin
Given the user is registered with a valid email and password  
When the user enters correct login credentials and clicks the login button  
Then the user should be authenticated and redirected to the dashboard  

Given the user enters an incorrect password  
When the user attempts to log in  
Then an error message "Invalid credentials" should be displayed  

Given the user leaves required fields empty  
When the user submits the login form  
Then validation messages should be shown for missing inputs  

---

# 🎯 Why This Is Better

Your reviewer wanted:

### ❌ Before (Weak)

### ✅ Now (Strong)
- Real scenario ✔  
- Clear behavior ✔  
- Testable conditions ✔  
- Multiple cases (success + error) ✔  

---

# 💡 What Examiners Look For

Good acceptance criteria should:
- Be **specific**
- Be **testable**
- Cover **edge cases**
- Use **real examples**

---

# 🔥 Pro Tip (Optional Upgrade)

If you want to make it even stronger, you can add one more example like:

```gherkin
Given the user session has expired  
When the user tries to access the dashboard  
Then the user should be redirected to the login page  
