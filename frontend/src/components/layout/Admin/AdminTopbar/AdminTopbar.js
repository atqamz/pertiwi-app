import "./AdminTopbar.css";
import React from "react";

import UserOption from "../../UserOption/UserOption";

const AdminTopbar = ({ user, isAuth }) => {
  return (
    <div className='topbar'>
      <div className='topbarContainer'>
        <UserOption user={user} isAuth={isAuth} />
      </div>
    </div>
  );
};

export default AdminTopbar;
