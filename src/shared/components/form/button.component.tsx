import "./button.component.scss"
import * as React from "react";
import {CommonProps} from "@/shared/types/types";
import {classes} from "@/shared/utils/utils";

export type ButtonType = CommonProps & {
    onClick?: () => void;
}

export const Button: React.FC<ButtonType> = (
    {
        children,
        onClick,
        ...CommonProps
    }) => {

    const classNames = classes("button", CommonProps.className);

    return (
        <div onClick={onClick} className={classNames}>
            {children}
        </div>
    )
};
