import * as React from "react";
import {generateGameFieldsArray, generateShuffleArray} from "@/shared/utils/game";
import {DotStatus} from "@/shared/components/dot.component";

export enum GameWinner {
    USER = "user",
    COMPUTER = "computer",
}

export type GameFieldsType = {
    status: DotStatus;
};

export type UseGameStateType = {
    fields: number;
    daley: number;
    isGameStart: boolean;
    tickId: ReturnType<typeof setInterval>;
    gameFields: GameFieldsType[];
    computerMoves: number[];
};

export type GameStatType = {
    user: number;
    computer: number;
};

export type UseGameType = {
    fields: number;
    daley: number;
    onGameStart?: () => void;
    onGameEnd?: (winner?: GameWinner) => void;
};

export function useGame({fields, daley, onGameEnd, onGameStart}: UseGameType) {

    const [gameStates, setGameStates] = React.useState<UseGameStateType>({
        fields: fields,
        daley: daley,
        isGameStart: false,
        tickId: null,
        gameFields: [],
        computerMoves: []
    });
    const gameState = React.useRef<UseGameStateType>({
        ...gameStates
    });

    const updateGameFields = () => {
        gameState.current.gameFields = generateGameFieldsArray(fields * fields, {
            status: DotStatus.EMPTY
        });
        gameState.current.computerMoves = generateShuffleArray(fields * fields);
        setGameStates({...gameState.current});
    };

    React.useEffect(() => {
        endGame();
        setGameStates({...gameState.current});
    }, [fields, daley]);

    const gameStat = (array: GameFieldsType[]): GameStatType => {
        const computedStats = array.reduce((acc: { [status: string]: number }, value) => {
            acc[value.status] = acc[value.status] ? acc[value.status] + 1 : 1;
            return acc;
        }, {});

        return {
            user: (computedStats[DotStatus.USER]) ? computedStats[DotStatus.USER] * 100 / array.length : 0,
            computer: (computedStats[DotStatus.COMPUTER]) ? computedStats[DotStatus.COMPUTER] * 100 / array.length : 0,
        }
    };

    const updateFirstFieldStatus = (status: DotStatus) => {
        const {computerMoves, gameFields} = gameState.current;
        if (computerMoves.length > 0) {
            gameFields[computerMoves[0]].status = status
        }
    };

    const tickAction = (isInterval = false) => {
        const {computerMoves, gameFields} = gameState.current;

        if (isInterval) {
            updateFirstFieldStatus(DotStatus.COMPUTER);
            computerMoves.shift();
        }
        updateFirstFieldStatus(DotStatus.ACTIVE);

        const statistic = gameStat(gameFields);

        if (statistic.user >= 50) {
            endGame(GameWinner.USER);
        }
        if (statistic.computer >= 50) {
            endGame(GameWinner.COMPUTER);
        }
        if (computerMoves.length === 0) {
            endGame();
        }
        setGameStates({...gameState.current});
    };

    const tick = () => {
        if (gameState.current.isGameStart) {
            gameState.current.tickId = setInterval(() => tickAction(true), daley);
            tickAction();
        }
    };

    const dotClick = (status: DotStatus) => {
        if (status === DotStatus.ACTIVE) {
            updateFirstFieldStatus(DotStatus.USER);
            gameState.current.computerMoves.shift();
            clearInterval(gameState.current.tickId);
            tick();
        }
    };

    const startGame = () => {
        if (!gameState.current.isGameStart) {
            gameState.current.isGameStart = true;
            tick();
            if (onGameStart) {
                onGameStart();
            }
        }
    };

    const endGame = (winner?: GameWinner) => {
        if (gameState.current.isGameStart && gameState.current.tickId) {
            gameState.current.isGameStart = false;
            clearInterval(gameState.current.tickId);
        }
        updateGameFields();
        if (onGameEnd) {
            onGameEnd(winner);
        }
    };

    return {
        ...gameStates,
        dotClick,
        endGame,
        startGame
    };
}
