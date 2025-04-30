"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  is_active: boolean;
  access: string;
  created_at: string;
  updated_at: string;
}

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://0.0.0.0:8000/api/uiusers/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Include the JWT token
          },
        });
        setUsers(response.data); // Set the fetched users in state
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>UI Users</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {users.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Access</th>
              <th>Active</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.access}</td>
                <td>{user.is_active ? "Yes" : "No"}</td>
                <td>{new Date(user.created_at).toLocaleString()}</td>
                <td>{new Date(user.updated_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserPage;
