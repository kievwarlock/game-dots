import {Reducer} from "redux"
import {ActionTypes, GameSettingsStateType, SettingActions} from "./types";

const initialState: GameSettingsStateType = {
    gameDifficulty: [],
    loading: false
};

export const gameSettings: Reducer<GameSettingsStateType> = (state = initialState, action: ActionTypes) => {

    switch (action.type) {
        case SettingActions.LOAD_SETTINGS:
            return {
                ...state,
                gameDifficulty: action.settings
            };
        case SettingActions.ENABLE_SETTINGS_LOADER:
            return {
                ...state,
                loading: false
            };
        case SettingActions.DISABLE_SETTINGS_LOADER:
            return {
                ...state,
                loading: true
            };
        default:
            return {
                ...state
            };
    }
};