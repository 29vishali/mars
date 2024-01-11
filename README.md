# mars

setup cypress and webkit browser:

```
npm install cypress --save-dev
npm install --save-dev playwright-webkit@1.34 
```

in order to run the tests in browser:
```
npx cypress open
```

in order to run the tests in terminal (choose the desired browser):
```
npm cypress run --browser webkit
```

Approach to testing this:
- read the acceptance criteria
- create a list of test cases based on the criteria,(faster way to feed in to chatgpt and then review, modify and edit the list provided)
- do experimental testing 
- refer to other booking sites to get insites on the user flow and experience to compare against this use case

