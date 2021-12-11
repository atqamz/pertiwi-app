import "./MyProfile.css";
import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getUser, updateUser } from "../../_actions/userAction";
import { UPDATE_USER_RESET } from "../../_constants/userConstant";

import Loading from "../layout/Loading/Loading";

const MyProfile = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, user, isUpdated } = useSelector((state) => state.userState);

  let fullname = user && user.name.split(" ");

  const [userProfile, setUserProfile] = useState(
    user && {
      fname: fullname[0],
      lname: fullname[1],
      birthdate: String(user.birthdate).substr(0, 10),
      email: user.email,
      phone: user.phone,
    }
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated!");
      dispatch(getUser());

      history.go(0);

      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, alert, history, isUpdated]);

  const onChangeHandler = (e) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  const handleProfileUpdateSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();

    form.set("name", `${userProfile.fname} ${userProfile.lname}`);
    form.set("birthdate", userProfile.birthdate);
    form.set("email", userProfile.email);
    form.set("phone", userProfile.phone);

    dispatch(updateUser(form));
  };

  return (
    <Fragment>
      {loading || !user ? (
        <Loading />
      ) : (
        <Fragment>
          <div className='profilePage'>
            <form className='profileForm' onSubmit={handleProfileUpdateSubmit}>
              <h1>My Profile</h1>
              <p>Hi {user.name}!</p>

              <div className='profileDetail'>
                <div>
                  <img src='/blankuser.jpg' alt='User Profile' />
                  <h1>{`${userProfile.fname} ${userProfile.lname}`}</h1>
                </div>

                <div>
                  <h2>Details</h2>
                  <div>
                    <div className='authFormInput'>
                      <label htmlFor='fname'>First Name</label>
                      <input
                        type='text'
                        name='fname'
                        required
                        value={userProfile.fname}
                        onChange={onChangeHandler}
                      />
                    </div>

                    <div className='authFormInput'>
                      <label htmlFor='lname'>Last Name</label>
                      <input
                        type='text'
                        name='lname'
                        required
                        value={userProfile.lname}
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>

                  <div>
                    <div className='authFormInput'>
                      <label htmlFor='birthdate'>Birthdate</label>
                      <input
                        type='date'
                        name='birthdate'
                        required
                        value={userProfile.birthdate}
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2>Contacts</h2>
                  <div className='authFormInput'>
                    <label htmlFor='email'>Email</label>
                    <input
                      type='email'
                      name='email'
                      required
                      value={userProfile.email}
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div className='authFormInput'>
                    <label htmlFor='phone'>Phone</label>
                    <input
                      type='text'
                      name='phone'
                      required
                      value={userProfile.phone}
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>
              </div>

              <div className='profileBtnContainer'>
                <Link to='/password/update' className='profileBtn'>
                  Change Password
                </Link>
                <button type='submit' className='profileBtn'>
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyProfile;
