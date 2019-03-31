# React MindDoc

[![Build Status](https://travis-ci.org/nicolaspearson/react.minddoc.svg?branch=master)](https://travis-ci.org/nicolaspearson/react.minddoc)
![Coverage statements](https://raw.githubusercontent.com/nicolaspearson/react.minddoc/master/coverage/badge-statements.svg?sanitize=true)
![Coverage lines](https://raw.githubusercontent.com/nicolaspearson/react.minddoc/master/coverage/badge-lines.svg?sanitize=true)
![Coverage functions](https://raw.githubusercontent.com/nicolaspearson/react.minddoc/master/coverage/badge-functions.svg?sanitize=true)

A demo React app for MindDoc built using Typescript, MobX, SASS, and Webpack. It leverages [Create React App Configuration Override](https://github.com/sharegate/craco) in order to provide custom build functionality.

## Getting Started

To get started clone the repository and run:

```bash
yarn install
```

Followed by:

```
yarn start
```

### Features

The app connects to the MindDoc API to retrieve a list of patients, and displays them in a chat app style. I used the web version of Whatsapp as inspiration. See the screenshots below to get a sense of the look and feel.

**Base Functionality**

All of the base functionality below has been developed

- Show a list of patients with all of their personal information.
- Show the avatar image, loading it from the profilePicture attribute.
- Show the online status with an icon (like a green or red light, for instance, a circle).
- Show the linked status with an icon (for instance link and unlink.
- Show the messages ordered from newest to oldest. Graphically show if the message has been read (for instance, with check-double and a grey or blue color).

**Sort Patients**

The patient list is sorted based on the following criteria:

1. Patients with the newest unread messages will always be shown first.
2. Patients with newest read messages.
3. Patients that are linked will be shown before unlinked ones.
4. Alphabetical order (firstName + lastName) for the rest.

**Filter Patients**

Patients can be filtered by using the overflow menu, or searching for a patients name.

The overflow provides the following filter options:

- Show linked patients.
- Show online patients.
- Show patients who have unread messages.

Multiple filters can be applied simultaneously.

### Screenshots

Below are screenshots of the app that showcases some of the developed functionality.

**Landing**

The initial page that is loaded when launching the app:
![1_landing](/screenshots/1_landing.png)

**Filter & Profile**

The filters and profile page:
![2_filter_profile](/screenshots/2_filter_profile.png)

**Messages**

A list of messages received from the patient:
![3_messages](/screenshots/3_messages.png)

**Search**

The search filter:
![4_search](/screenshots/4_search.png)

### Technical Decisions

- **React:** The app is built using React due to familiarity.
- **Typescript:** I use Typescript due to the type-safety provided by the language. I find it decreases cognitive overhead, and allows me to refactor with confidence.
- **MobX:** I used MobX for state management because it provides the ability to observe state variables (see the filters for an example), and requires less boilerplate code.
- **Router5:** Router5 in combination with MobX provides routing functionality, it is lightweight and easy to understand.
- **SASS:** The CSS pre-processor used in the application is SASS due to performance, features, and familiarity.

### Tests

This app has both unit tests (Jest), and integration tests (Jest + Enzyme), you can run the tests by executing the following command:

```
npm run test
```

## Travis CI

This app is linked to Travis CI, and automatically runs all of the tests on every commit.

You can view the latest build status [here](https://travis-ci.org/nicolaspearson/react.minddoc).

### TODO

The features / tasks below still need to be completed.

- Handle error states: Display proper error messages when we are unable to load data from the MindDoc API.
- Make the app responsive: The app is **NOT** responsive at the moment, we can use CSS Grid, and media queries to achieve the desired functionality.
- Complete integration tests: The existing can definitely be improved, currently they implement the minimal amount of testing, this is due to time constraints.
- Complete unit tests: Complete writing the unit tests for the application.

## Available Scripts

In the project directory, you can run:

`npm start`

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

`npm test`

Launches the test runner and executes integration and unit tests.

`npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

## Docker

This project includes a multi-stage Dockerfile.

To build the image:

```
docker build . --tag react-minddoc:1.0
```

Alternatively, build and run:

```
docker-compose up --build
```

Or, just run the existing image:

```
docker-compose up
```

Runs the app in production mode. If you are running this locally your requests to the MindDoc API will be blocked by CORS, in development mode we use a proxy provided webpacks devserver.

Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## Contribution guidelines

Dont commit directly to master, create a feature branch and submit a pull request.
