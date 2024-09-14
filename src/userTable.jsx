import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import './userTable.css'

// Forward ref to allow parent components to call fetchUsers
const UserTable = forwardRef((props, ref) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data); // Set the fetched user data in the state
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchUsers, // Expose fetchUsers to be called from the parent component
  }));

  useEffect(() => {
    // Fetch users immediately on component mount
    fetchUsers();

    // Set up polling to fetch users every 5 seconds
    const intervalId = setInterval(fetchUsers, 5000); // 5000ms = 5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td> {/* For testing purposes only */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
});

export default UserTable;
