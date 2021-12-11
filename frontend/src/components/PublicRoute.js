import "../App.css";
import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import { useSelector } from "react-redux";

import Metadata from "./layout/Metadata";
import Topbar from "./layout/Topbar/Topbar";
import Footer from "./layout/Footer/Footer";

const PublicRoute = ({ component: Component, metadata, ...rest }) => {
  const { loading, user, isAuth } = useSelector((state) => state.userState);

  return (
    <Fragment>
      {!loading && (
        <Route
          {...rest}
          render={(props) => {
            return (
              <>
                <Metadata title={`Pertiwi | ${metadata}`} />
                <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                  <Topbar user={user} isAuth={isAuth} />
                  <Component {...props} />
                  <Footer />
                </div>
              </>
            );
          }}
        />
      )}
    </Fragment>
  );
};

export default PublicRoute;
