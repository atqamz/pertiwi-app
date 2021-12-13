import "./UserOption.css";
import React, { Fragment } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { Dashboard, Person, ListAlt, Login, Logout } from "@mui/icons-material";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../../../_actions/userAction";

const UserOption = ({ user, isAuth }) => {
  const history = useHistory();
  const alert = useAlert();

  const dispatch = useDispatch();

  const dashboard = () => {
    history.push("/admin/dashboard");
  };
  const profile = () => {
    history.push("/me");
  };
  const order = () => {
    history.push("/order/me");
  };
  const userLogin = () => {
    history.push("/login");
  };
  const userLogout = () => {
    dispatch(logout());
    alert.success("Logout Success!");
  };

  const actions = [{ icon: <Login />, name: "Login", func: userLogin }];

  if (isAuth && isAuth) {
    actions.shift();
    actions.push(
      { icon: <Person />, name: "Profile", func: profile },
      { icon: <ListAlt />, name: "Order", func: order },
      { icon: <Logout />, name: "Logout", func: userLogout }
    );
  }

  if (user && user.role === "admin") {
    actions.unshift({ icon: <Dashboard />, name: "Dashboard", func: dashboard });
  }

  return (
    <Fragment>
      <SpeedDial
        ariaLabel='speedDial'
        className='speedDial'
        icon={
          <img
            className='speedDialIcon'
            src={user ? user.avatar.url : "/blankuser.jpg"}
            alt=''
          />
        }
        direction='down'
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            onClick={action.func}
            tooltipTitle={action.name}
            tooltipOpen
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOption;
