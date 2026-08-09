import { createHashRouter } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import GuidePage from '../pages/Guide'
import GroupsPage from '../pages/Groups'
import HomePage from '../pages/Home'
import LoginPage from '../pages/Login'
import MyTownPage from '../pages/MyTown'
import BoothDetailPage from '../pages/BoothDetail'
import BoothsPage from '../pages/Booths'
import ChatPage from '../pages/Chat'
import ProfilePage from '../pages/Profile'
import RegisterPage from '../pages/Register'
import ErrorPage from '../pages/ErrorPage/index'

export const router = createHashRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'booths',
        element: <BoothsPage />,
      },
      {
        path: 'booths/:slug',
        element: <BoothDetailPage />,
      },
      {
        path: 'groups',
        element: <GroupsPage />,
      },
      {
        path: 'chat',
        element: <ChatPage />,
      },
      {
        path: 'my-town',
        element: <MyTownPage />,
      },
      {
        path: 'guide',
        element: <GuidePage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
])