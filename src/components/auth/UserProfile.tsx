"use client";
import React, { useState, useEffect } from 'react';
const BASE_URL = 'https://api.oraglan.com';

interface UserData {
  name: string;
  email: string;
  role: string;
  avatar?: string;
  phone?: string;
  last_login?: string;
}

export default function UserProfile() {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    role: '',
    avatar: '/avatar-placeholder.png'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);
  
  const fetchUserData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      const response = await fetch(`${BASE_URL}/api/admin/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const data = await response.json();
      const profile = data.data || data;
      
      setUserData({
        name: profile.name || profile.full_name || '',
        email: profile.email || '',
        role: profile.role || 'Administrator',
        avatar: profile.avatar || '/avatar-placeholder.png',
        phone: profile.phone || profile.phone_number || '',
        last_login: profile.last_login || new Date().toISOString()
      });
      
      setFormData({
        name: profile.name || profile.full_name || '',
        email: profile.email || '',
        role: profile.role || 'Administrator',
        avatar: profile.avatar || '/avatar-placeholder.png',
        phone: profile.phone || profile.phone_number || '',
        last_login: profile.last_login || new Date().toISOString()
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching user data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setError(null);

    try {
      const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      const response = await fetch(`${BASE_URL}/api/admin/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      setUserData(formData);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while updating profile');
      console.error('Error updating profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {isLoading && !isEditing ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>

          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img
                  src={userData.avatar || '/avatar-placeholder.png'}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
                  Change Avatar
                </button>
              )}
            </div>

            <div className="md:w-2/3">
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                        disabled
                      />
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData(userData);
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                        disabled={isLoading}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                    <p className="text-lg text-gray-800">{userData.name}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="text-lg text-gray-800">{userData.email}</p>
                  </div>

                  {userData.phone && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                      <p className="text-lg text-gray-800">{userData.phone}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Role</h3>
                    <p className="text-lg text-gray-800">{userData.role}</p>
                  </div>

                  {userData.last_login && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Last Login</h3>
                      <p className="text-lg text-gray-800">
                        {new Date(userData.last_login).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}