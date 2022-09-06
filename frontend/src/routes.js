import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SingUpPage from "./pages/SingUpPage";
import UserPage from "./pages/UserPage";


export const routes = [
    {
        path: '/signup',
        exact: true,
        element: SingUpPage,
        auth: false
    },
    {
        path: '/',
        exact: true,
        element: HomePage,
        auth: false
    },
    {
        path: '/user/:username',
        exact: true,
        element: UserPage,
        auth: true
    },
    {
        path: '/login',
        exact: true,
        element: LoginPage,
        auth: false
    }
]