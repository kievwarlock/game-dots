import "./home-page.component.scss"
import * as React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "@/shared/store";
import {GameSettingsType} from "@/shared/store/game-settings/types";

export const HomePage: React.FC = () => {
    const {t} = useTranslation();
    const settings = useSelector<ApplicationState, GameSettingsType>(state => state.settings);
    const dispatch = useDispatch();

    return (
        <div className="home-page">
            <h1>{t("title")}</h1>
        </div>
    );
};