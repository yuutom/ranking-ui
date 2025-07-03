// utils/DateUtils.ts

export class DateUtils {
    /**
     * 現在の年齢を計算
     */
    static getCurrentAge(birthDate: string): number | null {
      const birth = new Date(birthDate);
      const today = new Date();
      if (isNaN(birth.getTime())) return null;
  
      let age = today.getFullYear() - birth.getFullYear();
  
      const hasBirthdayPassedThisYear =
        today.getMonth() > birth.getMonth() ||
        (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
  
      if (!hasBirthdayPassedThisYear) {
        age -= 1;
      }
  
      return age;
    }
  
    /**
     * デビュー時の年齢を計算
     */
    static getDebutAge(birthDate: string, debutDate: string): number | null {
      const birth = new Date(birthDate);
      const debut = new Date(debutDate);
      if (isNaN(birth.getTime()) || isNaN(debut.getTime())) return null;
  
      let age = debut.getFullYear() - birth.getFullYear();
  
      const hasBirthdayPassedThisYear =
        debut.getMonth() > birth.getMonth() ||
        (debut.getMonth() === birth.getMonth() && debut.getDate() >= birth.getDate());
  
      if (!hasBirthdayPassedThisYear) {
        age -= 1;
      }
  
      return age;
    }
  
    /**
     * 日本語表記の日付（例：2025年6月24日）
     */
    static formatJapaneseDate(dateStr: string): string {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "不正な日付";
  
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
  
      return `${year}年${month}月${day}日`;
    }
  
    /**
     * 短縮形式（例：6/24）
     */
    static formatShortDate(dateStr: string): string {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "不正な日付";
  
      const month = date.getMonth() + 1;
      const day = date.getDate();
  
      return `${month}/${day}`;
    }

    /**
     * 短縮形式（例：6/24 18:30）
     */
    static formatShortDateTime(dateStr: string): string {
      const date = new Date(dateStr.replace(' ', 'T')); // ISO 8601形式に変換
    
      if (isNaN(date.getTime())) return "不正な日付";
    
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
    
      return `${month}/${day} ${hours}:${minutes}`;
    }
    


    static formatJapaneseDateWithWeekday(dateStr: string): string {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "不正な日付";
    
      const month = date.getMonth() + 1;
      const day = date.getDate();
    
      const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
      const weekday = weekdays[date.getDay()];
    
      return `${month}月${day}日 (${weekday})`;
    }
    
  }
  