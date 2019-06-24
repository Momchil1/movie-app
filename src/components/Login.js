import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {loginUser, registerUser, toggleErrorMsg, toggleRegister} from '../actions'
import {withRouter} from 'react-router-dom';

class Login extends React.Component {

    renderEmailInput = (formProps) => {
        return(
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input {...formProps.input} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                       placeholder="Enter email"/>
            </div>
        )
    };

    renderPassInput = (formProps) => {
        return(
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input {...formProps.input} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>
        )
    };

    onSubmit = (formValues) => {
        if (this.props.register){
            this.props.registerUser(formValues, this.props.history);
        } else {
            this.props.loginUser(formValues, this.props.history);
        }
    };

    toggleRegister = () => {
        this.props.toggleRegister(true);
    };

    render() {
        return(
            <div className="container d-flex justify-content-center">
                <form className="col-8" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <h1>{this.props.register?'Register':'Login'}</h1>
                    <Field name="email" component={this.renderEmailInput}/>
                    <Field name="password" component={this.renderPassInput}/>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button type="button" className="btn btn-link" onClick={this.toggleRegister}>Register</button>
                    </div>

                    {this.props.errorMsg.bool?
                    <div className="alert alert-danger mt-3" role="alert" onClick={() => {this.props.toggleErrorMsg(false)}}>
                        {this.props.errorMsg.message}
                    </div>
                    : null}
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        errorMsg: state.error,
        register: state.toggleRegister
    }
};

const formWrapped = reduxForm({
    form: 'movieAppForm',
    destroyOnUnmount: false
})(Login);

// here we use withRouter from react-router-dom to get access to the history object. Then we pass this history object (this.props.history)
// to the function (onSubmit) where we call the action creator. This way we can use the history object outside this component - in our
// action creator and redirect after login
export default connect(mapStateToProps, {loginUser, registerUser, toggleErrorMsg, toggleRegister})(withRouter(formWrapped))