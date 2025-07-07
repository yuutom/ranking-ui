// players.ts
import { Affiliation } from '../enum/Affiliation'
import { Danni } from '../enum/Danni'
import { JunisenClass } from '../enum/JunisenClass'
import { PlayerCategory } from '../enum/PlayerCategory'
import { RyuohsenClass } from '../enum/RyuohsenClass'
import { Title } from '../enum/Title'
import type { Player } from '../types/player'
import rawPlayers from './players.json'


export const jsonKishi: Player[] = rawPlayers.map(convertEnums).filter((k) => k.playerCategory == PlayerCategory.KISHI);
export const jsonJoryu: Player[] = rawPlayers.map(convertEnums).filter((k) => k.playerCategory == PlayerCategory.JORYU);

export function convertEnums(raw: any): Player {
    const ryuohsenList = Object.values(RyuohsenClass)
    const junisenList = Object.values(JunisenClass)
    const danniList = Object.values(Danni)
    const titleList = Object.values(Title)
    const affiliationList = Object.values(Affiliation)
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
      playerCategory: categoryList[raw.player_category] ?? PlayerCategory.KISHI,
      isActive: raw.is_active,
    }
  }
