export enum GameCategory {
    JUNI = "順位戦・名人戦", 
    RYUOH = "竜王戦・ランキング戦",
    EIOH = "叡王戦",
    OUI = "王位戦",
    OUZA = "王座戦",
    KISEI = "棋聖戦",
    KIOH = "棋王戦",
    ASAHI_CUP = "朝日杯戦",
    GINGA = "銀河戦",
    NHK = "NHK杯戦",
    JT = "日本シリーズ",
    TATSUZIN = "達人戦",
    SHINJINOH = "新人王戦",
    KAKOGAWA = "加古川青流戦",
    ABEMA = "ABEMAトーナメント",
    SUNTORY = "東西対抗戦",
    OTHER = "その他",
    HAKUREI = "白玲戦・女流順位戦",
    SEIREI = "清麗戦",
    MYNAVI = "マイナビ女子オープン",
    JORYU_OUZA = "女流王座戦",
    JORYU_MEIJIN = "女流名人戦",
    JORYU_OUI = "女流王位戦",
    JORYU_OUSHOU = "女流王将戦",
    TOUKA = "倉敷藤花戦",
    SHIRATAKI = "新人登竜門戦",
  }


export function extractDisplayGameName(gameName: string): string {
  const [prefix, suffix] = gameName.split(" ", 2) // 半角スペースで分割

  // カテゴリを長い順にして優先的にマッチ
  const sortedCategories = Object.values(GameCategory).sort((a, b) => b.length - a.length)

  for (const category of sortedCategories) {
    if (prefix.includes(category)) {
      return suffix ? `${category} ${suffix}` : category
    }
  }

  return gameName // 該当カテゴリがない場合は元の名前を返す
}