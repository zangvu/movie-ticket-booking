import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  currentUser: state.authReducer.currentUser,
});
const withLayout = (WrappedComponent) => {
  return connect(mapStateToProps)(
    class extends Component {
      render() {
        const { component: Component, isPrivate, ...rest } = this.props;
        const content = (
          <Route
            {...rest}
            render={(routeProps) => (
              <WrappedComponent>
                <Component {...routeProps} />
              </WrappedComponent>
            )}
          />
        );

        // protect private route
        if (isPrivate) {
          if (this.props.currentUser) {
            // console.log(this.props.currentUser);
            return content;
          }
          alert('Please login!');
          return <Redirect to='/' />;
        }

        return content;
      }
    }
  );
};
export default withLayout;
