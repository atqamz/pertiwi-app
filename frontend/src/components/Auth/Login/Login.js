import "../Auth.css";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../../_actions/userAction";

import Metadata from "../../layout/Metadata";
import Loading from "../../layout/Loading/Loading";

import Sideview from "../Sideview/Sideview";

const Login = ({ history, location }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, isAuth } = useSelector((state) => state.userState);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuth) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, isAuth, history, redirect]);

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(login(user.email, user.password));
  };

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <Metadata title='Pertiwi | Log In' />

      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className='authPage'>
            <Sideview />

            <div className='authContainer'>
              <div className='authCTA'>
                <p>
                  Don't have an account? <Link to='/register'>SIGN UP</Link>
                </p>
              </div>

              <div className='authBox'>
                <h1>Welcome Back!</h1>
                <p>Please enter your details to continue.</p>

                <form className='authForm' onSubmit={loginSubmitHandler}>
                  <div className='authFormInput'>
                    <label htmlFor='email'>Email</label>
                    <input
                      type='email'
                      name='email'
                      placeholder='Enter your email'
                      required
                      value={user.email}
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div className='authFormInput'>
                    <label htmlFor='password'>Password</label>
                    <input
                      type='password'
                      name='password'
                      placeholder='Enter your password'
                      required
                      value={user.password}
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div className='authFormInput'>
                    <Button type='submit' id='submitBtn'>
                      Log In
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
