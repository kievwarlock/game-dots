import "./game-container.component.scss";
import * as React from "react";
import {useSelector} from "react-redux";
import {ApplicationState} from "@/shared/store";
import {GameSettingsStateType, LevelSettingsType} from "@/shared/store/game-settings/types";
import {DotStatus} from "@/shared/components/dot.component";
import {Game} from "@/shared/components/game.component";

const generateGameFieldsArray = (countFields: number, defaultState: {}) => {
    return Array.apply(null, {length: countFields}).map(() => Object.assign({}, defaultState));
};

const generateShuffleArray = (length: number) => [...Array(length).keys()].sort(() => Math.random() - 0.5);

const getGameStat = (array: { status: string }[]) => {
    const returnObj = {} as any;
    for (let item of array) {
        returnObj[item.status] = returnObj[item.status]
            ? returnObj[item.status] + 1
            : 1;
    }
    return returnObj;
};


export const GameContainer: React.FC = () => {
    const {gameDifficulty, loading: loadingSetting} = useSelector<ApplicationState, GameSettingsStateType>(state => state.settings);

    const [isStart, setIsStart] = React.useState(false);
    const [computerMoves, setComputerMoves] = React.useState(null);
    const [gameSettings, setGameSettings] = React.useState<LevelSettingsType>(null);
    const [progress, setProgress] = React.useState(0);
    const [gameFields, setGameFields] = React.useState([]);

    React.useEffect(() => {
        setGameSettings(gameDifficulty.easyMode);
    }, [loadingSetting]);

    React.useEffect(() => {
        if(gameSettings && gameSettings.field){
            setGameFields(generateGameFieldsArray(gameSettings.field * gameSettings.field, {
                status: DotStatus.EMPTY
            }));
            setComputerMoves(generateShuffleArray(gameSettings.field * gameSettings.field));
        }
    }, [gameSettings]);

    const dotClick = (status: DotStatus, index: number) => {
        console.log(status, index);
        if (status === DotStatus.ACTIVE) {
            updateDot(index, DotStatus.USER);
            setProgress((value) => value + 1);
        }
    };

    const updateDot = (index: number, status: DotStatus) => {
        setGameFields(fields => {
            const newFields = [...fields];
            newFields[index].status = status;
            return newFields;
        });
    };


    React.useEffect(() => {
        if (!isStart) return;

        if (progress > 0) {
            if (gameFields[computerMoves[progress - 1]].status === DotStatus.ACTIVE) {
                updateDot(computerMoves[progress - 1], DotStatus.COMPUTER);
            }
        }
        if (progress < computerMoves) {
            alert("GAME END");
        }

        updateDot(computerMoves[progress], DotStatus.ACTIVE);

        const timerId = setTimeout(() => {
            setProgress(progress + 1);
        }, gameSettings.delay);

        return () => {
            setProgress(progress + 1);
            clearTimeout(timerId)
        };

    }, [progress, isStart]);


    return (
        <div className="game-container">
            <div className="game-container__navigation">
                {isStart ?
                    <button onClick={() => setIsStart(false)}>END GAME</button>
                    :
                    <button onClick={() => setIsStart(true)}>START GAME</button>
                }
            </div>
            <div className="game-container__game">
                {(gameFields && gameFields.length > 0) && (
                    <Game
                        gameFields={gameFields}
                        dotClick={dotClick}
                    />
                )}
            </div>
        </div>
    );
};


