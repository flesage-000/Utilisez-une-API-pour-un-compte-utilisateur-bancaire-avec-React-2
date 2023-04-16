import React from 'react';

import { Link } from "react-router-dom";

import "./WebsiteMenu.css"

function WebsiteMenu(data) {
  const link = data.data;

  return (
    <div className="link">
      <Link to={link.to}>{link.text}</Link>
    </div>
  );
}

export default WebsiteMenu;