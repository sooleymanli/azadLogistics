import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import { ConfigProvider } from 'antd';
import Login from './pages/Login';
import Calculator from './pages/Calculator';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound'; // Import NotFound page
import { JSX } from 'react';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('accessToken');
  return token ? children : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  }, 
  {
    path: '/',
    element: <Calculator />,
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute>
        <AdminPanel />
      </PrivateRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const App = () => {
  return (
    <ConfigProvider>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
};

export default App;
