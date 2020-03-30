import "./home-page.component.scss"
import * as React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "@/shared/store";
import {WinnersStateType} from "@/shared/store/winners/types";
import {LoadWinnersActionAsync} from "@/shared/store/winners/thunk";
import {LoadSettingsActionAsync} from "@/shared/store/game-settings/thunk";
import {Winners} from "@/shared/components/winners.component";
import {GameContainer} from "@/shared/components/game-container.component";
import i18next from "i18next";
import {Select} from "@/shared/components/form/select.component";
import {availableLanguages} from "@/app/app.i18n";

export const HomePage: React.FC = () => {
    const {t} = useTranslation();
    const {winners, loading: loadingWinner} = useSelector<ApplicationState, WinnersStateType>(state => state.winners);
    const dispatch = useDispatch();
    const [currentLanguage, setCurrentLanguage] = React.useState(i18next.language);

    const changeLang = async (language: any) => {
        try {
            await i18next.changeLanguage(language);
            setCurrentLanguage(language);
        }catch (e) {
            console.log('change Lang error!', e);
        }
    };

    const languages = availableLanguages.map( (lang) => ({
        text: t(lang),
        value: lang
    }));

    React.useEffect(() => {
        dispatch(LoadWinnersActionAsync());
        dispatch(LoadSettingsActionAsync());
    }, []);

    return (
        <div className="home-page">
            <h1 className="home-page__title text_center">{t("title")}</h1>
            <div className="home-page__lang">
                <div className="home-page__lang-label">
                    {t("language")}
                </div>
                <Select
                    value={languages}
                    selected={currentLanguage}
                    onChange={changeLang}
                />
            </div>
            <div className="home-page__game-container">
                <div className="home-page__game">
                    <GameContainer/>
                </div>
                <div className="home-page__winners">
                    {loadingWinner ? <Winners winners={winners.reverse().slice(0, 5)}/> : "Loading..."}
                </div>
            </div>
        </div>
    );
};