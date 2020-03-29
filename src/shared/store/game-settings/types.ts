import * as actions from "./actions";

export enum SettingActions {
    LOAD_SETTINGS = "LoadSettings",
    ENABLE_SETTINGS_LOADER = "EnableSettingsLoader",
    DISABLE_SETTINGS_LOADER = "DisableWSettingsLoader"
}

export type LevelSettingsType = {
    title: string;
    field: number;
    delay: number;
}

export type GameSettingsStateType = {
    gameDifficulty: LevelSettingsType[];
    loading: boolean;
}

export type InferValue<T> = T extends { [key: string]: infer U} ? U : never;

export type ActionTypes = ReturnType<InferValue<typeof actions>>;