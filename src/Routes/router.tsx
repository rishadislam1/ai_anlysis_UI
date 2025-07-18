import {createBrowserRouter} from "react-router-dom";
import App from "@/App.tsx";
import DialougePage from "@/Pages/DialougePage.tsx";
import DataSource from "@/Pages/DataSources/DataSource.tsx";
import SettingMenu from "@/Shared/SettingMenu.tsx";
// import Users from "@/Pages/Users/Users.tsx";
import UserDetails from "@/Pages/Users/UserDetails.tsx";
import DisableUsers from "@/Pages/Users/DisableUsers.tsx";
import PendingInvitation from "@/Pages/Users/PendingInvitation.tsx";
import Groups from "@/Pages/Groups/Groups.tsx";
import GroupDetails from "@/Pages/Groups/GroupDetails.tsx";
import Alert from "@/Pages/Alert/Alert.tsx";
import AlertDetails from "@/Pages/Alert/AlertDetails.tsx";
import ReportSnippet from "@/Pages/Reports/ReportSnippet.tsx";
import Organization from "@/Pages/Organization/Organization.tsx";
import AccountSetting from "@/Pages/Account/AccountSetting.tsx";
import DashboardDetailsPage from "@/Pages/Dashboard/DashboardDetailsPage.tsx";
import DashboardListPage from "@/Pages/Dashboard/DashboardListPage.tsx";
import DashboardsPrettify from "@/Pages/Dashboard/DashboardsPrettify.tsx";

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
                element: <DashboardListPage />,
            },
            {
                path: "/dashboards/:name",
                element: <DashboardDetailsPage />
            },
            {
                path: "/dashboards_prettify",
                element: <DashboardsPrettify />
            },
            {
                path: "/data_sources",
                element: <SettingMenu/>,
                children:[
                    {
                        path: '/data_sources',
                        element: <DataSource/>
                    },
                    {
                        path: '/data_sources/users',
                        // element: <Users/>
                    },
                    {
                        path: '/data_sources/users/:id',
                        element: <UserDetails/>
                    },
                    {
                        path: '/data_sources/pendingInvitaions',
                        element: <PendingInvitation/>
                    },
                    {
                        path: '/data_sources/disableUser',
                        element: <DisableUsers/>
                    },
                    {
                        path: '/data_sources/groups',
                        element: <Groups/>
                    },
                    {
                        path: '/data_sources/groups/:id',
                        element: <GroupDetails/>
                    },
                    {
                        path: '/data_sources/groups/:id/data_sources',
                        element: <Groups/>
                    },
                    {
                        path: '/data_sources/destinations',
                        element: <Alert/>
                    },
                    {
                        path: '/data_sources/destinations/:id',
                        element: <AlertDetails/>
                    },
                    {
                        path: '/data_sources/query_snippets',
                        element: <ReportSnippet/>
                    },
                    {
                        path: '/data_sources/settings/general',
                        element: <Organization/>
                    },
                    {
                        path: '/data_sources/users/me',
                        element: <AccountSetting/>
                    },
                    {
                        path: '/data_sources/upload/excel',
                        element: <DataSource/>
                    },
                       {
                        path: '/data_sources/settings/OpenKey',
                        element: <DataSource/>
                    },

                ]
            }
        ]
    },
]);