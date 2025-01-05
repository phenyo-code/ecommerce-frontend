import React, { useState } from 'react';
import './HeroSectionEditor.css';

const HeroSectionEditor = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackgroundImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !subtitle || !backgroundImage) {
      alert('Please fill out all fields.');
      return;
    }

    const heroData = {
      title,
      subtitle,
      backgroundImage,
    };

    onSave(heroData); // Call the onSave callback with the updated data
    alert('Hero section updated successfully!');
  };

  return (
    <div className="hero-section-editor">
      <h2>Edit Hero Section</h2>
      <form className="hero-section-form" onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter hero title"
          />
        </label>
        <label>
          Subtitle:
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Enter hero subtitle"
          />
        </label>
        <label>
          Background Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        {previewImage && (
          <div className="image-preview">
            <p>Image Preview:</p>
            <img src={previewImage} alt="Preview" />
          </div>
        )}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default HeroSectionEditor;
