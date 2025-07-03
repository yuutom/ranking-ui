import type { GameCategory } from "../enum/GameCategory";
import type { ResultStatus } from "../enum/ResultStatus";

export interface Game {
    id: number;
    gameName: string;
    gameCategory: GameCategory;
    senteNumber: number;
    senteName: string,
    goteNumber: number;
    goteName: string;
    senteResult: ResultStatus;
    goteResult: ResultStatus;
    date: string;
}