import { SettingActions, GameDifficultyType} from "./types";

export type LoadSettingsActionType = {
    type: SettingActions.LOAD_SETTINGS;
    settings: GameDifficultyType;
}

export const LoadSettingsAction = (settings: GameDifficultyType): LoadSettingsActionType => ({
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