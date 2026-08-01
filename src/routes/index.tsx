import { createHashRouter } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import GuidePage from '../pages/Guide'
import GroupsPage from '../pages/Groups'
import HomePage from '../pages/Home'
import MyTownPage from '../pages/MyTown'
import BoothsPage from '../pages/Booths'
import ChatPage from '../pages/Chat'
import ProfilePage from '../pages/Profile'
import ErrorPage from '../pages/ErrorPage/index'

export const router = createHashRouter([
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