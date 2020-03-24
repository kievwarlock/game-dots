import * as React from "react"
import {Layout} from "./layout.component";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "@/shared/store";

export const App: React.FC = () => {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Layout/>
            </BrowserRouter>
        </Provider>
    )
};