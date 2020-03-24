import * as actions from "./actions";

export enum SettingActions {
    REQUEST_SETTINGS = "RequestSettings",
}

export type LevelSettingsType = {
    field: number;
    delay: number;
}

export type GameSettingsType = {
    easyMode?: LevelSettingsType;
    normalMode?: LevelSettingsType;
    hardMode?: LevelSettingsType;
}

export type InferValue<T> = T extends { [key: string]: infer U} ? U : never;

export type ActionTypes = ReturnType<InferValue<typeof actions>>;