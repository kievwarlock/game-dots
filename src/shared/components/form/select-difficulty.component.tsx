import "./select-difficulty.component.scss"
import * as React from "react";
import {CommonProps} from "@/shared/types/types";
import {classes} from "@/shared/utils/utils";
import {LevelSettingsType} from "@/shared/store/game-settings/types";
import {Select} from "@/shared/components/form/select.component";
import {useTranslation} from "react-i18next";

export type SelectDifficultyType = CommonProps & {
    value?: LevelSettingsType[];
    selected?: string;
    onChange?: (newValue: string) => void;
}

export const SelectDifficulty: React.FC<SelectDifficultyType> = (
    {
        value,
        selected,
        onChange,
        ...CommonProps
    }) => {
    const {t} = useTranslation();
    const classNames = classes("select-difficulty", CommonProps.className);

    const selectValue = value.map((item) => ({
        text: t(item.title),
        value: item.title
    }));


    return (
        <div className={classNames}>
            <Select
                value={selectValue}
                selected={selected}
                onChange={onChange}
            />
        </div>
    )
};
