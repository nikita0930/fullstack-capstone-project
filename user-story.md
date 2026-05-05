# User Story Template

## User Story
**As a** registered user  
**I need** to log into the application  
**So that** I can access my personalized dashboard  

## Details and Assumptions
* Users must register before logging in  
* Authentication uses email and password  
* Secure session or token-based authentication is implemented  

## Acceptance Criteria

```gherkin
Given the user is registered with email "user@example.com" and password "password123"  
When the user enters valid credentials and clicks the login button  
Then the user should be redirected to the dashboard  

Given the user enters an incorrect password  
When the user attempts to log in  
Then an error message "Invalid email or password" should be displayed  

Given the user leaves the email or password field empty  
When the user submits the login form  
Then validation messages should be shown indicating required fields  

Given the user is successfully logged in  
When the user refreshes the page  
Then the session should persist and the user remains logged in  
