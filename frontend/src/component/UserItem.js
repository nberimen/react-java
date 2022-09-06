import React from "react";
import { Link } from "react-router-dom";
import defaultPicture from "../assets/profile.png"
const UserItem = (props) => {
  const { user } = props;
  const { username, image } = user;
  let imageSource = defaultPicture;

  if(user.image){
    imageSource = image
  }
  return (
    <Link to={`/users/${username}`} className="list-group-item list-group-item-action">
      <img 
      className="rounded-circle"
      width="32"
      height="32"
      alt={`${username} profile`} src={imageSource} />
      <span className="ps-2">{username}</span>
    </Link>
  );
};

export default UserItem;
