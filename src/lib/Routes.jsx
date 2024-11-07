import { createBrowserRouter } from "react-router-dom";
import { FurnitureScroll } from "../pages/FurnitureScroll";
import { ErrorPage } from "../pages/ErrorPage";
import { Layout } from '../Layout'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <FurnitureScroll />
            },
            {
                path: '*',
                element: <ErrorPage />
            }
        ]
    }
])

export default router