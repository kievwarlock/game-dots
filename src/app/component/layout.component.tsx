import * as React from "react";
import {Switch, Route, useLocation} from "react-router-dom";
import {HomePage} from "@/app/page/home-page.component";
import {APP_ROUTES} from "@/app/app.routes";
import {PageLoader} from "@/shared/components/page-loader.component";
import {Suspense} from "react";
import {useDispatch} from "react-redux";
import {LoadWinnersActionAsync} from "@/shared/store/winners/thunk";
import {LoadSettingsActionAsync} from "@/shared/store/game-settings/thunk";

export const Layout: React.FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(LoadWinnersActionAsync());
        dispatch(LoadSettingsActionAsync());
    }, []);

    return (
        <Suspense fallback={<PageLoader/>}>
            <div className="layout">
                <Switch location={location}>
                    <Route
                        component={HomePage}
                        path={APP_ROUTES.HOME.url}
                        exact
                    />
                </Switch>
            </div>
        </Suspense>
    );
};
