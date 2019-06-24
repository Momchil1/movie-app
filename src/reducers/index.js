import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

const moviesReducer = (movies = [], action) => {
    if (action.type === 'FETCH_MOVIES') {
        return action.payload
    }
    return movies
};

const movieDetails = (details = {}, action) => {
    if (action.type === 'FETCH_MOVIE') {
        return action.payload
    }
    return details
};

const setCategory = (category = '', action) => {
    if (action.type === 'SET_CATEGORY') {
        return action.payload
    }
    return category
};

const createReview = (review = {}, action) => {
    if (action.type === 'CREATE_REVIEW') {
        return action.payload
    }
    return review
};

const fetchReviews = (reviews = [], action) => {
    if (action.type === 'FETCH_REVIEW') {
        return action.payload
    }
    return reviews
};

const toggleModalReducer = (modal = false, action) => {
    if (action.type === 'TOGGLE_MODAL') {
        return action.payload
    }
    return modal
};

const loginReducer = (login = {}, action) => {
    if (action.type === 'LOGIN') {
        return action.payload
    }
    return login
};

const registerReducer = (register = {}, action) => {
    if (action.type === 'LOGIN') {
        return action.payload
    }
    return register
};

const toggleErrorReducer = (error = '', action) => {
    if (action.type === 'TOGGLE_ERROR'){
        return action.payload
    }
    return error
};

const toggleRegisterReducer = (register = false, action) => {
    if (action.type === 'TOGGLE_REGISTER'){
        return action.payload
    }
    return register
};

export default combineReducers({
    movies: moviesReducer,
    details: movieDetails,
    category: setCategory,
    createdReview: createReview,
    reviews: fetchReviews,
    toggleModal: toggleModalReducer,
    login: loginReducer,
    register: registerReducer,
    error: toggleErrorReducer,
    toggleRegister: toggleRegisterReducer,
    form: formReducer
})