import {ApiService} from "@/shared/services/api.service";

export const GameWinnerService = {
    async getGameWinners() {
        return await ApiService.get("winners");
    }
};