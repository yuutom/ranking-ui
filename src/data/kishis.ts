import { Affiliation } from "../enum/Affiliation";
import { Danni } from "../enum/Danni";
import { GameCategory } from "../enum/GameCategory";
import { JunisenClass } from "../enum/JunisenClass";
import { PlayerCategory } from "../enum/PlayerCategory";
import { ResultStatus } from "../enum/ResultStatus";
import { RyuohsenClass } from "../enum/RyuohsenClass";
import { Title } from "../enum/Title";
import type { Player } from "../types/player";

export const dummyKishi: Player[] = [
    {
        id: 1,
        kishiNumber: 324,
        nameKana: "伊藤匠",
        nameRome: "Takumi Ito",
        imageUrl: "https://www.shogi.or.jp/images/player/pro/324.jpg",
        birthDate: "2002-10-10",
        debutDate: "2020-10-01",
        birthPlace: "東京都世田谷区",
        master: "宮田利男八段",
        ryuohsen: "第37期竜王（1組以上：4期）",
        junisen: "第83期名人（Ａ級以上：4期）",
        ryuohsenClass: RyuohsenClass.CLASS_1,
        junisenClass: JunisenClass.B1,
        danni: Danni.DAN8,
        title: [Title.EIOH],
        affiliation: Affiliation.KANTOU,
        resultsFromKishi: [
            {
                gameName: "叡王戦 第5局",
                gameCategory: GameCategory.EIOH,
                oponentNumber: 307,
                oponentName: "藤井聡太",
                resultStatus: ResultStatus.DEFEATE,
                date: "2025-06-19"
            },
            {
                gameName: "王座戦 挑決トーナメント・千日手",
                gameCategory: GameCategory.OUZA,
                oponentNumber: 278,
                oponentName: "菅井竜也",
                resultStatus: ResultStatus.WIN,
                date: "2025-06-15"
            },
            {
                gameName: "叡王戦 第5局",
                gameCategory: GameCategory.EIOH,
                oponentNumber: 307,
                oponentName: "藤井聡太",
                resultStatus: ResultStatus.DEFEATE,
                date: "2025-06-24"
            },
            {
                gameName: "叡王戦 第5局",
                gameCategory: GameCategory.EIOH,
                oponentNumber: 307,
                oponentName: "藤井聡太",
                resultStatus: ResultStatus.DEFEATE,
                date: "2025-06-30"
            },
            {
                gameName: "叡王戦 第5局",
                gameCategory: GameCategory.EIOH,
                oponentNumber: 307,
                oponentName: "藤井聡太",
                resultStatus: ResultStatus.DEFEATE,
                date: "2025-06-24"
            },
        ],
        record: {wins: 5, loses: 3, total_ranking: 15, wins_ranking: 17, winning_rate_ranking: 10},
        playerCategory: PlayerCategory.KISHI,
        isActive: true,
    },
    {
        id: 2,
        kishiNumber: 307,
        nameKana: "藤井聡太",
        nameRome: "Sota Fujii",
        imageUrl: "https://www.shogi.or.jp/images/player/pro/307.jpg",
        birthDate: "2002/07/19",
        debutDate: "2016-10-01",
        birthPlace: "愛知県瀬戸市",
        master: "杉本昌隆八段",
        ryuohsen: "第37期竜王（1組以上：4期）",
        junisen: "第83期名人（Ａ級以上：4期）",
        ryuohsenClass: RyuohsenClass.RYUOH,
        junisenClass: JunisenClass.MEIJIN,
        danni: Danni.DAN9,
        title: [Title.MEIJIN, Title.RYUOH, Title.KIOH, Title.KISEI, Title.OUI, Title.OUSHO, Title.OUZA],
        affiliation: Affiliation.KANSAI,
        record: {wins: 10, loses: 1, total_ranking: 1, wins_ranking: 1, winning_rate_ranking: 1},
        playerCategory: PlayerCategory.KISHI,
        isActive: true,
    },
    {
        id: 3,
        kishiNumber: 278,
        nameKana: "菅井竜也",
        nameRome: "Tatsuya Sugai",
        imageUrl: "https://www.shogi.or.jp/images/player/pro/278.jpg",
        birthDate: "1992/04/17",
        debutDate: "2010-04-01",
        birthPlace: "岡山県岡山市",
        master: "井上慶太九段",
        ryuohsen: "第37期竜王（1組以上：4期）",
        junisen: "第83期名人（Ａ級以上：4期）",
        ryuohsenClass: RyuohsenClass.CLASS_1,
        junisenClass: JunisenClass.B1,
        danni: Danni.DAN8,
        title: [],
        affiliation: Affiliation.KANSAI,
        record: {wins: 2, loses: 9, total_ranking: 20, wins_ranking: 20, winning_rate_ranking: 20},
        playerCategory: PlayerCategory.KISHI,
        isActive: true,
    },
]