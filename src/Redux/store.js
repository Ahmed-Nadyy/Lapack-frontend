import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import laptopReducer from './slices/laptopSlice';

// Initialize state from localStorage if available
const token = localStorage.getItem('token');
const userRole = localStorage.getItem('userRole');

const initialAuthState = {
    isAuthenticated: !!token, // Convert to boolean
    userRole: userRole || null
};

const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case 'LOGIN':
            // Store userRole in localStorage for persistence
            localStorage.setItem('userRole', action.payload);
            return { ...state, isAuthenticated: true, userRole: action.payload };
        case 'LOGOUT':
            // Clear userRole from localStorage
            localStorage.removeItem('userRole');
            return { ...state, isAuthenticated: false, userRole: null };
        default:
            return state;
    }
};

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    laptops: laptopReducer
});

// Create store with thunk middleware
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;
