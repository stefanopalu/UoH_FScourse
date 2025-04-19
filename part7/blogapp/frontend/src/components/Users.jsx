import React from 'react'
import { initialiseUsers } from '../reducers/usersReducer'
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

const Users = () => {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiseUsers());
  }, [dispatch]);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users