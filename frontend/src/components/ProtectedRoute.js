import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";

import Metadata from "./layout/Metadata";
import Topbar from "./layout/Topbar/Topbar";
import Footer from "./layout/Footer/Footer";

const ProtectedRoute = ({ component: Component, metadata, ...rest }) => {
  const { loading, user, isAuth } = useSelector((state) => state.userState);

  return (
    <Fragment>
      {!loading && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuth === false) {
              return <Redirect to='/login' />;
            }
            return (
              <>
                <Metadata title={`Pertiwi | ${metadata}`} />
                <Topbar user={user} isAuth={isAuth} />
                <Component {...props} />
                <Footer />
              </>
            );
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
