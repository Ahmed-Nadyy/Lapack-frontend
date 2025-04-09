# Lapak Frontend

The frontend of Lapak is built with React.js, offering a modern and responsive user interface for our laptop e-commerce platform. It features a comprehensive product catalog, user authentication, and an intuitive shopping experience.

## Features

### User Interface
- Modern, responsive design using Tailwind CSS
- Dynamic product catalog with search and filtering capabilities
- Detailed product pages with comprehensive laptop specifications
- User authentication and profile management
- Shopping cart with real-time updates
- Checkout process with order tracking
- Contact page with team information

### Technical Features
- State management with Redux
- Protected routes with JWT authentication
- Responsive design for all device sizes
- Real-time inventory tracking
- Image optimization with Cloudinary
- Form validation and error handling

## Project Structure
```
src/
├── Assets/           # Static assets and images
├── Components/       # Reusable UI components
├── Pages/           # Page components
├── Redux/           # State management
│   ├── actions/     # Redux actions
│   ├── reducers/    # Redux reducers
│   └── store.js     # Redux store configuration
├── Layout/          # Layout components
├── utils/           # Utility functions
└── api/             # API integration
```

## Tech Stack
- **React.js** - Frontend framework
- **Redux** - State management
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - API requests
- **Heroicons** - Icons

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Navigate to the client directory:
   ```bash
   cd client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the client directory:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000
   REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
   REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts
- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Previews the production build locally

## Component Documentation

### Authentication Components
- `Login` - User login form with validation
- `Register` - User registration form
- `ProtectedRoute` - Route wrapper for authenticated pages

### Product Components
- `ProductList` - Displays product catalog with filtering
- `ProductCard` - Individual product display
- `ProductDetail` - Detailed product information

### Cart Components
- `Cart` - Shopping cart management
- `CartItem` - Individual cart item
- `Checkout` - Checkout process

## State Management

### Redux Store Structure
```javascript
{
  auth: {
    user: null,
    token: null,
    loading: false,
    error: null
  },
  products: {
    items: [],
    loading: false,
    error: null
  },
  cart: {
    items: [],
    total: 0
  }
}
```

## API Integration
- Authentication endpoints
- Product management
- Cart operations
- Order processing

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## Development Guidelines
1. Follow the established code style and conventions
2. Write meaningful commit messages
3. Update documentation for significant changes
4. Add appropriate comments for complex logic
5. Test your changes thoroughly

## Contact
For frontend-related inquiries, please contact:
- Ahmed Nady - [LinkedIn](https://linkedin.com/in/ahmed-nadyy)