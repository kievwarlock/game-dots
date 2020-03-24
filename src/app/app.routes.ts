export enum RegisterPages {
    HOME = "Home",
}

export type AppRouteType = {
    url: string;
};

export type AppRoutesType = {
    [key in keyof typeof RegisterPages]: AppRouteType
};

export const APP_ROUTES: AppRoutesType = {
    HOME: {
        url: "/"
    },
};