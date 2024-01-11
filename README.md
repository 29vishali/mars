# mars
setup cypress and webkit browser:
npm install cypress --save-dev
npm install --save-dev playwright-webkit@1.34 

in order to run the tests in browser:
npx cypress open

in order to run the tests in terminal (choose the desired browser):
npm cypress run --browser webkit
