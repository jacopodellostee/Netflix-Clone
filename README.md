# Netflix Clone - React SPA Project

## Project Overview

Netflix Clone is a Single Page Application (SPA) developed in React as the final exams. 

The application replicates the Netflix user interface and user experience by integrating The Movie Database (TMDB) API to fetch and display current movie and TV show data. 

This project serves as a demonstration of our skills and knowledge of React and it's practices, like state management, routing, API integration etc...

**Live Demo:** [https://netflix-clone-rose-seven-98.vercel.app](https://netflix-clone-rose-seven-98.vercel.app)

## Development Team

This project was developed by:

- **Jacopo Dell'Oste** 
- **Matteo Paglietta** 

## Project Features

The application enables users to:

- **Browse Content:** Explore multiple categories of movies and TV shows (Trending, Top Rated, Netflix Originals) through TMDB API integration
- **Responsive User Interface:** Enjoy seamless navigation optimized for devices of all sizes using Tailwind CSS utility-first styling
- **Favorites Management:** Add and remove movies and TV shows from a personal favorites list with persistent storage
- **Content Details:** View comprehensive information for each title including plot summary, ratings, release year, genres, and cast information
- **Search Functionality:** Search for specific movies and TV shows with dedicated results page
- **Intuitive Navigation:** Experience a fixed navigation bar that dynamically transforms during page scroll, mirroring Netflix's design

## Technology Stack

| Category | Technology | Version | Description |
|----------|-----------|---------|-------------|
| **Framework** | React | 19.1.1 | JavaScript library for building user interfaces |
| **Build Tool** | Vite | 7.1.7 | Next generation frontend tooling for fast development |
| **Routing** | React Router DOM | 7.9.5 | Client-side routing and navigation library |
| **State Management** | Context API | Native | React's built-in solution for global state management |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS framework for rapid UI development |
| **Linting** | ESLint | 9.36 | Static code analysis tool for maintaining code standards |
| **External API** | TMDB API | v3 | The Movie Database API for movie and TV show data |

**NOTE** for a simple table structure, React in called a *framework* but in reality it's a **JS Library**

## Project Architecture and Design Decisions

### 1. Tailwind CSS Selection

Tailwind CSS was chosen as the primary styling solution for this project. The utility-first approach enabled rapid interface development while maintaining maximum flexibility and excellent responsive design capabilities. This decision was made to provide the development team with hands-on experience with modern CSS-in-utility approaches, which has become industry standard for React applications.

### 2. Context API for State Management

The React Context API was selected over Redux for state management. While Redux offers powerful capabilities for complex applications, Context API was deemed more appropriate for this project's scope. It provides a lightweight yet sufficiently powerful solution for managing global state such as the favorites list and movie data, while reducing complexity and eliminating the boilerplate code typically associated with external state management libraries.

This choice aligns with React best practices for mid-sized applications and facilitates smoother development without the overhead of Redux configuration.

### 3. Component Architecture

The application follows a modular component-based architecture emphasizing:

- **Single Responsibility Principle:** Each component has a clearly defined, singular purpose
- **Reusability:** Components are designed to be used across multiple sections of the application
- **Logical Organization:** Components are structured in folders that reflect their functional purpose and domain

## Project Structure

```
netflix-clone/
├── node_modules/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── ...
│   ├── components/
│   │   ├── Card.jsx
│   │   ├── CardGrid.jsx
│   │   ├── Carousel.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── MovieCard.jsx
│   │   ├── TVSeriesCard.jsx
│   │   ├── Nav.jsx
│   │   ├── ScrollToTop.jsx
│   │   ├── SearchBar.jsx
│   │   └── SearchBarResultItem.jsx
│   ├── store/
│   │   ├── favorites-context.jsx
│   │   └── movie-context.jsx
│   ├── providers/
│   │   ├── MoviesContextProvider.jsx
│   │   ├── FavoritesContextProvider.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Movies.jsx
│   │   ├── TvShows.jsx
│   │   ├── MovieDetail.jsx
│   │   ├── TvDetail.jsx
│   │   ├── SearchResults.jsx
│   │   ├── Favorites.jsx
│   │   ├── About.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Requirements Implementation

### State Management and Hooks

The application implements comprehensive state management following React best practices:

- **Props:** Data is properly passed between parent and child components using typed props
- **useState Hook:** Local component state is managed for UI interactions (search input, filters, modal states)
- **useEffect Hook:** Side effects are handled for API calls, localStorage synchronization, and cleanup operations
- **useContext Hook:** Global state of the movies and the user's favorites are stored in the respective contexts 

### Global State Management with Context API

The project implements Context API following React patterns:

- **MoviesContext:** Centralized context managing global application state including favorites list and user preferences
- **MoviesProvider:** Provider component wrapping the entire application at the root level in `App.jsx`
- **useContext Hook:** Multiple components consume context data including Home, MovieDetail, Favorites, and TvDetail components

### Reusable Components

The application is composed of modular, reusable components:

- **Header:** Navigation bar with search functionality, used across all pages
- **Row:** Movie/TV show carousel component used for multiple content categories
- **MovieCard:** Individual content card with hover effects and quick actions
- **SearchBar:** Search input component with debouncing
- **LoadingSpinner:** Reusable loading indicator for async operations
- **ErrorBoundary:** Error handling component wrapping route sections

### React Router Navigation

Complete routing implementation with all required routes:

- `/` - Homepage displaying trending and popular content
- `/movies` - Browse all movies by category
- `/tv` - Browse all TV shows by category
- `/movie/:id` - Movie detail page with dynamic routing
- `/tv/:id` - TV show detail page with dynamic routing
- `/search` - Search results page with query string handling
- `/favorites` - User's saved favorites list with persistence
- `/about` - Project information and credits
- `*` - 404 Not Found page for undefined routes

**Routing Features:**
- Layout with `<Outlet />` for persistent header and footer across pages
- `NavLink` with active state styling for navigation indication
- Programmatic navigation using `useNavigate` for redirect actions
- `useParams` for extracting dynamic route parameters
- `useSearchParams` for managing search query parameters

### API Integration and Data Fetching

The application integrates with The Movie Database (TMDB) API across multiple endpoints:

- **Trending Content:** Fetches trending movies and TV shows
- **Category Browsing:** Popular, top-rated, and upcoming content
- **Search Functionality:** Full-text search across movies and TV shows
- **Content Details:** Individual movie and TV show information with cast and crew
- **Image Assets:** Movie posters and backdrop images

**API Call Distribution:**
- Home page: Fetches trending and popular content (2+ calls)
- Search page: Fetches search results based on user query
- Detail pages: Fetch specific content information and cast details
- Favorites: Retrieves favorited items from teh Favorite's Context

**Error Handling:**
- Try-catch blocks for all API operations
- User-friendly error messages displayed in UI
- Retry functionality for failed requests
- Fallback UI states when data is unavailable

**Performance Optimization:**
- Request caching to prevent redundant API calls
- Debounced search input to reduce unnecessary requests
- Lazy loading of content as user scrolls
- Image lazy loading for improved page performance

### Data Persistence

The application implements localStorage for data persistence:

- **Favorites List:** User's selected movies and TV shows are saved and persist across sessions
- **User Preferences:** Search history, view preferences, and application settings
- **Session Data:** Temporarily stores API responses to optimize performance

localStorage is utilized with custom hooks that handle serialization/deserialization automatically.

### Responsive Design and User Interface

- **Mobile-First Approach:** Tailwind CSS breakpoints ensure usability on all screen sizes
- **Interactive States:** Hover effects on buttons, cards, and navigation elements with smooth transitions
- **Loading Indicators:** Skeleton screens and spinners provide feedback during asynchronous operations
- **Image Handling:** Fallback placeholders for missing images with graceful error management
- **Accessibility:** Semantic HTML, proper contrast ratios, and keyboard navigation support

## Installation and Setup

### Prerequisites

Before beginning setup, ensure the following tools are installed:

- **Node.js:** Version 18.0 or higher. Download from [https://nodejs.org](https://nodejs.org)
- **npm:** Node Package Manager (automatically installed with Node.js)
- **TMDB API Account:** Register at [https://www.themoviedb.org](https://www.themoviedb.org) to obtain API credentials

### Step 1: Clone the Repository

```bash
git clone https://github.com/jacopodellostee/Netflix-Clone.git
cd netflix-clone
```

### Step 2: Install Dependencies

Open a terminal in the project root directory and execute:

```bash
npm install
```

This command installs all required dependencies specified in `package.json`.

### Step 3: Configure Environment Variables

1. Create a new file named `.env` in the project root directory
2. Copy the `.env.example` template in the `.env` and populate with your TMDB credentials:

```
# TMDB API Configuration
VITE_API_BASE_URL=https://api.themoviedb.org/3
VITE_APP_BEARER_TOKEN=your_tmdb_bearer_token_here
VITE_APP_API_KEYS=your_tmdb_v3_api_key_here
```

3. Replace the placeholder values with actual credentials from your TMDB account

### Step 4: Start Development Server

Execute the development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173` (or the port shown in terminal output).

## External Dependencies Documentation

### Tailwind CSS
- **Purpose:** Utility-first CSS framework for rapid UI development
- **Justification:** Provides an extensive set of pre-configured utilities reducing custom CSS while maintaining design flexibility and consistency
- **Integration:** Configured in `tailwind.config.js` with Vite build pipeline through PostCSS

### React Router DOM
- **Purpose:** Client-side routing and navigation management
- **Justification:** Essential for multi-page navigation in SPA while maintaining application state and optimizing performance
- **Integration:** Integrated at root level in `App.jsx` with `BrowserRouter` wrapper

## Known Issues and Limitations

- The TMDB API free tier includes rate limiting. Heavy usage may result in temporary request throttling.
- Image loading depends on TMDB CDN availability and may have occasional delays.
- Search functionality requires minimum 2-3 characters to trigger API requests.
- Some TV shows may have incomplete cast information in the TMDB database.

## Git Workflow and Version Control

### Branch Strategy

The project follows a feature branch workflow:

- `main` - Production-ready code
- `feature/*` - New feature development
- `fix/*` - Bug fixes and patches

### Commit Conventions

All commits follow semantic messaging standards:

- `feat: ...`
- `fix: ...`
- `style: ...
- `chore: ...`
- `refactor: ...`
- `docs: ...`

## References and Documentation

- [TMDB API Documentation](https://developer.themoviedb.org/docs)
- [React Official Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)

This project was developed as an educational assignment. Usage and modification are permitted for educational purposes.
