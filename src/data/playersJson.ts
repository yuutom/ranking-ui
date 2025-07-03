// players.ts
import { Affiliation } from '../enum/Affiliation'
import { Danni } from '../enum/Danni'
import { GameCategory } from '../enum/GameCategory'
import { JunisenClass } from '../enum/JunisenClass'
import { PlayerCategory } from '../enum/PlayerCategory'
import { PlayingStyle } from '../enum/PlayingStyle'
import { ResultStatus } from '../enum/ResultStatus'
import { RyuohsenClass } from '../enum/RyuohsenClass'
import { Title } from '../enum/Title'
import type { Player } from '../types/player'
import type { ResultFromKishi } from '../types/resultFromKishi'
import rawPlayers from './players.json'


export const jsonPlayers: Player[] = rawPlayers.map(convertEnums)

export function convertEnums(raw: any): Player {
    const ryuohsenList = Object.values(RyuohsenClass)
    const junisenList = Object.values(JunisenClass)
    const danniList = Object.values(Danni)
    const titleList = Object.values(Title)
    const affiliationList = Object.values(Affiliation)
    const styleList = Object.values(PlayingStyle)
    const categoryList = Object.values(PlayerCategory)
  
    return {
      id: raw.id,
      kishiNumber: raw.kishi_number,
      nameKana: raw.nameKana,
      nameRome: raw.nameRome,
      imageUrl: raw.image_url,
      birthDate: raw.birth_date,
      debutDate: raw.debut_date,
      birthPlace: raw.birth_place,
      master: raw.master,
      ryuohsen: raw.ryuohsen,
      junisen: raw.junisen,
      ryuohsenClass: ryuohsenList[raw.ryuohsen_class],
      junisenClass: junisenList[raw.junisen_class],
      danni: danniList[raw.danni] ?? Danni.NONE,
      title: raw.title.map((t: any) => titleList[t]),
      affiliation: affiliationList[raw.affiliation] ?? Affiliation.NONE,
      playingStyle: styleList[raw.playing_style] ?? PlayingStyle.NONE,
      playerCategory: categoryList[raw.player_category] ?? PlayerCategory.KISHI,
      isActive: raw.is_active,
      resultsFromKishi: convertResultFromKishi(raw.result_from_kishi ?? []),
      record: raw.record,
    }
  }
  
  export function convertResultFromKishi(rawList: any[]): ResultFromKishi[] {
    const gameCategoryList = Object.values(GameCategory)
    const resultStatusList = Object.values(ResultStatus)

    return rawList.map((r): ResultFromKishi => ({
      gameName: r.game_name,
      gameCategory: gameCategoryList[r.game_category] ?? GameCategory.OTHER,
      oponentNumber: r.opponent_number,
      oponentName: r.opponent_name,
      resultStatus: resultStatusList[r.result_status] ?? ResultStatus.TBD,
      date: r.date?.[0] ?? "", // 複数日がある場合は最初の1日目を使う
    }))
  }  
