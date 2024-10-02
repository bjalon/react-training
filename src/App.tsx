import {RouterProvider, createBrowserRouter} from 'react-router-dom'

import "./App.css";
import Home from "./view/Home.tsx";
import Admin from "./view/Admin.tsx";
import Edition from "./view/Edition.tsx";

export default function App() {

    const router = createBrowserRouter([
        {path: "/", element: <Home/>},
        {path: "/admin", element: <Admin/>},
        {path: "/edition/:id", element: <Edition/>},
        {path: "*", element: <Home/>},
    ])

    return <>
        <RouterProvider router={router}></RouterProvider>
    </>
}