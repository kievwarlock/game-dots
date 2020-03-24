import {ApplicationState} from "@/shared/store/";
import {Dispatch} from "redux";
import {LoadWinnersAction, DisableWinnersLoader, EnableWinnersLoader} from "./actions";

const URL = 'https://starnavi-frontend-test-task.herokuapp.com/winners';

export const LoadWinnersActionAsync = () => (
    async (dispatch: Dispatch, getState: () => ApplicationState) => {
        try {
            dispatch(EnableWinnersLoader());
            const response = await fetch(URL);
            const winners = await response.json();
            dispatch(LoadWinnersAction(winners));
            dispatch(DisableWinnersLoader());
        } catch (e) {
            console.log("LoadWinnersActionAsync error");
        }
    }
);
