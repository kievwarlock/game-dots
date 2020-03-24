import {Reducer} from "redux"
import {ActionTypes, GameSettingsType, SettingActions} from "./types";

const initialState: GameSettingsType = {
};

export const gameSettings: Reducer<GameSettingsType> = (state = initialState, action: ActionTypes) => {

    switch (action.type) {
        case SettingActions.REQUEST_SETTINGS:

            return {
                ...state,
            };

        default:
            return {
                ...state
            };
    }
};