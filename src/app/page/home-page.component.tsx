import "./home-page.component.scss"
import * as React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "@/shared/store";
import {GameDifficultyType, GameSettingsStateType} from "@/shared/store/game-settings/types";
import {WinnersStateType, WinnerType} from "@/shared/store/winners/types";
import {LoadWinnersActionAsync} from "@/shared/store/winners/thunk";
import {LoadSettingsActionAsync} from "@/shared/store/game-settings/thunk";

type WinnerComponentType = {
    winners: WinnerType[];
};

const Winners: React.FC<WinnerComponentType> = ({winners}) => {

    return (
        <>
            {winners &&
            winners.map((item) => (
                <div key={item.id}>
                    <div>{item.id}</div>
                    <div>{item.winner}</div>
                    <div>{item.date}</div>
                </div>
            ))
            }
        </>
    );
};

type SettingsComponentType = {
    setting: GameDifficultyType
};

const Settings: React.FC<SettingsComponentType> = ({setting}) => {

    return (
        <>
            <hr/>
            <div>
                <h4>easyMode</h4>
                field: {setting.easyMode.field} <br/>
                delay: {setting.easyMode.delay} <br/>
            </div>
            <hr/>
            <div>
                <h4>hardMode</h4>
                field: {setting.hardMode.field} <br/>
                delay: {setting.hardMode.delay} <br/>
            </div>
            <hr/>
            <div>
                <h4>normalMode</h4>
                field: {setting.normalMode.field} <br/>
                delay: {setting.normalMode.delay} <br/>
            </div>
        </>
    );
};


export const HomePage: React.FC = () => {
    const {t} = useTranslation();
    const {gameDifficulty, loading: loadingSetting} = useSelector<ApplicationState, GameSettingsStateType>(state => state.settings);
    const {winners, loading: loadingWinner} = useSelector<ApplicationState, WinnersStateType>(state => state.winners);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(LoadWinnersActionAsync());
        dispatch(LoadSettingsActionAsync());
    }, []);

    return (
        <div className="home-page">
            <h1>{t("title")}</h1>
            <div>
                Winners:
                <br/>
                { loadingWinner && loadingSetting
                    ? <Winners winners={winners}/>
                    : "Loading..."
                }
                { loadingWinner && loadingSetting
                    ? <Settings setting={gameDifficulty}/>
                    : "Loading..."
                }
            </div>
        </div>
    );
};