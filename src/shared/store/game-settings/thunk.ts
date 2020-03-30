import {ApplicationState} from "@/shared/store/";
import {Dispatch} from "redux";
import {DisableSettingsLoader, EnableSettingsLoader, LoadSettingsAction} from "./actions";
import {GameSettingsService} from "@/shared/services/game-settings.service";

export const LoadSettingsActionAsync = () => (
    async (dispatch: Dispatch, getState: () => ApplicationState) => {
        try {
            dispatch(EnableSettingsLoader());
            const settings = await GameSettingsService.getGameSettings();
            const formatSettings = [];
            for (let settingKey in settings) {
                formatSettings.push({
                    title: settingKey,
                    ...settings[settingKey]
                });
            }
            dispatch(LoadSettingsAction(formatSettings));
            dispatch(DisableSettingsLoader());
        } catch (e) {
            console.log("LoadSettingsActionAsync error");
        }
    }
);