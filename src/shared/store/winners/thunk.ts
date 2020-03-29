import {ApplicationState} from "@/shared/store/";
import {Dispatch} from "redux";
import {LoadWinnersAction, DisableWinnersLoader, EnableWinnersLoader} from "./actions";
import {GameWinnerService} from "@/shared/services/game-winners.service";

export const LoadWinnersActionAsync = () => (
    async (dispatch: Dispatch, getState: () => ApplicationState) => {
        try {
            dispatch(EnableWinnersLoader());
            const winners = await GameWinnerService.getGameWinners();
            dispatch(LoadWinnersAction(winners));
            dispatch(DisableWinnersLoader());
        } catch (e) {
            console.log("LoadWinnersActionAsync error");
        }
    }
);
