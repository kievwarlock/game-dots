import {ApplicationState} from "@/shared/store/";
import {Dispatch} from "redux";
import {RequestSettingsAction} from "./actions";

export const FetchSettingsAction = () => (
    async (dispatch: Dispatch, getState: () => ApplicationState) => {
        try {
            dispatch(RequestSettingsAction({}));
        } catch (e) {
            console.log("FetchSettingsAction error");
        }
    }
);
