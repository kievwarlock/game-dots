import { SettingActions, GameSettingsType} from "./types";

export type RequestSettingsActionType = {
    type: SettingActions.REQUEST_SETTINGS;
    settings: GameSettingsType;
}

export const RequestSettingsAction = (settings: GameSettingsType): RequestSettingsActionType => ({
    type: SettingActions.REQUEST_SETTINGS,
    settings
});
