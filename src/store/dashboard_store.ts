import { create } from 'zustand';

interface Widget {
    id: number;
    width: number;
    options: {
        isHidden: boolean;
        position: {
            autoHeight: boolean;
            sizeX: number;
            sizeY: number;
            minSizeX: number;
            maxSizeX: number;
            minSizeY: number;
            maxSizeY: number;
            col: number;
            row: number;
        };
        parameterMappings: Record<string, unknown>;
    };
    dashboard_id: number;
    text: string;
    updated_at: string;
    created_at: string;
}

interface DashboardDataType {
    id: number;
    slug: string;
    name: string;
    user_id: number;
    user: {
        id: number;
        name: string;
        email: string;
        profile_image_url: string;
    };
    layout: unknown[];
    dashboard_filters_enabled: boolean;
    widgets: Widget[];
    options: Record<string, unknown>;
    is_archived: boolean;
    is_draft: boolean;
    tags: string[];
    updated_at: string;
    created_at: string;
    version: number;
    is_favorite: boolean;
    can_edit: boolean;
}

interface DashboardStoreType {
    dashboardDataList: DashboardDataType[];
    setDashboardDataList: (dashboardDataList: DashboardDataType[] | ((prev: DashboardDataType[]) => DashboardDataType[])) => void;
    dashboardData: DashboardDataType | null;
    setDashboardData: (dashboardData: DashboardDataType | null | ((prev: DashboardDataType | null) => DashboardDataType | null)) => void;
    handleToggleFavourite: (dashboard: DashboardDataType | null) => void;
    textWidget: string[];
    setTextWidget: (textWidget: string[] | ((prev: string[]) => string[])) => void;
}

const initialDashboardData: Pick<DashboardStoreType, 'dashboardDataList' | 'dashboardData' | 'textWidget'> = {
    dashboardDataList: [
        {
            id: 1,
            slug: 'test',
            name: 'test',
            user_id: 1,
            user: {
                id: 1,
                name: 'Munna',
                email: 'mahadimunna22@gmail.com',
                profile_image_url: '/static/images/gravatar.png',
            },
            layout: [],
            dashboard_filters_enabled: true,
            widgets: [],
            options: {},
            is_archived: false,
            is_draft: true,
            tags: [],
            updated_at: '2025-07-18T10:13:21.620Z',
            created_at: '2025-07-15T17:42:44.401Z',
            version: 24,
            is_favorite: false,
            can_edit: true,
        },
        {
            id: 2,
            slug: 'test-2',
            name: 'Test 2',
            user_id: 2,
            user: {
                id: 2,
                name: 'Rahim',
                email: 'rahim@example.com',
                profile_image_url: '/static/images/gravatar.png',
            },
            layout: [],
            dashboard_filters_enabled: true,
            widgets: [],
            options: {},
            is_archived: false,
            is_draft: false,
            tags: [],
            updated_at: '2025-07-15T23:45:00.000Z',
            created_at: '2025-07-15T23:45:00.000Z',
            version: 1,
            is_favorite: true,
            can_edit: true,
        },
    ],
    dashboardData: null,
    textWidget: [],
};

export const dashboardStore = create<DashboardStoreType>((set) => ({
    ...initialDashboardData,
    setDashboardDataList: (dashboardDataList) =>
        set((state) => ({
            dashboardDataList: typeof dashboardDataList === 'function' ? dashboardDataList(state.dashboardDataList) : dashboardDataList,
        })),
    setDashboardData: (dashboardData) =>
        set((state) => ({
            dashboardData: typeof dashboardData === 'function' ? dashboardData(state.dashboardData) : dashboardData,
        })),
    handleToggleFavourite: (dashboardData: DashboardDataType | null) =>
        set((state) => ({
            dashboardDataList: state.dashboardDataList.map((item) =>
                item.id === dashboardData?.id ? { ...item, is_favorite: !item.is_favorite } : item
            ),
            dashboardData:
                state.dashboardData && state.dashboardData.id === dashboardData?.id
                    ? { ...state.dashboardData, is_favorite: !state.dashboardData.is_favorite }
                    : state.dashboardData,
        })),
    setTextWidget: (textWidget) =>
        set((state) => ({
            textWidget: typeof textWidget === 'function' ? textWidget(state.textWidget) : textWidget,
        })),
}));