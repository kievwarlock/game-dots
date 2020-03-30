import "./winners.component.scss";
import {WinnerType} from "@/shared/store/winners/types";
import * as React from "react";
import {WinnerItem} from "@/shared/components/winner-item.component";
import {useTranslation} from "react-i18next";

export type WinnerComponentType = {
    winners: WinnerType[];
};

export const Winners: React.FC<WinnerComponentType> = ({winners}) => {
    const {t} = useTranslation();

    return (
        <div className="winners">
            <div className="winners__title">{t("leader_title")}</div>
            <div className="winners__wrapper">
                {winners && (
                    winners.slice(0, 5).map((winner) => (
                        <WinnerItem key={winner.id} {...winner} />
                    ))
                )}
            </div>
        </div>
    );
};


