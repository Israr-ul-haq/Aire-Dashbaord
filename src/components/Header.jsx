import React from "react";

function Header() {
  return (
    <div>
      <div className="header_profile">
        {/* <img src="/assets/images/Notification (2).svg" alt="" /> */}
        <img
          src={"/assets/images/Profile_photo.png"}
          alt=""
          className="admin_profile"
        />
      </div>
    </div>
  );
}

export default Header;
