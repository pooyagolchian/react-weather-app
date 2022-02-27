## Weather application
This weather application developed with React.js and React Hook that  provide clean architecture for any project.

- React.js Hook
- Typescript
- SCSS

## Available Scripts

In the project directory, you can run:

### `yarn install`

Install all the dependencies that are needed for developing.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

### `yarn test`


### `yarn run cypress open`
 This  project uses Cypress for E2E test.

---

- 🪄 You can see [demo](https://pooyagolchian.com/react-weather-app/)

# Code scaffolding

- I use several mythology of clean code in this frontend project.


### BEM

BEM is used for methodology with SCSS format to create reusable components for this task. I follow the structure developed in the dummy files.

### Husky

Husky is used for git hook pre-commit to format all code with Prettier.

### Prettier

Using [Prettier](https://prettier.io/) for opinionated code formatter.
It will take care of formatting for you.
Prettier creates an abstract syntax tree from your code and uses it to write new code formatted according to a set of rules.
In addition, I check pretty before every commit by add a pre-commit hook. For more detail check package.json, husky section.

### SOLID

Regarding the `S` for `SOLID` I just tried to keep each function(component as a function as well) to
just responsible for a single task. That's why I just created a separate component for every part
and also keep it simple stupid.

## Test with Jest and Enzyme 🪄

You can run `yarn test`. One integration test that test all functionality in this application
