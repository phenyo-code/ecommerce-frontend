import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
    darkMode: false,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreferencesChange = (e) => {
    const { name, checked } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic (e.g., saving to localStorage or making an API request)
    console.log('Profile:', profile);
    console.log('Preferences:', preferences);
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>

      <form onSubmit={handleSubmit}>
        {/* Profile Settings */}
        <div className="section">
          <h2>Profile</h2>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleProfileChange}
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleProfileChange}
            />
          </label>
        </div>

        {/* Preferences Settings */}
        <div className="section">
          <h2>Preferences</h2>
          <label>
            <input
              type="checkbox"
              name="notifications"
              checked={preferences.notifications}
              onChange={handlePreferencesChange}
            />
            Enable Notifications
          </label>

          <label>
            <input
              type="checkbox"
              name="darkMode"
              checked={preferences.darkMode}
              onChange={handlePreferencesChange}
            />
            Dark Mode
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default Settings;
