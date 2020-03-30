import {createStore, combineReducers, Store, applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {GameSettingsStateType} from "./game-settings/types"
import {WinnersStateType} from "./winners/types"
import {gameSettings} from "./game-settings/reducer"
import {gameWinners} from "./winners/reducer"

export type ApplicationState = {
    settings: GameSettingsStateType;
    winners: WinnersStateType;
}

export type ApplicationReducersType = {
    settings: typeof gameSettings;
    winners: typeof gameWinners;
}

export const rootReducers = combineReducers<ApplicationReducersType>( {
    settings: gameSettings,
    winners: gameWinners,
});

export const store: Store<ApplicationState> = createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware(thunk))
);

