import React from 'react';
import Modal from './Modal';
import {fetchReviews, toggleModal} from '../actions';
import {connect} from "react-redux";

class Reviews extends React.Component {

    showModal = () => {
        this.props.toggleModal(true);
    };
    hideModal = () => {
        this.props.toggleModal(false);
    };

    componentDidMount() {
        // get the movie id from the url
        const movieId = this.props.match.params.id;
        this.props.fetchReviews(movieId);
    }

    render() {
        const movieId = this.props.match.params.id;
        const reviews = this.props.reviews.map(review => {
            return (
                <div key={review.id} className="card">
                    <h5 className="card-header">
                        {review.title}
                    </h5>
                    <div className="card-body">
                        <p className="card-text">{review.description}</p>
                    </div>
                </div>
            )
        });
        return (
            <div className="w-100">
                <div className="card mb-3 w-100">
                    <div className="row no-gutters">
                        <div className="col-3">
                            <img src={'https://image.tmdb.org/t/p/original' + this.props.details.poster_path} className="card-img" alt="movie_image"/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <p className="card-text">{this.props.details.title}</p>
                                <h3 className="card-title">User Reviews</h3>
                                <button onClick={this.showModal} className="btn btn-primary">Write a Review</button>
                            </div>
                        </div>
                    </div>
                </div>
                {reviews}
                <Modal movieId={movieId} show={this.props.showModal} hide={this.hideModal}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        details: state.details,
        reviews: state.reviews,
        showModal: state.toggleModal
    }
};

export default connect(mapStateToProps, {fetchReviews, toggleModal})(Reviews);