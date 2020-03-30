import {ApiService} from "@/shared/services/api.service";

export const GameSettingsService = {
    async getGameSettings() {
        return await ApiService.get("game-settings");
    }
};