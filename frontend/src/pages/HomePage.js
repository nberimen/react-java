import React from "react";
import { useSelector } from "react-redux";
import Posts from "../component/Posts";
import PostSubmit from "../component/PostSubmit";
import { UserList } from "../component/UserList";

const HomePage = () => {
  const { isLoggedIn } = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
  }));
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {isLoggedIn && (
            <div className="mb-1">
              <PostSubmit />
            </div>
          )}
          <Posts />
        </div>

        <div className="col">
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
