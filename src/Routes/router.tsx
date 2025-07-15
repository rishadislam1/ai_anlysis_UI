import {createBrowserRouter} from "react-router-dom";
import App from "@/App.tsx";
import DialougePage from "@/Pages/DialougePage.tsx";
import DataSource from "@/Pages/DataSource.tsx";
import SettingMenu from "@/Shared/SettingMenu.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <DialougePage/>
            },
            {
                path: "/dashboards",
                element: <div>s</div>
            },
            {
                path: "/data_sources",
                element: <SettingMenu/>,
                children:[
                    {
                        path: '/data_sources',
                        element: <DataSource/>
                    }
                ]
            }
        ]
    },
]);