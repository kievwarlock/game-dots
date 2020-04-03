import "./game.component.scss";
import * as React from "react";
import {Dot, DotStatus} from "@/shared/components/dot.component";

export type GameFieldDotType = {
    status: DotStatus;
}

export type GameFieldsType = {
    gameFields: GameFieldDotType[];
    dotClick?: (status: DotStatus) => void;
}

export const Game: React.FC<GameFieldsType> = ({gameFields, dotClick}) => {
    const dotWidth = 40;
    const columns = Math.sqrt(gameFields.length);
    const setFieldStyle = (columns: number, width: number) => ({
        gridTemplateColumns: `repeat(${columns}, ${width}px)`,
        gridTemplateRows: `repeat(${columns}, ${width}px)`
    });

    return (
        <div className="game" style={setFieldStyle(columns, dotWidth)}>
            {(gameFields && gameFields.length > 0) && (
                gameFields.map((item, index) => (
                    <Dot
                        key={index}
                        status={item.status}
                        onClick={(status) => dotClick(status)}
                    />
                ))
            )}
        </div>
    );
};


