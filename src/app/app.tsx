import "@/assets/scss/global.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {App} from "./component/app.component";
import "./app.i18n";

//TODO: load i18n before render app
ReactDOM.render(<App/>, document.getElementById("root"));