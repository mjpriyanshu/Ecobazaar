# EcoBazaar Frontend

The frontend application for EcoBazaar - a modern e-commerce platform dedicated to sustainable and eco-friendly products. Built with React and Vite, this application provides an intuitive shopping experience for conscious consumers.

## Features

- **User Authentication**: Secure login and registration system
- **Responsive Design**: Mobile-first, fully responsive UI
- **User Dashboard**: Personalized user dashboard
- **Profile Management**: View and update user profiles
- **Modern UI/UX**: Clean and intuitive interface
- **Fast Performance**: Powered by Vite for lightning-fast development and builds

## Technology Stack

- **React 18** - Modern UI library
- **Vite** - Next-generation frontend tooling
- **React Router** - Client-side routing
- **Axios/Fetch** - HTTP client for API calls
- **CSS3** - Styling and animations
- **ESLint** - Code quality and consistency

## Project Structure

```
src/
├── assets/           # Static assets (images, icons)
├── pages/            # Page components
│   ├── Home.jsx      # Landing page
│   ├── Login.jsx     # Login page
│   ├── SignUp.jsx    # Registration page
│   ├── Dashboard.jsx # User dashboard
│   └── Profile.jsx   # User profile page
├── App.jsx           # Main app component
├── App.css           # App-level styles
├── main.jsx          # Application entry point
└── index.css         # Global styles
```

## Prerequisites

- Node.js 16.x or higher
- npm or yarn

## Setup and Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure API Endpoint**
   
   Update the API base URL in your configuration to point to the backend:
   ```javascript
   const API_URL = 'http://localhost:8080';
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   
   Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## Development

This project uses:
- **Vite** for fast HMR and optimized builds
- **@vitejs/plugin-react** for Fast Refresh
- **ESLint** for code quality

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Backend Integration

This frontend connects to the EcoBazaar Spring Boot backend API. Ensure the backend is running at `http://localhost:8080` before starting the frontend application.

## Future Enhancements

- Product browsing and search
- Shopping cart functionality
- Checkout and payment integration
- Order history and tracking
- Product reviews and ratings
- Wishlist feature
- Admin panel for product management
- Advanced filtering and sorting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)


