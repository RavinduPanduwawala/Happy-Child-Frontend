import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles, redirect }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = () => {
      const token = localStorage.getItem('TOKEN');
      const storedUser = JSON.parse(localStorage.getItem('USER'));
      const currentUserRole = storedUser ? storedUser.type : null;

      if (!token || !currentUserRole) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      const isAllowed = allowedRoles.includes(currentUserRole);
      setIsAuthenticated(isAllowed);
      setIsLoading(false);
    };

    verifyToken();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated or user isn't allowed based on their role
    return <Navigate to="/login" />;
  }

  // Return the element directly
  return children;
};

export default ProtectedRoute;
