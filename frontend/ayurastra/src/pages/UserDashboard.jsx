// src/pages/UserDashboard.jsx
import React from 'react';
import Header from '../components/Header.jsx'; // Add .jsx
import BookmarkList from '../components/BookmarkList.jsx'; // Add .jsx
import Footer from '../components/Footer.jsx'; // Add .jsx

const UserDashboard = () => {
  return (
    <>
      <Header />
      <BookmarkList />
      <Footer />
    </>
  );
};

export default UserDashboard;