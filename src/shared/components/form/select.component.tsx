import "./select.component.scss"
import * as React from "react";
import {CommonProps} from "@/shared/types/types";
import {classes} from "@/shared/utils/utils";

export type SelectValue = {
    text: string | number;
    value: string | number;
}

export type SelectType = CommonProps & {
    value?: SelectValue[];
    selected?: string;
    onChange?: (newValue: string) => void;
}

export const Select: React.FC<SelectType> = (
    {
        value,
        selected,
        onChange,
        ...CommonProps
    }) => {
    const classNames = classes("select", CommonProps.className);

    return (
        <select
            className={classNames}
            value={selected}
            onChange={(e) => onChange(e.target.value)}
        >
            {value && (
                value.map( (item, index) => (
                    <option key={index} value={item.value}>{item.text}</option>
                ))
            )}
        </select>
    )
};
