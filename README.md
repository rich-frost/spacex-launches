# SpaceX Launches

## :superhero: Getting started

### Pre-requisites

Node 20

### Setup the application

```bash
nvm use
npm install
```

### Run the application

```bash
npm run dev
```

To view the application; in your browser navigate to: http://localhost:3010

### Run the code quality tools

```bash
npm run lint # Check the codebase is linted correctly
npm run test # Run the unit tests
npm run coverage # Run the test coverage report
```

## :classical_building: Work undertaken

Based on the brief to fetch launches from SpaceX. The main areas of note are:

- Added pagination to the GraphQL query to only fetch 10 launches at a time
- Added a `Load more` button at the bottom to enable further pages of data
- Considered responsive design, cards change layout on mobile vs desktop
- Checked accessibility against `WAVE` and `axe devTools` as well as Google Lighthouse
- Added search and sort options at the top of the page. Whenever these values are changed; the URL is updated to enable bookmarking and sharing
- Added a basic loadng message when loading more items
- Added `alt` tags to images for accessibility
- Added semantic HTML - `header`, `main`, `footer`, `ul / li` for cards
- Added dark and light theme

### Unit tests

A few unit tests have been written; most notably:

- [LaunchCard](./src/app/components/LaunchCard/index.test.tsx)
- [launchParser](./src/app/lib/parsers/launchParser.test.tsx)

### End to end tests

These have been added in a sub-folder `e2e/`. These have been setup to run against Desktop / Tablet / Mobile devices and include functional tests and accessibility checks.

Make sure the application is running first, then run the e2e tests:

```bash
cd e2e/
npm install
npm run test
```

### Storybook

A simple Storybook setup has been created; the goal in a full system would be to include stories for all components along with appropriate docs. The main story created is for [LaunchCard](./src/app/components/LaunchCard/LaunchCard.stories.tsx). Run Storybook with:

```bash
npm run storybook
```

## :books: Areas still to improve

- Failed to alter the results returned from the API to search/sort :cry:.
  - Used the [Explorer](https://studio.apollographql.com/public/spacex-l4uc6p/variant/main/explorer) directly and the provided Schema documentation and couldn't get the variables to work even then
- Styling could be improved further with more time
- Error handling is minimal
- Could do with adding more logging capabilities to enable monitoring of the system if in production
- Add a lot more unit tests for the components
- Add further e2e tests with Playwright
- Added CI/CD pipelines to run tests
