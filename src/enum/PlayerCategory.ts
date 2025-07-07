export enum PlayerCategory {
    KISHI = "棋士", 
    JORYU = "女流棋士",
    OTHER = "その他"
  }

export function getSlug(category: PlayerCategory): string {
    switch (category) {
        case PlayerCategory.KISHI:
            return "kishi";
        case PlayerCategory.JORYU:
            return "joryu";
        default:
            return "other";
    }
}