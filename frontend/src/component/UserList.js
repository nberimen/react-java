import React, { useEffect, useState } from "react";
import { getUsers } from "../api/apiCalls";
import { useApiProgress } from "../shared/ApiProgress";
import UserItem from "./UserItem";

export const UserList = () => {
  const [page, setPage] = useState({
    content: [],
    size: 3,
    number: 0,
  });

  const [loadFailure, setLoadFailure] = useState(false);
  const pendingApiCall = useApiProgress("/api/1.0/users?page");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async (page) => {
    setLoadFailure(false);
    try {
      const response = await getUsers(page);
      setPage(response.data);
    } catch (error) {
      setLoadFailure(true);
    }
  };

  const onClickNext = () => {
    const nextPage = page.number + 1;
    loadUser(nextPage);
  };

  const onClickPrevious = () => {
    const previousPage = page.number - 1;
    loadUser(previousPage);
  };
  const { content: users, last, first } = page;

  let divAction = (
    <div>
      {first === false && (
        <button className="btn btn-sm btn-ligth" onClick={onClickPrevious}>
          Previous
        </button>
      )}
      {last === false && (
        <button
          className="btn btn-sm btn-ligth float-end"
          onClick={onClickNext}
        >
          Next
        </button>
      )}
    </div>
  );

  if (pendingApiCall) {
    divAction = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-black-50">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="card">
      <h3 className="card-header text-center">Users</h3>
      <div className="list-group list-group-flush">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
      {divAction}
      {loadFailure && <div className="text-center text-danger">Load Failure</div>}
    </div>
  );
};
