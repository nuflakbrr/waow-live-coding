import { createBrowserRouter } from 'react-router';
import { Home, Login } from '../pages';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export { router };