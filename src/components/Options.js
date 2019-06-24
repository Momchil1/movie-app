import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link, withRouter} from 'react-router-dom';
import {getCategory} from '../actions';
import jwt_decode from 'jwt-decode';

class Options extends React.Component {

    selectCategory = (event) => {
        this.props.getCategory(event.target.value);
    };

    selectYear = (event) => {
        this.props.getCategory(this.props.category, null, event.target.value);
    };

    onSubmit = (formValues) => {
        this.props.getCategory(this.props.category, formValues.search);
    };

    renderSearch = (formProps) => {
        return (
            <div className="input-group mt-3">
                <input {...formProps.input} type="text" className="form-control" placeholder="Find movies"
                       aria-describedby="button-addon2"/>
                <div className="input-group-append">
                    <button className="btn btn-info" type="button"
                            id="button-addon2" onClick={this.props.handleSubmit(this.onSubmit)}>Search
                    </button>
                </div>
            </div>
        )
    };

    logOut = () => {
        localStorage.removeItem('user_token');
        // When we include a page component in our app, it is often wrapped in a <Route> component like this:
        // <Route path='/details/:id' component={Details}/>
        // By doing this, the Details component has access to this.props.history so it can redirect the user with this.props.history.push()
        // Some components appear on every page, so are not wrapped in a <Route>, like this component - Options.
        // This means the Options cannot redirect the user.
        // To get around this problem, the Options component can be wrapped in a withRouter function from react-router-dom, when it is exported:
        // export default withRouter(Options)
        // This gives the Options component access to this.props.history, which means the Options can now redirect the user.
        this.props.history.push('/');
    };

    render() {
        const token = localStorage.getItem('user_token');
        let decoded = '';
        if (token){
            decoded = jwt_decode(token);
        }

        const login = <Link to={'/auth/login'} className="btn btn-info">Login</Link>;
        const user = <div>
            <Link to={'/auth/profile'} className="text-light mr-2">Hello, {decoded.email}</Link>
            <button className="btn btn-info" onClick={this.logOut}>Logout</button>
        </div>;
        // return the past 100 years
        const years = Array.from(Array(100), (e, i) => {return new Date().getFullYear() - i});

        return (
            <div>
                <div className="container d-flex justify-content-between p-0">
                    <select onChange={this.selectCategory} className="btn btn-info" defaultValue={'movies'}>
                        <option value="movie">Movies</option>
                        <option value="tv">TV Series</option>
                    </select>
                    <select onChange={this.selectYear} className="btn btn-info">
                        {years.map((year) => {
                            return (<option key={year} value={year}>{year}</option>)
                        })}
                    </select>
                    {localStorage.user_token ? user : login}
                </div>
                <Field name="search" component={this.renderSearch}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        category: state.category
    }
};

const formWrapped = reduxForm({
    // same name of the form: field like the forms in the other components. If the name is the same redux form library
    // will create one common object from all the form fields of all forms
    form: 'movieAppForm',
    destroyOnUnmount: false
})(Options);

export default connect(mapStateToProps, {getCategory})(withRouter(formWrapped));