import React, { useState } from 'react';
import SearchHeader from '../components/SearchHeader';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false); // Track editing state for profile details

  // Sample profile and account details (you can replace with real data from a user database or API)
  const userProfile = {
    name: "John Doe",
    email: "johndoe@example.com",
    profilePicture: "path/to/profile-pic.jpg",
    address: "1234 Main St, City, Country",
  };

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Handle password change logic here
  };

  return (
    <div className="profile-container">
      <SearchHeader />
      {/* Profile Section */}
      <section className="profile-section">
        <h2>Profile Information</h2>
        <div className="profile-info">
          <img src={userProfile.profilePicture} alt="Profile" className="profile-pic" />
          {isEditing ? (
            <div>
              <input type="text" defaultValue={userProfile.name} />
              <input type="email" defaultValue={userProfile.email} />
              <textarea defaultValue={userProfile.address}></textarea>
              <button onClick={() => setIsEditing(false)}>Save</button>
            </div>
          ) : (
            <div>
              <p><strong>Name:</strong> {userProfile.name}</p>
              <p><strong>Email:</strong> {userProfile.email}</p>
              <p><strong>Address:</strong> {userProfile.address}</p>
              <button onClick={() => setIsEditing(true)}>Edit</button>
            </div>
          )}
        </div>
      </section>

      {/* Account Section */}
      <section className="account-section">
        <h2>Account Settings</h2>
        <div className="account-settings">
          <div className="password-change">
            <h3>Change Password</h3>
            <form onSubmit={handlePasswordChange}>
              <div>
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
              <button type="submit">Change Password</button>
            </form>
          </div>

          {/* Payment Methods */}
          <div className="payment-methods">
            <h3>Payment Methods</h3>
            <p>Manage your saved payment methods.</p>
            <button>Add Payment Method</button>
          </div>

          {/* Order History */}
          <div className="order-history">
            <h3>Order History</h3>
            <p>View your past orders and track their status.</p>
            <button>View Orders</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;

