// playersJson.ts
import { Affiliation } from '../enum/Affiliation'
import { Danni } from '../enum/Danni'
import { JunisenClass } from '../enum/JunisenClass'
import { PlayerCategory } from '../enum/PlayerCategory'
import { RyuohsenClass } from '../enum/RyuohsenClass'
import { Title } from '../enum/Title'
import type { Player } from '../types/player'

const S3_URL = 'https://kishi-info.s3.ap-northeast-1.amazonaws.com/players.json'

export async function fetchPlayers(): Promise<Player[]> {
  const res = await fetch(S3_URL)
  if (!res.ok) throw new Error('Failed to fetch players.json')
  const rawPlayers = await res.json()
  return rawPlayers.map(convertEnums)
}

export async function getJsonKishi(): Promise<Player[]> {
  const players = await fetchPlayers()
  return players.filter((k) => k.playerCategory === PlayerCategory.KISHI)
}

export async function getJsonJoryu(): Promise<Player[]> {
  const players = await fetchPlayers()
  return players.filter((k) => k.playerCategory === PlayerCategory.JORYU)
}

function convertEnums(raw: any): Player {
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
