import React, { Fragment, useEffect } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useAlert } from "react-alert";
import { DataGrid } from "@mui/x-data-grid";

import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  adminGetAllUsers,
  adminDeleteUser,
} from "../../../_actions/userAction";
import { ADMIN_DELETE_USER_RESET } from "../../../_constants/userConstant";

import Loading from "../../layout/Loading/Loading";

const UserList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.adminUsersState);
  const { error: adminError, isDeleted } = useSelector((state) => state.adminUserState);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (adminError) {
      alert.error(adminError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("User Deleted!");
      dispatch({ type: ADMIN_DELETE_USER_RESET });
    }

    dispatch(adminGetAllUsers());
  }, [dispatch, error, adminError, alert, isDeleted, history]);

  const handleUserUpdate = (userId) => {
    history.push(`/admin/user/${userId}`);
  };

  const handleUserDelete = (userId) => {
    dispatch(adminDeleteUser(userId));
  };

  const columns = [
    {
      field: "id",
      headerName: "User ID",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.6,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.3,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "Number",
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <IconButton
              onClick={() => handleUserUpdate(params.getValue(params.id, "id"))}
            >
              <Edit />
            </IconButton>

            <IconButton
              onClick={() => handleUserDelete(params.getValue(params.id, "id"))}
            >
              <Delete />
            </IconButton>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((user) => {
      rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      });
    });

  return (
    <Fragment>
      {loading || !users ? (
        <Loading />
      ) : (
        <Fragment>
          <div className='dashboardContainer'>
            <h1>Users</h1>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className='productListTable'
              autoHeight
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserList;
