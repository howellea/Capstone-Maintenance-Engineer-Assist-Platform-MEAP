import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me;
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return (
      <div className="text-center p-4">
        <h4>You must be logged in to view your profile.</h4>
      </div>
    );
  }

  return (
    <main className="p-4">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      <div className="border rounded p-4 shadow bg-white">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>

        <p className="mt-2 text-sm text-gray-600 italic">
          You're logged in as a {user.role === 'engineer' ? 'Maintenance Engineer' : 'Technician'}.
        </p>

        <div className="mt-4 flex gap-4">
          <button
            className="btn btn-outline-primary"
            onClick={() => setShowEdit(!showEdit)}
          >
            {showEdit ? 'Cancel' : 'Edit Profile'}
          </button>

          <button
            className="btn btn-outline-danger"
            onClick={() => {
              Auth.logout();
              navigate('/login');
            }}
          >
            Logout
          </button>
        </div>

        {showEdit && (
          <div className="mt-4 border-t pt-4">
            <p className="text-gray-500 italic">Edit Profile feature coming soon.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Profile;
