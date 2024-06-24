import React from 'react'

const Home = () => {

  // Get User type from Local storage
  const handleDashboardUserType = () => {
    const storedUser = JSON.parse(localStorage.getItem('USER'));
    const currentUserRole = storedUser ? storedUser.type : null;
    return currentUserRole
  }

  return (
    <div>
      <div className='text-center'>
        <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-5xl'>
          Welcome to Happy Child {handleDashboardUserType()}'s Dashboard
        </h1>
        <h2 className='mt-4'>This is platform to manage children wellbeing</h2>
      </div>
    </div>
  )
}

export default Home
