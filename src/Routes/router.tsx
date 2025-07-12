import {createBrowserRouter} from "react-router-dom";
import App from "@/App.tsx";
import DialougePage from "@/Pages/DialougePage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <DialougePage/>
            }
        ]
    },
]);