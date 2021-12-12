import "../Auth.css";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useAlert } from "react-alert";
import { imageprofile } from "./imageprofile";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../../../_actions/userAction";

import Metadata from "../../layout/Metadata";
import Loading from "../../layout/Loading/Loading";

import Sideview from "../Sideview/Sideview";

const Login = ({ history, location }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, isAuth } = useSelector((state) => state.userState);

  const [user, setUser] = useState({
    fname: "",
    lname: "",
    birthdate: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "+62",
    avatar: imageprofile,
  });

  const [isDesktop, setDesktop] = useState(window.innerWidth > 1200);
  const updateMedia = () => {
    setDesktop(window.innerWidth > 1200);
  };
  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
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

  const registerSubmitHandler = (e) => {
    e.preventDefault();

    const form = new FormData();

    form.set("name", `${user.fname} ${user.lname}`);
    form.set("birthdate", user.birthdate);
    form.set("email", user.email);
    form.set("phone", user.phone);
    form.set("password", user.password);
    form.set("confirmPassword", user.confirmPassword);
    form.set("avatar", user.avatar);

    dispatch(register(form));
  };

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <Metadata title='Pertiwi | Sign Up' />

      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className='authPage'>
            {isDesktop && <Sideview />}

            <div className='authContainer'>
              <div className='authCTA'>
                <p>
                  Already have an account? <Link to='/login'>LOG IN</Link>
                </p>
              </div>

              <div className='authBox'>
                <h1>Welcome!</h1>
                <p>Create your account.</p>

                <form className='authForm' onSubmit={registerSubmitHandler}>
                  <div className='authFormInput'>
                    <label htmlFor='fname'>First Name</label>
                    <input
                      type='text'
                      name='fname'
                      placeholder='Enter your first name'
                      required
                      value={user.fname}
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div className='authFormInput'>
                    <label htmlFor='lname'>Last Name</label>
                    <input
                      type='text'
                      name='lname'
                      placeholder='Enter your last name'
                      required
                      value={user.lname}
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div className='authFormInput'>
                    <label htmlFor='bdate'>Birthdate</label>
                    <input
                      type='date'
                      name='birthdate'
                      required
                      value={user.birthdate}
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div className='authFormInput'>
                    <label htmlFor='email'>Email</label>
                    <input
                      type='text'
                      name='email'
                      placeholder='Enter your email'
                      required
                      value={user.email}
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div className='authFormInput'>
                    <label htmlFor='phone'>Phone Number</label>
                    <input
                      type='text'
                      name='phone'
                      required
                      value={user.phone}
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div className='registerPassword'>
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
                      <label htmlFor='confirmPassword'>Confirm Password</label>
                      <input
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirm your password'
                        required
                        value={user.confirmPassword}
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>

                  <div className='authFormInput'>
                    <Button
                      type='submit'
                      id='submitBtn'
                      disabled={loading ? true : false}
                    >
                      Sign Up
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
