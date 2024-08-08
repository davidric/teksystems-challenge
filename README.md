# Project Setup and Configuration

## Overview

This project utilizes TurboRepo for managing two applications: a client and a server. The tech stack includes React, TypeScript, NestJS for the backend, Vite, and Tailwind CSS.

## Installation

1. **Install Dependencies**:
   To install the dependencies for both client and server, execute the following command in the root directory:

   ```bash
   npm install
   ```

## Running the Application Locally

### Development Server

To start the development server for both the client and server, execute the following command in the root directory:

```bash
npm run dev
```

The application will be accessible at [localhost:4000](http://localhost:4000) by default.

### Serving the Production Build

1. **Build the Project**:
   To build the project for both the client and server, execute the following command in the root directory:

   ```bash
   npm run build
   ```

2. **Serve the Production Build**:
   To serve the production build, use:

   ```bash
   npm start
   ```

   The application will be available at [localhost:3000](http://localhost:3000), where the React app is served statically by the NestJS server instance.

## Installing New Packages

To add a new package to a specific workspace, use:

```bash
npm install --workspace [client/server] <package-name>
```

For instance, to install `@nestjs/serve-static` in the server workspace:

```bash
npm install --workspace server @nestjs/serve-static
```

## Running Unit Tests

To run unit tests for both the client and server sides of the application, you can use the following command from the root folder of the project:

```bash
npm run test
```

## Running Test Coverage

To generate and view test coverage reports, use the following command:

```bash
npm run test:coverage
```

This will run the tests and produce a coverage report, which can be useful for understanding how much of your code is being tested.

## Mailer Credentials

To view the emails sent to the SMTP server, follow these steps:

1. Visit [Ethereal Mail](https://ethereal.email/messages).
2. Use the following credentials to log in:

   ```
   Name     :  Yesenia Johnson
   Username :  yesenia.johnson34@ethereal.email
   Password :  qeXhzMbcutDrbxBR1W
   ```

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: NestJS
- **Monorepo Management**: TurboRepo

## Please Note

- **Running the App on Glitch**: The app hosted on [Glitch.com](https://glitch.com) is served directly from the build folder. This approach is taken to ensure that the application runs smoothly on the Glitch platform. Any changes made directly in the Glitch editor will **not** be reflected on the preview site. To see your updates, you must rebuild the project and update the build folder accordingly. To run the development server and see live changes, please do so on your local machine.

- **API Calls in Development**: If you observe that API calls are being made twice in development mode, this is typically due to React's Strict Mode. Strict Mode is designed to intentionally double-invoke certain lifecycle methods and effects to help identify side effects and potential issues.

---

For any questions or further assistance, please contact davidlikaldo@gmail.com.
