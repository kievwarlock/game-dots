import "./home-page.component.scss"
import * as React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "@/shared/store";
import {WinnersStateType, WinnerType} from "@/shared/store/winners/types";
import {LoadWinnersActionAsync} from "@/shared/store/winners/thunk";
import {LoadSettingsActionAsync} from "@/shared/store/game-settings/thunk";
import {Winners} from "@/shared/components/winners.component";
import {GameContainer} from "@/shared/components/game-container.component";


export const HomePage: React.FC = () => {
    const {t} = useTranslation();
    const {winners, loading: loadingWinner} = useSelector<ApplicationState, WinnersStateType>(state => state.winners);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(LoadWinnersActionAsync());
        dispatch(LoadSettingsActionAsync());
    }, []);

    return (
        <div className="home-page">
            <h1 className="home-page__title">{t("title")}</h1>
            <div className="home-page__game-container">
                <div className="home-page__game">
                    <GameContainer/>
                </div>
                <div className="home-page__winners">
                    {loadingWinner ? <Winners winners={winners}/> : "Loading..."}
                </div>
            </div>
        </div>
    );
};