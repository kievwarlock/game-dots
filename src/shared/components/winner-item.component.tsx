import "./winner-item.component.scss";
import {WinnerType} from "@/shared/store/winners/types";
import * as React from "react";

export const WinnerItem: React.FC<WinnerType> = ({winner, date, id}) => (
    <div className="winner-item">
        <div className="winner-item__name">
            {winner}
        </div>
        <div className="winner-item__date">
            {date}
        </div>
    </div>
);


