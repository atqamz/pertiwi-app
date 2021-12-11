import "./UserUpdate.css";
import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, adminGetUser, adminUpdateUser } from "../../../_actions/userAction";
import { ADMIN_UPDATE_USER_RESET } from "../../../_constants/userConstant";

import Loading from "../../layout/Loading/Loading";

const UserUpdate = ({ match, history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, user, isUpdated } = useSelector(
    (state) => state.adminUserState
  );

  const [role, setRole] = useState();
  const [userAddress, setUserAddress] = useState();

  useEffect(() => {
    if (!user || user._id !== match.params.userId) {
      dispatch(adminGetUser(match.params.userId));
    } else {
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated!");
      history.push("/admin/users");
      dispatch({ type: ADMIN_UPDATE_USER_RESET });
    }

    axios
      .get(`/api/admin/order/user/${match.params.userId}`)
      .then(
        (response) =>
          response.data.order && setUserAddress(response.data.order.shippingInfo)
      );
  }, [dispatch, error, alert, match.params.userId, user, isUpdated, history]);

  const handleUpdateRole = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.set("role", role);

    console.log(role);

    dispatch(adminUpdateUser(match.params.userId, form));
  };

  return (
    <Fragment>
      {loading || !user ? (
        <Loading />
      ) : (
        <Fragment>
          <div className='dashboardContainer'>
            <form className='userRoleForm' onSubmit={handleUpdateRole}>
              <h1>Update User</h1>

              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value='' disabled selected>
                    Choose Role
                  </option>
                  <option value='admin'>Admin</option>
                  <option value='user'>User</option>
                </select>

                <button type='submit' className='updateRoleBtn'>
                  Update Role
                </button>
              </div>
            </form>
            <div className='userInfoBox'>
              <div>
                <img src={user.avatar.url} alt='User Avatar' />
                <h2>{user.name && user.name}</h2>
                <hr />
                <div className='userInfoPanel'>
                  <img src='/assets/admin/user/userphone.png' alt='User Phone' />
                  <div>
                    <h3>Contact</h3>
                    <p>{user.phone && user.phone}</p>
                  </div>
                </div>
                <div className='userInfoPanel'>
                  <img src='/assets/admin/user/useremail.png' alt='User Email' />
                  <div>
                    <h3>Email</h3>
                    <p>{user.email && user.email}</p>
                  </div>
                </div>
                <div className='userInfoPanel'>
                  <img src='/assets/admin/user/userbirthdate.png' alt='User Birthdate' />
                  <div>
                    <h3>Birthdate</h3>
                    <p>{user.birthdate && user.birthdate.substr(0, 10)}</p>
                  </div>
                </div>
              </div>

              {userAddress && (
                <div>
                  <h2>Address</h2>
                  <hr />

                  <div className='twoContent'>
                    <div className='userInfoPanel'>
                      <h3>Country</h3>
                      <p>{userAddress.country}</p>
                    </div>
                    <div className='userInfoPanel'>
                      <h3>Province</h3>
                      <p>{userAddress.province}</p>
                    </div>
                  </div>

                  <div className='twoContent'>
                    <div className='userInfoPanel'>
                      <h3>City</h3>
                      <p>{userAddress.city}</p>
                    </div>
                    <div className='userInfoPanel'>
                      <h3>Post Code</h3>
                      <p>{userAddress.postCode}</p>
                    </div>
                  </div>

                  <div className='userInfoPanel'>
                    <h3>Address Line</h3>
                    <p>{userAddress.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserUpdate;
