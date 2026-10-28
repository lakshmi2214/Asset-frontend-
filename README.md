# Asset Booking System - Frontend

This is the frontend client for the Asset Booking System.

## Languages & Formats

| Language / Format | Role in Project |
| :--- | :--- |
| **JavaScript (ES6+)** | Application logic, React components, state management, API services (`auth.js`), and configuration scripts |
| **JSX** | React component markup, written in the project's `.js` files to describe the UI |
| **CSS** | Global styling, animations, layout design, and responsive utilities in `src/Css/index.css` |
| **HTML** | Single-page application template entry in `public/index.html` |
| **JSON** | Package metadata, lockfiles (`package.json`, `package-lock.json`), and routing rewrites (`vercel.json`) |
| **Static media** | Equipment photos, icons, and graphic assets used by the interface |

There are no TypeScript source files in the current application source. JSX is not a separate programming language; it is syntax used in JavaScript files to describe React UI.

## Technologies Used

- **React 18** (`react`, `react-dom` ^18.2.0) builds the component-driven user interface.
- **React Router 6** (`react-router-dom` ^6.30.1) provides browser-based client routing.
- **Create React App / `react-scripts`** (5.0.1) handles local development, bundling, and production builds.
- **Bootstrap 5 & React-Bootstrap** (`bootstrap` ^5.3.0, `react-bootstrap` ^2.10.10) along with custom CSS provide responsive layout, cards, modals, and navigation.
- **Date & Scheduling Utilities** (`react-datepicker` ^4.16.0, `date-fns` ^2.30.0) manage reservation date-time selection and formatting.
- **React Icons** (`react-icons` ^5.5.0) provides interface icons.
- **Axios & Fetch API** (`axios` ^1.13.2) handle API communication, token refresh, and authentication.
- **Capacitor** (`@capacitor/core`, `@capacitor/cli`, `@capacitor/android` ^8.0.2) enables mobile build and synchronization.

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
To start the development server:
```bash
npm start
```

### Building for Production
To create a production build:
```bash
npm run build
```
