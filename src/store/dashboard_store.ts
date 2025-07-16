import {create} from 'zustand';

interface DashboardDataType {
    key: string;
    name: string;
    createdBy?: string;
    createdAt: string;
    favourite: boolean;
}
interface DashboardStoreType {
    dashboardDataList: DashboardDataType[];
    setDashboardDataList: (dashboardDataList: DashboardDataType[] | ((prev: DashboardDataType[]) => DashboardDataType[])) => void;
    dashboardData: DashboardDataType | null;
    setDashboardData: (dashboardData: DashboardDataType | null | ((prev: DashboardDataType | null) => DashboardDataType | null)) => void;
    handleToggleFavourite: (dashboard: DashboardDataType | null) => void;
}

const initialDashboardData: Pick<DashboardStoreType, 'dashboardDataList' | 'dashboardData'> = {
    dashboardDataList: [
        {
            key: '1',
            name: 'Test',
            createdBy: 'Munna',
            createdAt: '15/07/25 23:42',
            favourite: false,
        },
        {
            key: '2',
            name: 'Test 2',
            createdBy: 'Rahim',
            createdAt: '15/07/25 23:45',
            favourite: true,
        },
    ],
    dashboardData: null,
};

export const dashboardStore = create<DashboardStoreType>((set) => ({
    ...initialDashboardData,
    setDashboardDataList: (dashboardDataList) =>
        set((state) => ({dashboardDataList: typeof dashboardDataList === 'function' ? dashboardDataList(state.dashboardDataList) : dashboardDataList,})),
    setDashboardData: (dashboardData) =>
        set((state) => ({dashboardData: typeof dashboardData === 'function' ? dashboardData(state.dashboardData) : dashboardData,})),
    handleToggleFavourite: (dashboardData: DashboardDataType | null) =>
        set((state) => ({
            dashboardDataList: state.dashboardDataList.map((item) => item.key === dashboardData?.key ? {...item, favourite: !item.favourite} : item),
            dashboardData: state.dashboardData && state.dashboardData.key === dashboardData?.key
                ? {...state.dashboardData, favourite: !state.dashboardData.favourite}
                : state.dashboardData,
        })),
}));