import { GameCategory } from "../enum/GameCategory";
import { ResultStatus } from "../enum/ResultStatus";
import type { Game } from "../types/game";

export const dummyPickedUpGames: Game[] = [
    {
        id: 1, 
        gameName: "叡王戦 第5局",
        gameCategory: GameCategory.EIOH,
        senteNumber: 307,
        senteName: "藤井聡太",
        goteNumber: 324,
        goteName: "伊藤匠",
        senteResult: ResultStatus.DEFEATE,
        goteResult: ResultStatus.WIN,
        date: "2025-06-19"
    },
    {
        id: 2, 
        gameName: "王座戦 挑決トーナメント",
        gameCategory: GameCategory.OUZA,
        senteNumber: 324,
        senteName: "伊藤匠",
        goteNumber: 307,
        goteName: "藤井聡太",
        senteResult: ResultStatus.DEFEATE,
        goteResult: ResultStatus.WIN,
        date: "2025-06-19"
    },
    {
        id: 2, 
        gameName: "順位戦A級",
        gameCategory: GameCategory.JUNI,
        senteNumber: 278,
        senteName: "菅井竜也",
        goteNumber: 307,
        goteName: "藤井聡太",
        senteResult: ResultStatus.TBD,
        goteResult: ResultStatus.TBD,
        date: "2025-06-25"
    },
]