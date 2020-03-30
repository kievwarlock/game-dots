import {Reducer} from "redux"
import {ActionTypes, WinnerActions, WinnersStateType} from "./types";

const initialState: WinnersStateType = {
    winners: [],
    loading: false,
};

export const gameWinners: Reducer<WinnersStateType> = (state = initialState, action: ActionTypes) => {

    switch (action.type) {
        case WinnerActions.LOAD_WINNERS:

            return {
                ...state,
                winners: [...state.winners, ...action.winners]
            };

        case WinnerActions.ENABLE_WINNER_LOADER:

            return {
                ...state,
                loading: false
            };

        case WinnerActions.DISABLE_WINNER_LOADER:

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