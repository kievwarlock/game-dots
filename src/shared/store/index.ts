import {createStore, combineReducers, Store, applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {GameSettingsType} from "./game-settings/types"
import {gameSettings} from "./game-settings/reducer"

export type ApplicationState = {
    settings: GameSettingsType;
}

export type ApplicationReducersType = {
    settings: typeof gameSettings;
}

export const rootReducers = combineReducers<ApplicationReducersType>( {
    settings: gameSettings
});

export const store: Store<ApplicationState> = createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware(thunk))
);

