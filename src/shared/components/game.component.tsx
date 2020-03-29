import "./game.component.scss";
import * as React from "react";
import {Dot, DotStatus} from "@/shared/components/dot.component";

export type GameFieldDotType = {
    status: DotStatus;
}

export type GameFieldsType = {
    gameFields: GameFieldDotType[];
    dotClick?: (status: DotStatus, index: number) => void;
}

export const Game: React.FC<GameFieldsType> = ({gameFields, dotClick}) => {

    const columns = Math.sqrt(gameFields.length);
    const setFieldStyle = (columns: number) => ({
        gridTemplateColumns: `repeat(${columns}, 30px)`,
        gridTemplateRows: `repeat(${columns}, 30px)`
    });

    return (
        <div className="game" style={setFieldStyle(columns)}>
            {(gameFields && gameFields.length > 0) && (
                gameFields.map((item, index) => (
                    <Dot
                        key={index}
                        status={item.status}
                        onClick={(status) => dotClick(status, index)}
                    />
                ))
            )}
        </div>
    );
};


