import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {fetchMovie} from '../actions';

class Details extends React.Component {

    componentDidMount() {
        const movieId = this.props.match.params.id;
        const category = this.props.category;
        this.props.fetchMovie(movieId, category);
    }

    render() {
        const movieId = this.props.match.params.id;
        if (this.props.details) {
            return (
                <div className="card-group">
                    <div className="card col-6">
                        <img className="card-img-top" src={'https://image.tmdb.org/t/p/original' + this.props.details.poster_path} alt="card pic"/>
                    </div>
                    <div className="card col-6 ">
                        <div className="card-body">
                            <h1 className="card-text text-center">{this.props.details.original_title || this.props.details.original_name}</h1>
                            <p>{this.props.details.overview}</p>
                            <Link to={`/reviews/${movieId}`} className="btn btn-primary">Show Reviews</Link>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <div>Loading...</div>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        details: state.details,
        category: state.category
    }
};

export default connect(mapStateToProps, {fetchMovie})(Details);