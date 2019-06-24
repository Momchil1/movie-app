import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createReview} from '../actions';

class Modal extends React.Component {

    onSubmit = (formValues) => {
        const movieId = this.props.movieId;
        // add movieId to formValues object
        this.props.createReview({...formValues, movieId});
    };

    renderInput = (formProps) => {
        return (
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input {...formProps.input} type="text" className="form-control" id="title"/>
            </div>
        )
    };

    renderTextarea = (formProps) => {
        return (
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea {...formProps.input} className="form-control" id="description" rows="5"></textarea>
            </div>
        )
    };

    render() {
        const showHideClassName = this.props.show ? "modal d-block" : "modal d-none";

        return (
            <div className={showHideClassName}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Write a Review</h5>
                            <button onClick={this.props.hide} type="button" className="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                <Field name="title" component={this.renderInput}/>
                                <Field name="description" component={this.renderTextarea}/>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary" onClick={this.props.hide}>Send Review</button>
                                    <button type="button" className="btn btn-secondary" onClick={this.props.hide}>Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// the default behaviour of redux form is when the component is destroyed, the state is lost. We can change that with
// passing a prop destroyOnUnmount={false} to you form component, or in you reduxForm() initialization

// reduxForm() will provide the props about the form state and function (this.props.handleSubmit()) to handle the submit process.
const formWrapped = reduxForm({
    form: 'movieAppForm',
    destroyOnUnmount: false
})(Modal);
// in most cases you don't need to worry about the action creators for yourself, as they're already bound to dispatch
// for certain actions, but if you need to you can pass also custom action creators (createReview)
export default connect(null, {createReview})(formWrapped);