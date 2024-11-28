import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// Mock data for workouts
const initialWorkouts = [
  { id: 1, date: '2024-11-01', type: 'Running', duration: 30 },
  { id: 2, date: '2024-11-03', type: 'Weightlifting', duration: 45 },
  { id: 3, date: '2024-11-05', type: 'Yoga', duration: 60 },
];

function Profile() {
  const [user, setUser] = useState({
    name: 'Anthony Yao',
    email: '',
    bio: 'BBL Drizzy #1 Meat Rider',
    avatarUrl: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [searchDate, setSearchDate] = useState('');
  const [editingWorkout, setEditingWorkout] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${cookies.get('token')}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/update-profile`,
        user,
        {
          headers: { Authorization: `Bearer ${cookies.get('token')}` },
          withCredentials: true,
        }
      );
      console.log('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  const handleLogout = () => {
    cookies.remove('token', { path: '/' });
    navigate('/login');
  };

  const handleSearch = () => {
    if (searchDate) {
      const filteredWorkouts = initialWorkouts.filter(workout => workout.date === searchDate);
      setWorkouts(filteredWorkouts);
    } else {
      setWorkouts(initialWorkouts);
    }
  };

  const handleEdit = (workout) => {
    setEditingWorkout(workout);
  };

  const handleSave = () => {
    setWorkouts(workouts.map(w => w.id === editingWorkout.id ? editingWorkout : w));
    setEditingWorkout(null);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img
          src={user.avatarUrl || 'https://via.placeholder.com/100'}
          alt={user.name}
          style={{ width: '100px', height: '100px', borderRadius: '50%' }}
        />
        <h1>{isEditing ? 'Edit Profile' : 'Your Profile'}</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={user.bio}
            onChange={handleInputChange}
            disabled={!isEditing}
            style={{ width: '100%', padding: '5px', height: '100px' }}
          />
        </div>
        {isEditing ? (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
              Save Changes
            </button>
            <button type="button" onClick={() => setIsEditing(false)} style={{ padding: '10px', backgroundColor: '#f44336', color: 'white', border: 'none' }}>
              Cancel
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setIsEditing(true)} style={{ width: '100%', padding: '10px', backgroundColor: '#008CBA', color: 'white', border: 'none' }}>
            Edit Profile
          </button>
        )}
      </form>

      <div style={{ marginTop: '30px' }}>
        <h2>Workouts</h2>
        <div style={{ marginBottom: '15px', display: 'flex' }}>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <button onClick={handleSearch} style={{ padding: '5px 10px', backgroundColor: '#008CBA', color: 'white', border: 'none' }}>
            Search
          </button>
        </div>

        {workouts.map(workout => (
          <div key={workout.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
            {editingWorkout && editingWorkout.id === workout.id ? (
              <>
                <input
                  type="date"
                  value={editingWorkout.date}
                  onChange={(e) => setEditingWorkout({...editingWorkout, date: e.target.value})}
                  style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                  value={editingWorkout.type}
                  onChange={(e) => setEditingWorkout({...editingWorkout, type: e.target.value})}
                  style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                  type="number"
                  value={editingWorkout.duration}
                  onChange={(e) => setEditingWorkout({...editingWorkout, duration: parseInt(e.target.value)})}
                  style={{ marginRight: '10px', padding: '5px', width: '50px' }}
                />
                <button onClick={handleSave} style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span style={{ marginRight: '10px' }}>{workout.date}</span>
                <span style={{ marginRight: '10px' }}>{workout.type}</span>
                <span style={{ marginRight: '10px' }}>{workout.duration} minutes</span>
                <button onClick={() => handleEdit(workout)} style={{ padding: '5px 10px', backgroundColor: '#008CBA', color: 'white', border: 'none' }}>
                  Edit
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <button onClick={handleLogout} style={{ width: '100%', padding: '10px', backgroundColor: '#f44336', color: 'white', border: 'none', marginTop: '20px' }}>
        Log Out
      </button>
    </div>
  );
}

export default Profile;