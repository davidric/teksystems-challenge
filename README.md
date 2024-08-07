# Project Setup and Configuration

## Overview

This project is managed with TurboRepo and consists of two applications: a client and a server.

## Installation

1. **Install Dependencies**:
   Run the following command in the root folder to install the dependencies for both client and server:
   `npm install`

2. **Install New Packages**:
   To install a new package in a specific workspace, use the following command:
   `npm install --workspace [client/server] <package-name>`
   For example, to install `@nestjs/serve-static` in the server workspace:
   `npm install --workspace server @nestjs/serve-static`

## Development

- **Default Port**: By default, the development server runs on port `3000`. This setup allows the app to run automatically on platforms like Glitch without needing to run a build script first.
- **API Calls in Development**: If you notice that API calls are being made twice in development mode, this is often due to React's Strict Mode in development. Strict Mode intentionally double-invokes certain lifecycle methods and effects to help identify side effects and issues.

## Production

1. **Build and Serve**:
   - To run the production build, navigate to `localhost:4000`. The React app will be served statically by the NestJS server instance.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: NestJS
- **Monorepo Management**: TurboRepo

For any issues or further assistance, please contact davidlikaldo@gmail.com
