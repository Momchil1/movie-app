import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3/';

export const getCategory = (category, string, year) => async (dispatch) => {
    let movies;
    if (string){
        movies = await axios.get(baseUrl + 'search/' + category + '?api_key=1b5adf76a72a13bad99b8fc0c68cb085&language=en-US&query=' + string);
    } else if (year) {
        movies = await axios.get(baseUrl + 'discover/' + category
            + '?api_key=1b5adf76a72a13bad99b8fc0c68cb085&language=en-US&sort_by=vote_count.desc&primary_release_year=' + year + '&first_air_date_year=' + year);
    } else {
        movies = await axios.get(baseUrl + 'discover/' + category + '?api_key=1b5adf76a72a13bad99b8fc0c68cb085&language=en-US&sort_by=vote_count.desc');
    }
    dispatch({type: 'FETCH_MOVIES', payload: movies.data.results});
    dispatch({type: 'SET_CATEGORY', payload: category});
};

export const fetchMovie = (id, category) => async (dispatch) => {
    const movie = await axios.get(baseUrl + category + '/' + id + '?api_key=1b5adf76a72a13bad99b8fc0c68cb085&language=en-US');
    dispatch({type: 'FETCH_MOVIE', payload: movie.data});
};

export const createReview = (formValues) => async (dispatch) => {
    const response = await axios.post('http://localhost:3001/reviews', formValues);
    dispatch({type: 'CREATE_REVIEW', payload: response});
    // dispatch manually action creator to update the Reviews component after the newly created review is stored in the db
    dispatch(fetchReviews(response.data.movieId));
};

export const fetchReviews = (movieId) => async (dispatch) => {
    const response = await axios.get('http://localhost:3001/reviews');
    // filter the response array and return only the objects which contain the passed movieId
    const filteredResponse = response.data.filter(x => x.movieId === movieId);
    dispatch({type: 'FETCH_REVIEW', payload: filteredResponse});
};

export const loginUser = (formValues, history) => async (dispatch) => {

    try {
        const response = await axios.post('http://localhost:3002/auth/login', {email: formValues.email, password: formValues.password});
        localStorage.setItem('user_token', response.data.access_token);
        dispatch({type: 'LOGIN', payload: response.data.access_token});
        history.push('/');
    } catch (e) {
        dispatch(toggleErrorMsg(true, e.response.data.message));
    }
};

export const registerUser = (formValues, history) => async (dispatch) => {

    const response = await axios.post('http://localhost:3002/auth/register', {email: formValues.email, password: formValues.password});
    console.log(response.data);
    dispatch({type: 'REGISTER', payload: response.data});
    dispatch(toggleRegister(false));
    // history.push('/');
};

export const toggleErrorMsg = (bool, message) => {
    return {
        type: 'TOGGLE_ERROR',
        payload: {bool, message}
    }
};

export const toggleModal = (bool) => {
    return {
        type: 'TOGGLE_MODAL',
        payload: bool
    }
};

export const toggleRegister = (bool) => {
    return {
        type: 'TOGGLE_REGISTER',
        payload: bool
    }
};
