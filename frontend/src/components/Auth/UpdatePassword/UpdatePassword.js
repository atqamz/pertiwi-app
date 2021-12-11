import "./UpdatePassword.css";
import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateUserPassword } from "../../../_actions/userAction";
import { UPDATE_USER_PASSWORD_RESET } from "../../../_constants/userConstant";

import Loading from "../../layout/Loading/Loading";

const UpdatePassword = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, isUpdated } = useSelector((state) => state.userState);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Password Updated!");

      history.push("/me");

      dispatch({ type: UPDATE_USER_PASSWORD_RESET });
    }
  }, [dispatch, error, alert, history, isUpdated]);

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    const form = new FormData();

    form.set("oldPassword", oldPassword);
    form.set("newPassword", newPassword);
    form.set("confirmNewPassword", confirmNewPassword);

    dispatch(updateUserPassword(form));
  };
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className='updatePasswordPage'>
            <form className='updatePasswordForm' onSubmit={handleUpdatePassword}>
              <div className='authFormInput'>
                <label htmlFor='oldPassword'>Old Password</label>
                <input
                  type='password'
                  name='oldPassword'
                  placeholder='Enter your old password'
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>

              <div className='authFormInput'>
                <label htmlFor='newPassword'>New Password</label>
                <input
                  type='password'
                  name='newPassword'
                  placeholder='Enter your new password'
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className='authFormInput'>
                <label htmlFor='confirmNewPassword'>Confirm New Password</label>
                <input
                  type='password'
                  name='confirmNewPassword'
                  placeholder='Enter your confirm new password'
                  required
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>

              <div className='authFormInput'>
                <Button type='submit' id='submitBtn' disabled={loading ? true : false}>
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
