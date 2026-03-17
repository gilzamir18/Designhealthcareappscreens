import { createBrowserRouter, Navigate } from 'react-router';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';
import { HealthIntake } from './components/HealthIntake';
import { Dashboard } from './components/Dashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/triagem',
    element: <HealthIntake />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
