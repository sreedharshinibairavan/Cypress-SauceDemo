# cypress-demo-e2e
This package is to run the Cypress tests for Sauce Demo website.

Tools used -
* Cypress
* mochawesome - report

Prerequisites -
* Node
* NPX
* NPM
* Go to the Tests folder - Install Cypress - `npm install cypress`
* Install mochawesome for reports - `npm install --save-dev cypress-multi-reporters mocha-junit-reporter`

Steps to run the tests locally on the command line - 
* Run command `npx cypress open --env username={username},password={passwprd}` to run the tests on a browser
* Run command `npx cypress run --env username={username},password={passwprd}` to run the tests headless

Steps to run the tests wirth report - 
* To run the test and save report `npx cypress run --env username={username},password={password} —-reporter mochawesome`
* To generate report `npx mochawesome-merge "cypress/results/*.json" > mochawesome.json`
* To generate the HTML file `npx marge mochawesome.json`

Sample HTML Report - 

<img width="1725" alt="Screenshot 2022-08-19 at 1 43 15 PM" src="https://user-images.githubusercontent.com/58805239/185575004-0a9db638-e3db-4fee-9b3f-1f7673449e07.png">
