# cypress-demo-e2e
This package is to run the Cypress tests for Sauce Demo website.

Tools used -
* Cypress
* Javascript
* Mochawesome - report
* ESLint
* CircleCI

Prerequisites -
* Node
* NPX
* NPM
* Go to the Tests folder (Cypress-SauceDemo) - Install Cypress - `npm install cypress`
* Install mochawesome for reports - `npm install --save-dev cypress-multi-reporters mocha-junit-reporter`

Steps to run the tests locally through command prompt - 
* Run command `npx cypress open --env username={username},password={password},username1={username1},username2={username2},username3={username3}` to run the tests on a browser
* Run command `npx cypress run --env username={username},password={password},username1={username1},username2={username2},username3={username3}` to run the tests headless
* After running the test once, you will have the mochawesome reports stored in your local. Before running it again, you will have to delete those reports to get the next report as expected. This is sorted in CI/CD and this step is just when you run the tests locally. Command to delete reports - `npm run delete-mochawesome-results`

Steps to run the tests with report (Headless) - 
* To run the test and save report `npx cypress run --env username={username},password={password},username1={username1},username2={username2},username3={username3} --reporter mochawesome`
* To generate and merge JSON report `npm run merge-reports`
* To generate the HTML file `npm run create-report`

ESLint - 
Before pushing the code to this repo, run lint to make sure its all fine, else the build might fail.
* To run lint - `npm run lint-check`
* To fix lint - `npm run lint-fix`

To see this HTML report in CircleCI -
* Enter into the build -> test -> Artifacts -> mochawesome-report/mochawesome.html (Click Open)

Sample HTML Report - 

<img width="864" alt="Screenshot 2022-08-22 at 7 52 13 PM" src="https://user-images.githubusercontent.com/58805239/185944721-2574e8a0-dafd-461a-99a1-651dbdda13ee.png">
