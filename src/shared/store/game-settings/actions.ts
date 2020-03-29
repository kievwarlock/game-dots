import {LevelSettingsType, SettingActions} from "./types";

export type LoadSettingsActionType = {
    type: SettingActions.LOAD_SETTINGS;
    settings: LevelSettingsType[];
}

export const LoadSettingsAction = (settings: LevelSettingsType[]): LoadSettingsActionType => ({
    type: SettingActions.LOAD_SETTINGS,
    settings
});

export type SettingsLoaderType = {
    type: SettingActions.DISABLE_SETTINGS_LOADER | SettingActions.ENABLE_SETTINGS_LOADER;
}

export const  EnableSettingsLoader= (): SettingsLoaderType => ({
    type: SettingActions.ENABLE_SETTINGS_LOADER
});

export const  DisableSettingsLoader= (): SettingsLoaderType => ({
    type: SettingActions.DISABLE_SETTINGS_LOADER
});