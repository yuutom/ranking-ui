import type { GameCategory } from "../enum/GameCategory";
import type { ResultStatus } from "../enum/ResultStatus";

export interface ResultFromKishi {
    gameName: string;
    gameCategory: GameCategory
    oponentNumber: number;
    oponentName: string;
    resultStatus: ResultStatus;
    date: string
}