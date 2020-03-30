import "./dot.component.scss";
import * as React from "react";
import {classes} from "@/shared/utils/utils";

export enum DotStatus {
    USER = "user",
    COMPUTER = "computer",
    ACTIVE = "active",
    EMPTY = "empty"
}

export type DotType = {
    status: DotStatus;
    onClick?: (status: DotStatus) => void;
};

export const Dot: React.FC<DotType> = ({status, onClick}) => {
    const classNames = classes("dot", `dot-${status}`);

    return (
        <div
            className={classNames}
            onClick={ () => onClick(status)}
        />
    );
};

