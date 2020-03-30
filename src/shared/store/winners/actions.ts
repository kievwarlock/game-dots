import { WinnerActions, WinnerType} from "./types";

export type WinnersActionType = {
    type: WinnerActions.LOAD_WINNERS;
    winners: WinnerType[];
}

export const LoadWinnersAction = (winners: WinnerType[]): WinnersActionType => ({
    type: WinnerActions.LOAD_WINNERS,
    winners
});

export type WinnersLoaderType = {
    type: WinnerActions.ENABLE_WINNER_LOADER | WinnerActions.DISABLE_WINNER_LOADER;
}

export const  EnableWinnersLoader= (): WinnersLoaderType => ({
    type: WinnerActions.ENABLE_WINNER_LOADER
});

export const  DisableWinnersLoader= (): WinnersLoaderType => ({
    type: WinnerActions.DISABLE_WINNER_LOADER
});
