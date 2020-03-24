import * as actions from "./actions";

export enum SettingActions {
    LOAD_SETTINGS = "LoadSettings",
    ENABLE_SETTINGS_LOADER = "EnableSettingsLoader",
    DISABLE_SETTINGS_LOADER = "DisableWSettingsLoader"
}

export type LevelSettingsType = {
    field: number;
    delay: number;
}

export type GameDifficultyType = {
    easyMode?: LevelSettingsType;
    normalMode?: LevelSettingsType;
    hardMode?: LevelSettingsType;
}

export type GameSettingsStateType = {
    gameDifficulty: GameDifficultyType;
    loading: boolean;
}



export type InferValue<T> = T extends { [key: string]: infer U} ? U : never;

export type ActionTypes = ReturnType<InferValue<typeof actions>>;