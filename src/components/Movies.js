import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {getCategory} from '../actions';

class Movies extends React.Component {

    componentDidMount() {
        if (this.props.category){
            this.props.getCategory(this.props.category);
        } else {
            this.props.getCategory('movie');
        }
    }

    render() {
        const movies = this.props.movies;

        if (movies.length){
            return movies.map(movie => {
                return (
                    <div className="card col-3" key={movie.id}>
                        <Link to={`details/${movie.id}`}>
                            <img className="card-img-top" src={'https://image.tmdb.org/t/p/original' + movie.poster_path} alt="card pic"/>
                            <div className="card-body">
                                <p className="card-text">{movie.title || movie.original_name}</p>
                            </div>
                        </Link>
                    </div>
                )
            })
        } else {
            return null
        }
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        movies: state.movies,
        category: state.category
    }
};

export default connect(mapStateToProps, {getCategory})(Movies);