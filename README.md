# Project Setup and Configuration

## Overview

This project utilizes TurboRepo for managing two applications: a client and a server. The tech stack includes React, TypeScript, NestJS for the backend, Vite, and Tailwind CSS.

## Installation

1. **Install Dependencies**:
   To install the dependencies for both client and server, execute the following command in the root directory:

   ```bash
   npm install
   ```

2. **Install New Packages**:
   To add a new package to a specific workspace, use:
   ```
   npm install --workspace [client/server] <package-name>
   ```
   For instance, to install `@nestjs/serve-static` in the server workspace:
   ```bash
   npm install --workspace server @nestjs/serve-static
   ```

## Development

To start the development server for both client and server, execute the following command in the root directory:

```bash
npm run dev
```

You can then access the application at `localhost:4000`.

## Production

1. **Build the Project**:
   To build the project for both client and server, execute the following command in the root directory:

   ```bash
   npm run build
   ```

2. **Serve the Project**:
   To serve the production build, use:

   ```bash
   npm start
   ```

   The application will be available at `localhost:3000`, where the React app is served statically by the NestJS server instance.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: NestJS
- **Monorepo Management**: TurboRepo

## Additional Notes

- **API Calls in Development**: If you observe that API calls are being made twice in development mode, this is typically due to React's Strict Mode. Strict Mode is designed to intentionally double-invoke certain lifecycle methods and effects to help identify side effects and potential issues.

For any questions or further assistance, please contact davidlikaldo@gmail.com.
