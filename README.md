# Netflix Clone Project

## Project Overview

This project is a clone of the Netflix user interface, developed as part of a final test in React. It uses The Movie Database (TMDB) API to retrieve and display up-to-date movie and TV show data.

### Tech Stack

*   **Frontend:** React (with Vite)
*   **State Management:** (Add if necessary, e.g., Redux, Context API, Zustand)
*   **Styling:** (Add if necessary, e.g., CSS Modules, Styled Components, Tailwind CSS)
*   **API:** The Movie Database (TMDB)

### Team Members

*   Jacopo Dell'Oste
*   Matteo Paglietta

## Prerequisites

Before you begin, ensure you have the following tools installed on your system:

*   **Node.js:** Version 18 or higher. This is essential for running `npm` and the JavaScript runtime environment.
*   **npm (Node Package Manager):** Automatically installed with Node.js.
*   **TMDB API Keys:** You will need an account on [The Movie Database (TMDB)](https://www.themoviedb.org/) to obtain your API Key and Bearer Token.

## Project Setup

Follow these steps to set up and run the project locally.

### 1. Install Dependencies

Open your terminal in the project's root directory and run the command to install all necessary dependencies:

```bash
npm install
# or
npm i
```

### 2. Configure Environment Variables

The project uses environment variables to manage API keys securely.

1.  Create a new file named `.env` in the project's root directory.
2.  Copy the structure from the `.env.example` file (if present) or use the following:

    ```
    # Base URL for the TMDB API
    VITE_API_BASE_URL=https://api.themoviedb.org/3

    # Your Bearer Token for authentication (recommended)
    VITE_APP_BEARER_TOKEN=your_tmdb_bearer_token

    # Your API Key (v3) for alternative authentication
    VITE_APP_API_KEYS=your_tmdb_v3_api_key
    ```

3.  Replace `your_tmdb_bearer_token` and `your_tmdb_v3_api_key` with the values obtained from your TMDB account.

> **Security Note:** Environment variables starting with `VITE_` are exposed to the client in a Vite application. Ensure you do not commit the `.env` file to version control (it should already be included in `.gitignore`).

### 3. Start the Development Server

Once dependencies are installed and the `.env` file is configured, you can start the application in development mode:

```bash
npm run dev
```

The development server will start, and the application will be accessible at `http://localhost:5173` (or another port specified in the terminal).
