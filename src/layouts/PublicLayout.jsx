import React from 'react';

// Public layout - for student to complete assessments
const PublicLayout = ({ children }) => {
  return (
    <div style={{
      flex: 1,
      backgroundSize: 'cover',
      backgroundImage: "url('https://www.shutterstock.com/image-photo/hands-holding-green-happy-smile-600nw-2060680337.jpg')",
      height: '100vh', // Set the height to 100vh
      overflowY: 'auto', // Add overflow-y:auto to enable scrolling if the content overflows
    }} className="px-4 pt-5">
      {children}
    </div>
  );
};

export default PublicLayout;
