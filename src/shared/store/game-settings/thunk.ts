import {ApplicationState} from "@/shared/store/";
import {Dispatch} from "redux";
import {DisableSettingsLoader, EnableSettingsLoader, LoadSettingsAction} from "./actions";
import {GameSettingsService} from "@/shared/services/game-settings.service";

const URL = 'https://starnavi-frontend-test-task.herokuapp.com/game-settings';

export const LoadSettingsActionAsync = () => (
    async (dispatch: Dispatch, getState: () => ApplicationState) => {
        try {
            dispatch(EnableSettingsLoader());
            const settings = await GameSettingsService.getGameSettings();
            console.log("settings:", settings);
            dispatch(LoadSettingsAction(settings));
            dispatch(DisableSettingsLoader());
        } catch (e) {
            console.log("LoadSettingsActionAsync error");
        }
    }
);