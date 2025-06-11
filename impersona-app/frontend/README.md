# Impersona - Frontend

Impersona is a web application designed to make deepfake technology accessible through an intuitive GUI. This directory contains the React-based frontend, which provides a clean and modern user interface built with Material UI.

## Features

- Intuitive UI for seamless deepfake generation workflows
- Media file uploads and text input support
- Responsive design for various screen sizes
- Secure and efficient communication with the backend via a REST API

## Tech Stack

- **React** - Frontend framework
- **Material UI** - UI components for a modern design
- **React Router** - Client-side navigation

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm

### Setup

After cloning the repository install the dependencies:

```sh
cd impersona-frontend
npm install
```

## Running the Application

To start the development server:

```sh
npm start
```

The app will be available at `http://localhost:3000/`.

## Building for Production

To create a production build:

```sh
npm run build
```

This will generate an optimized build in the `build/` directory.

## Extending the Application

To add a new feature or component:

1. Create a new component inside `src/`.
2. If the feature requires a new page, add it inside `src/` and update the routes in `src/App.jsx`.
