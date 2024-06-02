
# Pokemon App

This project is a Pokemon application built with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

Ensure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) (version 6.x or later) or [yarn](https://yarnpkg.com/) (version 1.22.x or later)

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/annaguzel/pokemon-app.git
cd pokemon-app
npm install
```

If you prefer using yarn:

```bash
git clone https://github.com/your-username/pokemon-app.git
cd pokemon-app
yarn install
```

## Running the App

### Development Mode

To run the app in development mode with hot reloading:

```bash
npm start
```

or

```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits, and you will also see any lint errors in the console.

### Production Build

To build the app for production:

```bash
npm run build
```

or

```bash
yarn build
```

This will create an optimized build in the `build` folder. The build is minified and the filenames include the hashes. Your app is ready to be deployed.

### Running Tests

To launch the test runner in interactive watch mode:

```bash
npm test
```

or

```bash
yarn test
```

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Custom Configurations

You can configure the application by setting environment variables. Create a `.env` file in the root of your project and add the following variables:

```env
REACT_APP_API_URL=https://pokeapi.co/api/v2
```

Replace the placeholders with actual values as needed. Refer to the [Create React App documentation](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables) for more details on adding custom environment variables.

## Ejecting from Create React App

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time:

```bash
npm run eject
```

or

```bash
yarn eject
```

This command will remove the single build dependency from your project. Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) directly into your project. At this point, you have full control over them, but you are on your own.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
