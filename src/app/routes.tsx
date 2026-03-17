import { createBrowserRouter } from 'react-router';
import { Auth } from './pages/Auth';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { Admin } from './pages/Admin';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
  },
  {
    path: '/onboarding',
    element: <Onboarding />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
]);
