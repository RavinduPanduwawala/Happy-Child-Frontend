import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout';
import PublicLayout from './layouts/PublicLayout';
import Login from './pages/Authentication/Login';
import NonAuthLayout from './layouts/NonAuthLayout';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Creators from './pages/Creators';
import Assessments from './pages/Assessments';
import Goals from './pages/Goals';
import Profile from './pages/Profile';
import Reports from './pages/Reports';
import AssessmentView from './pages/Student/AssessmentView';
import PageNotFound from './pages/PageNotFond';
import ProtectedRoute from './middleware/ProtecedRoutes';
import Home from './pages/Home/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<AuthLayout><Login /></AuthLayout>} />
        {/* Use ProtectedRoute for the protected routes */}
        <Route
          path='/'
          element={
            <NonAuthLayout>
              <ProtectedRoute allowedRoles={['ADMIN','TEACHER', 'CREATOR', 'STUDENT']}>
                <Home />
              </ProtectedRoute>
            </NonAuthLayout>
          }
        />
        <Route
          path='/students'
          element={
            <NonAuthLayout>
              <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']}>
                <Students />
              </ProtectedRoute>
            </NonAuthLayout>
          }
        />
        <Route
          path='/teachers'
          element={
            <NonAuthLayout>
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <Teachers />
              </ProtectedRoute>
            </NonAuthLayout>
          }
        />
        <Route
          path='/creators'
          element={
            <NonAuthLayout>
              <ProtectedRoute allowedRoles={['ADMIN', 'CREATOR']}>
                <Creators />
              </ProtectedRoute>
            </NonAuthLayout>
          }
        />
        <Route
          path='/assessments'
          element={
            <NonAuthLayout>
              <ProtectedRoute allowedRoles={['ADMIN', 'CREATOR']}>
                <Assessments />
              </ProtectedRoute>
            </NonAuthLayout>
          }
        />
        <Route
          path='/goals'
          element={
            <NonAuthLayout>
              <ProtectedRoute allowedRoles={['ADMIN', 'CREATOR']}>
                <Goals />
              </ProtectedRoute>
            </NonAuthLayout>
          }
        />
        <Route
          path='/my-profile'
          element={
            <NonAuthLayout>
              <ProtectedRoute allowedRoles={['CREATOR', 'TEACHER', 'STUDENT']}>
                <Profile />
              </ProtectedRoute>
            </NonAuthLayout>
          }
        />
        <Route
          path='/reports'
          element={
            <NonAuthLayout>
              <ProtectedRoute allowedRoles={['TEACHER', 'STUDENT']}>
                <Reports />
              </ProtectedRoute>
            </NonAuthLayout>
          }
        />
        <Route path='/assessment/:assessmentId' element={<PublicLayout><AssessmentView /></PublicLayout>} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
