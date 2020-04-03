import "./game-container.component.scss";
import * as React from "react";
import {useDispatch} from "react-redux";
import {Game} from "@/shared/components/game.component";
import {SelectDifficulty} from "@/shared/components/form/select-difficulty.component";
import {Input} from "@/shared/components/form/input.component";
import {useTranslation} from "react-i18next";
import {LevelSettingsType} from "@/shared/store/game-settings/types";
import {GameWinner, useGame} from "@/shared/hook/game.hook";
import {Button} from "@/shared/components/form/button.component";
import {AddWinnerActionAsync} from "@/shared/store/winners/thunk";

export type GameContainerType = {
    gameDifficulty: LevelSettingsType[];
}

export const GameContainer: React.FC<GameContainerType> = ({gameDifficulty}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const [isStart, setIsStart] = React.useState(false);
    const [gameCount, setGameCount] = React.useState(0);
    const [gameTitle, setGameTitle] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [gameSettings, setGameSettings] = React.useState<LevelSettingsType>(gameDifficulty[0]);

    const game = useGame({
        daley: gameSettings.delay,
        fields: gameSettings.field,
        onGameStart: () => {
            setIsStart(true);
            setGameTitle("");
            setGameCount(gameCount + 1);
        },
        onGameEnd: (winner: GameWinner) => {
            setIsStart(false);
            if (winner) {
                const winnerName = (winner === GameWinner.USER) ? userName : t("computer");
                setGameTitle(`${winnerName} ${t("win")}`);
                dispatch(AddWinnerActionAsync(winnerName));
            } else {
                setGameTitle("");
            }
        },
    });

    const startGame = () => {
        if (!isStart) {
            if (!userName) return alert(t("enter_your_name"));
            game.startGame();
        }
    };

    const changeGameSetting = (value: string) => {
        const selectedSetting = gameDifficulty.find((item) => item.title === value);
        if (selectedSetting) {
            setGameSettings(selectedSetting);
        }
    };


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
                                {gameCount > 0
                                    ? t("play_again")
                                    : t("play")
                                }
                            </Button>
                        )}
                    </div>
                </div>
            )}
            <div className="game-container__game">
                <div className="game-container__game-title">
                    {gameTitle}
                </div>
                {game.gameFields.length && (
                    <Game
                        gameFields={game.gameFields}
                        dotClick={game.dotClick}
                    />
                )}
            </div>
        </div>
    );
};