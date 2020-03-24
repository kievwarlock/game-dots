import {ApplicationState} from "@/shared/store/";
import {Dispatch} from "redux";
import {DisableSettingsLoader, EnableSettingsLoader, LoadSettingsAction} from "./actions";

const URL = 'https://starnavi-frontend-test-task.herokuapp.com/game-settings';

export const LoadSettingsActionAsync = () => (
    async (dispatch: Dispatch, getState: () => ApplicationState) => {
        try {
            dispatch(EnableSettingsLoader());
            const response = await fetch(URL);
            const settings = await response.json();
            dispatch(LoadSettingsAction(settings));
            dispatch(DisableSettingsLoader());
        } catch (e) {
            console.log("LoadSettingsActionAsync error");
        }
    }
);