import {ApiService} from "@/shared/services/api.service";
import {getFormatDate} from "@/shared/utils/date";

export type GameWinnerType = {
    winner: string;
    date: string;
}

export const GameWinnerService = {
    async getGameWinners() {
        return await ApiService.get("winners");
    },
    async addGameWinner(winner: string) {
        const params: GameWinnerType = {
            winner,
            date: getFormatDate(new Date())
        };
        return await ApiService.post("winners", params);
    },
};
