import "./game-container.component.scss";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "@/shared/store";
import {generateGameFieldsArray, generateShuffleArray} from "@/shared/utils/game";
import {GameSettingsStateType, LevelSettingsType} from "@/shared/store/game-settings/types";
import {DotStatus} from "@/shared/components/dot.component";
import {Game} from "@/shared/components/game.component";
import {SelectDifficulty} from "@/shared/components/form/select-difficulty.component";
import {Button} from "@/shared/components/form/button.component";
import {Input} from "@/shared/components/form/input.component";
import {useTranslation} from "react-i18next";
import {AddWinnerActionAsync} from "@/shared/store/winners/thunk";

export const GameContainer: React.FC = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {gameDifficulty, loading: loadingSetting} = useSelector<ApplicationState, GameSettingsStateType>(state => state.settings);

    const [isStart, setIsStart] = React.useState(false);

    const [computerStat, setComputerStat] = React.useState(0);
    const [userStat, setUserStat] = React.useState(0);
    const [gameTitle, setGameTitle] = React.useState("");
    const [countGames, setCountGames] = React.useState(0);
    const [userName, setUserName] = React.useState("");

    const [computerMoves, setComputerMoves] = React.useState(null);
    const [gameSettings, setGameSettings] = React.useState<LevelSettingsType>(null);
    const [gameFields, setGameFields] = React.useState([]);
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        if (gameDifficulty && gameDifficulty.length > 0) {
            setGameSettings(gameDifficulty[0]);
        }
    }, [loadingSetting]);

    React.useEffect(() => {
        if (gameSettings && gameSettings.field && !isStart) {
            setGameFields(generateGameFieldsArray(gameSettings.field * gameSettings.field, {
                status: DotStatus.EMPTY
            }));
            setComputerMoves(generateShuffleArray(gameSettings.field * gameSettings.field));
        }
    }, [gameSettings, isStart]);

    const startGame = () => {
        if (!isStart) {
            if (!userName) return alert(t("enter_your_name"));
            setGameTitle("");
            setIsStart(true);
        }
    };

    const endGame = () => {
        if (isStart) {
            setProgress(0);
            setComputerStat(0);
            setUserStat(0);
            setIsStart(false);
            setCountGames((games) => games + 1);
        }
    };

    const changeGameSetting = (value: string) => {
        endGame();
        const selectedSetting = gameDifficulty.find((item) => item.title === value);
        if (selectedSetting) {
            setGameSettings(selectedSetting);
        }
    };

    const dotClick = (status: DotStatus, index: number) => {
        if (!isStart) return;

        if (status === DotStatus.ACTIVE) {
            updateDot(index, DotStatus.USER);
            setProgress((value) => value + 1);
        }
    };

    const updateDot = (index: number, status: DotStatus) => {
        if (status === DotStatus.USER) {
            setUserStat((val) => val + 1);
        }
        if (status === DotStatus.COMPUTER) {
            setComputerStat((val) => val + 1);
        }
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

        if (userStat > gameFields.length / 2) {
            setGameTitle(`${userName} ${t("win")}`);
            dispatch(AddWinnerActionAsync(userName));
            return endGame();
        }

        if (computerStat >= gameFields.length / 2) {
            setGameTitle(`${t("computer")} ${t("win")}`);
            dispatch(AddWinnerActionAsync("Computer"));
            return endGame();
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
            {(gameSettings) && (
                <div className="game-container__navigation">
                    <div className="game-container__navigation-item">
                        <SelectDifficulty
                            value={gameDifficulty}
                            selected={gameSettings.title}
                            onChange={(value) => changeGameSetting(value)}
                        />
                    </div>
                    <div className="game-container__navigation-item">
                        <Input
                            placeholder={t("enter_your_name")}
                            disabled={isStart}
                            value={userName}
                            onChange={setUserName}
                        />
                    </div>
                    <div className="game-container__navigation-item">
                        {!isStart && (
                            <Button className="text_nowrap" onClick={startGame}>
                                {countGames > 0 ? t("play_again") : t("play")}
                            </Button>
                        )}
                    </div>
                </div>
            )}
            <div className="game-container__game">
                <div className="game-container__game-title">
                    {gameTitle}
                </div>
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