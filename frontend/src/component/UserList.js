import React, { useEffect, useState } from "react";
import { getUsers } from "../api/apiCalls";
import UserItem from "./UserItem";

export const UserList = () => {
  const [page, setPage] = useState({
    content: [],
    size: 3,
    number: 0,
  });

  useEffect(() => {
    loadUser(page.number);
  }, []);

  const loadUser = async (page) => {
    try {
      const response = await getUsers(page);
      setPage(response.data);
    } catch (error) {}
  };

  const onClickNext = () => {
      const nextPage = page.number + 1;
      loadUser(nextPage);
  }
  const {content: users, last, first} = page;
  return (
    <div className="card">
      <h3 className="card-header text-center">Users</h3>
      <div className="list-group list-group-flush">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
      <div>
        {last ===false && <button className="btn btn-sm btn-ligth" onClick={onClickNext}>Next</button>}
      </div>
    </div>
  );
};
