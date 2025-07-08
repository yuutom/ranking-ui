import type { GameCategory } from "../enum/GameCategory";
import type { PlayerCategory } from "../enum/PlayerCategory";
import type { ResultStatus } from "../enum/ResultStatus";

export interface Game {
    game_id: string
    game_name: string
    game_category: GameCategory
    sente_player_number: number
    sente_player_name: string
    sente_player_category: PlayerCategory
    sente_player_id: string
    sente_player_result: ResultStatus
    gote_player_number: number
    gote_player_name: string
    gote_player_category: PlayerCategory
    gote_player_id: string
    gote_player_result: ResultStatus
    date: string[]
    year: number
}