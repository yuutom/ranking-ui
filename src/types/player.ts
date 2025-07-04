import type { Affiliation } from "../enum/Affiliation";
import type { Danni } from "../enum/Danni";
import type { JunisenClass } from "../enum/JunisenClass";
import type { PlayerCategory } from "../enum/PlayerCategory";
import type { PlayingStyle } from "../enum/PlayingStyle";
import type { RyuohsenClass } from "../enum/RyuohsenClass";
import type { Title } from "../enum/Title";

export interface Player {
    id: string;
    kishiNumber: number;
    nameKana: string;
    nameRome: string;
    imageUrl: string;
    birthDate: string;
    debutDate: string;
    birthPlace: string;
    master: string;
    ryuohsen: string;
    junisen: string;
    ryuohsenClass: RyuohsenClass;
    junisenClass: JunisenClass;
    danni: Danni;
    title: Title[];
    affiliation?: Affiliation;
    playingStyle?: PlayingStyle;
    playerCategory: PlayerCategory;
    isActive: boolean;
}