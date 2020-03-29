import "./winners.component.scss";
import {WinnerType} from "@/shared/store/winners/types";
import * as React from "react";
import {WinnerItem} from "@/shared/components/winner-item.component";

export type WinnerComponentType = {
    winners: WinnerType[];
};

export const Winners: React.FC<WinnerComponentType> = ({winners}) => {

    return (
        <div className="winners">
            <div className="winners__title">Leader Board</div>
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


