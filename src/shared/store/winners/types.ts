import * as actions from "./actions";

export enum WinnerActions {
    LOAD_WINNERS = "LoadWinners",
    ENABLE_WINNER_LOADER = "EnableWinnerLoader",
    DISABLE_WINNER_LOADER = "DisableWinnerLoader"
}

export type WinnerType = {
    id: number;
    winner: string;
    date: string
}

export type WinnersStateType = {
    winners: WinnerType[];
    loading: boolean;
}

export type InferValue<T> = T extends { [key: string]: infer U } ? U : never;

export type ActionTypes = ReturnType<InferValue<typeof actions>>;