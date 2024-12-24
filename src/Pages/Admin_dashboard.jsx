import React, { useState, useEffect } from 'react';
import { supabase } from '../Components/CreateUser';

const AdminDashboard = ({ handleLogout }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const { data, error } = await supabase
      .from('user_profiles_all')
      .select(`*`); // Truy vấn trực tiếp từ view

      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(data);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <button
        onClick={handleLogout}
        className="mb-5 py-2 px-4 bg-red-500 text-white border-none rounded cursor-pointer"
      >
        Logout
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Confirmed_at</th>
            <th className="py-2 px-4 border-b">Last_sign_in_at</th>
            <th className="py-2 px-4 border-b">Action</th>

          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{user.Full_name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">{user.email_confirmed_at}</td>
              <td className="py-2 px-4 border-b">{user.last_sign_in_at}</td>
              <td className="py-2 px-4 border-b"></td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default AdminDashboard;
