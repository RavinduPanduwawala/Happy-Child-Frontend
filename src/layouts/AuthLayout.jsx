import React from 'react';


// Non - Authenticated Layout
const AuthLayout = ({ children }) => {
  return <div className='h-screen flex w-full justify-center items-center'>{children}</div>;
};

export default AuthLayout;
