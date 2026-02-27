export interface Word {
  index: number;
  circassian: string;
  pronunciation: string;
  english: string;
  arabic: string;
  category: string;
}

export type TargetLang = 'en' | 'ar';

export function getMeaning(word: Word, lang: TargetLang): string {
  return lang === 'ar' ? word.arabic : word.english;
}

export interface Category {
  name: string;
  nameAr: string;
  id: string;
  emoji: string;
  color: string;
}

export function getCategoryName(cat: Category, lang: TargetLang): string {
  return lang === 'ar' ? cat.nameAr : cat.name;
}

export const categories: Category[] = [
  { name: 'Pronouns', nameAr: 'الضمائر', id: 'pronouns', emoji: '👤', color: '#FF6B6B' },
  { name: 'Core Verbs', nameAr: 'الأفعال الأساسية', id: 'core-verbs', emoji: '⚡', color: '#4ECDC4' },
  { name: 'People', nameAr: 'الناس', id: 'people', emoji: '👥', color: '#45B7D1' },
  { name: 'Family', nameAr: 'العائلة', id: 'family', emoji: '🏠', color: '#96CEB4' },
  { name: 'Body', nameAr: 'الجسم', id: 'body', emoji: '🦴', color: '#FFEAA7' },
  { name: 'Food & Drink', nameAr: 'الطعام والشراب', id: 'food-drink', emoji: '🍞', color: '#DDA0DD' },
  { name: 'Nature', nameAr: 'الطبيعة', id: 'nature', emoji: '🌿', color: '#98D8C8' },
  { name: 'Places', nameAr: 'الأماكن', id: 'places', emoji: '🏘️', color: '#F7DC6F' },
  { name: 'Time', nameAr: 'الوقت', id: 'time', emoji: '⏰', color: '#BB8FCE' },
  { name: 'Adjectives', nameAr: 'الصفات', id: 'adjectives', emoji: '🎨', color: '#F1948A' },
  { name: 'Questions', nameAr: 'أدوات الاستفهام', id: 'questions', emoji: '❓', color: '#85C1E9' },
  { name: 'Numbers', nameAr: 'الأرقام', id: 'numbers', emoji: '🔢', color: '#82E0AA' },
  { name: 'Directions', nameAr: 'الاتجاهات', id: 'directions', emoji: '🧭', color: '#F0B27A' },
  { name: 'Basic Words', nameAr: 'كلمات أساسية', id: 'basic-words', emoji: '📝', color: '#AED6F1' },
  { name: 'More Verbs', nameAr: 'أفعال إضافية', id: 'more-verbs', emoji: '🏃', color: '#D2B4DE' },
  { name: 'Abstract', nameAr: 'كلمات مجردة', id: 'abstract', emoji: '💭', color: '#A3E4D7' },
  { name: 'Expressions', nameAr: 'تعبيرات', id: 'expressions', emoji: '💬', color: '#FAD7A0' },
];

export const words: Word[] = [
  // 1. Pronouns
  { index: 0, circassian: 'сэ', pronunciation: 'seh', english: 'I', arabic: 'أنا', category: 'pronouns' },
  { index: 1, circassian: 'уэ', pronunciation: 'weh', english: 'you (singular)', arabic: 'أنتَ / أنتِ', category: 'pronouns' },
  { index: 2, circassian: 'ар', pronunciation: 'ar', english: 'he / she / it', arabic: 'هو / هي', category: 'pronouns' },
  { index: 3, circassian: 'дэ', pronunciation: 'deh', english: 'we', arabic: 'نحن', category: 'pronouns' },
  { index: 4, circassian: 'фэ', pronunciation: 'feh', english: 'you (plural)', arabic: 'أنتم', category: 'pronouns' },
  { index: 5, circassian: 'ахэр', pronunciation: 'ah-kher', english: 'they', arabic: 'هم', category: 'pronouns' },
  { index: 6, circassian: 'сэр', pronunciation: 'sehr', english: 'my', arabic: 'لي / خاصتي', category: 'pronouns' },
  { index: 7, circassian: 'уэр', pronunciation: 'wehr', english: 'your', arabic: 'لكَ / خاصتكَ', category: 'pronouns' },
  { index: 8, circassian: 'арэр', pronunciation: 'ah-rehr', english: 'his / her', arabic: 'لهُ / لها', category: 'pronouns' },
  { index: 9, circassian: 'сэри', pronunciation: 'seh-ree', english: 'mine', arabic: 'مِلكي', category: 'pronouns' },
  { index: 10, circassian: 'уэри', pronunciation: 'weh-ree', english: 'yours', arabic: 'مِلككَ', category: 'pronouns' },
  { index: 11, circassian: 'арри', pronunciation: 'ar-ree', english: 'theirs', arabic: 'مِلكهم', category: 'pronouns' },

  // 2. Operator Verbs (Core Verbs)
  { index: 12, circassian: 'кӏу', pronunciation: "k'oo", english: 'go', arabic: 'يذهب', category: 'core-verbs' },
  { index: 13, circassian: 'кӏэ', pronunciation: "k'eh", english: 'come', arabic: 'يأتي', category: 'core-verbs' },
  { index: 14, circassian: 'лъэ', pronunciation: 'lha', english: 'see', arabic: 'يرى', category: 'core-verbs' },
  { index: 15, circassian: 'щыӏэ', pronunciation: "sh'ee", english: 'have', arabic: 'يملك', category: 'core-verbs' },
  { index: 16, circassian: 'шӏо', pronunciation: "sh'oh", english: 'do', arabic: 'يفعل', category: 'core-verbs' },
  { index: 17, circassian: 'пэ', pronunciation: 'peh', english: 'give', arabic: 'يُعطي', category: 'core-verbs' },
  { index: 18, circassian: 'тэ', pronunciation: 'teh', english: 'take', arabic: 'يأخذ', category: 'core-verbs' },
  { index: 19, circassian: 'гъэ', pronunciation: 'ghah', english: 'say', arabic: 'يقول', category: 'core-verbs' },
  { index: 20, circassian: 'шӏу', pronunciation: "sh'oo", english: 'eat', arabic: 'يأكل', category: 'core-verbs' },
  { index: 21, circassian: 'фэ', pronunciation: 'feh', english: 'drink', arabic: 'يشرب', category: 'core-verbs' },
  { index: 22, circassian: 'щыс', pronunciation: 'shuhs', english: 'sit', arabic: 'يجلس', category: 'core-verbs' },
  { index: 23, circassian: 'тӏыс', pronunciation: "t'us", english: 'stand', arabic: 'يقف', category: 'core-verbs' },
  { index: 24, circassian: 'жъэ', pronunciation: 'zhah', english: 'run', arabic: 'يركض', category: 'core-verbs' },
  { index: 25, circassian: 'кӏэл', pronunciation: "k'el", english: 'walk', arabic: 'يمشي', category: 'core-verbs' },
  { index: 26, circassian: 'тхы', pronunciation: 'thuh', english: 'write', arabic: 'يكتب', category: 'core-verbs' },
  { index: 27, circassian: 'едж', pronunciation: 'ehj', english: 'read', arabic: 'يقرأ', category: 'core-verbs' },
  { index: 28, circassian: 'гъу', pronunciation: 'ghoo', english: 'call', arabic: 'يُنادي', category: 'core-verbs' },
  { index: 29, circassian: 'къы', pronunciation: 'qih', english: 'bring', arabic: 'يُحضر', category: 'core-verbs' },
  { index: 30, circassian: 'къэ', pronunciation: 'qeh', english: 'send', arabic: 'يُرسل', category: 'core-verbs' },
  { index: 31, circassian: 'щыт', pronunciation: "sh'it", english: 'live', arabic: 'يعيش', category: 'core-verbs' },
  { index: 32, circassian: 'шӏэн', pronunciation: "sh'en", english: 'make', arabic: 'يصنع', category: 'core-verbs' },

  // 3. People
  { index: 33, circassian: 'лъэпкъ', pronunciation: 'lhapk', english: 'people', arabic: 'ناس', category: 'people' },
  { index: 34, circassian: 'цӏыф', pronunciation: "ts'if", english: 'person', arabic: 'شخص', category: 'people' },
  { index: 35, circassian: 'лъы', pronunciation: 'lhuh', english: 'man', arabic: 'رجل', category: 'people' },
  { index: 36, circassian: 'пшъашъэ', pronunciation: 'psha-sheh', english: 'woman', arabic: 'امرأة', category: 'people' },
  { index: 37, circassian: 'сабый', pronunciation: 'sah-buy', english: 'child', arabic: 'طفل', category: 'people' },
  { index: 38, circassian: 'тхьамадэ', pronunciation: 'thah-ma-deh', english: 'elder', arabic: 'كبير / شيخ', category: 'people' },
  { index: 39, circassian: 'ныбджэгъу', pronunciation: 'nib-jeg-hoo', english: 'friend', arabic: 'صديق', category: 'people' },
  { index: 40, circassian: 'бжьанэ', pronunciation: 'bzha-neh', english: 'neighbor', arabic: 'جار', category: 'people' },
  { index: 41, circassian: 'псэлъыхъу', pronunciation: 'pse-luh-hoo', english: 'speaker', arabic: 'متحدّث', category: 'people' },
  { index: 42, circassian: 'хьакӏэ', pronunciation: 'ha-keh', english: 'guest', arabic: 'ضيف', category: 'people' },
  { index: 43, circassian: 'унагъо', pronunciation: 'oo-na-gho', english: 'host', arabic: 'مُضيف', category: 'people' },
  { index: 44, circassian: 'мэз', pronunciation: 'mez', english: 'husband', arabic: 'زوج', category: 'people' },
  { index: 45, circassian: 'гуащэ', pronunciation: 'gwah-sheh', english: 'wife', arabic: 'زوجة', category: 'people' },

  // 4. Family
  { index: 46, circassian: 'анэ', pronunciation: 'ah-neh', english: 'mother', arabic: 'أم', category: 'family' },
  { index: 47, circassian: 'атэ', pronunciation: 'ah-teh', english: 'father', arabic: 'أب', category: 'family' },
  { index: 48, circassian: 'шы', pronunciation: 'shih', english: 'son', arabic: 'ابن', category: 'family' },
  { index: 49, circassian: 'пшъашъ', pronunciation: 'pshash', english: 'daughter', arabic: 'ابنة', category: 'family' },
  { index: 50, circassian: 'шыпхъу', pronunciation: 'ship-hoo', english: 'brother', arabic: 'أخ', category: 'family' },
  { index: 51, circassian: 'шыпхъу пшъашъ', pronunciation: 'ship-hoo pshash', english: 'sister', arabic: 'أخت', category: 'family' },
  { index: 52, circassian: 'нана', pronunciation: 'nah-nah', english: 'grandmother', arabic: 'جدة', category: 'family' },
  { index: 53, circassian: 'нэнэ', pronunciation: 'neh-neh', english: 'grandfather', arabic: 'جدّ', category: 'family' },
  { index: 54, circassian: 'лъэпкъ ун', pronunciation: 'lhapk oon', english: 'family', arabic: 'عائلة', category: 'family' },

  // 5. Body
  { index: 55, circassian: 'шъхьэ', pronunciation: 'sh-hah', english: 'head', arabic: 'رأس', category: 'body' },
  { index: 56, circassian: 'нэ', pronunciation: 'neh', english: 'eye', arabic: 'عين', category: 'body' },
  { index: 57, circassian: 'жьы', pronunciation: 'zhuh', english: 'mouth', arabic: 'فم', category: 'body' },
  { index: 58, circassian: 'пкъ', pronunciation: 'pk', english: 'nose', arabic: 'أنف', category: 'body' },
  { index: 59, circassian: 'пхъэ', pronunciation: 'phah', english: 'hand', arabic: 'يد', category: 'body' },
  { index: 60, circassian: 'лъэ', pronunciation: 'lhah', english: 'leg', arabic: 'ساق', category: 'body' },
  { index: 61, circassian: 'жьы', pronunciation: 'zhuh', english: 'tongue', arabic: 'لسان', category: 'body' },
  { index: 62, circassian: 'гъу', pronunciation: 'ghoo', english: 'heart', arabic: 'قلب', category: 'body' },
  { index: 63, circassian: 'шъо', pronunciation: 'shoh', english: 'blood', arabic: 'دم', category: 'body' },

  // 6. Food and Drink
  { index: 64, circassian: 'пс', pronunciation: 'ps', english: 'water', arabic: 'ماء', category: 'food-drink' },
  { index: 65, circassian: 'тхьэ', pronunciation: 'thah', english: 'bread', arabic: 'خبز', category: 'food-drink' },
  { index: 66, circassian: 'шъу', pronunciation: 'shoo', english: 'food', arabic: 'طعام', category: 'food-drink' },
  { index: 67, circassian: 'жьыф', pronunciation: 'zhif', english: 'meat', arabic: 'لحم', category: 'food-drink' },
  { index: 68, circassian: 'псыхъу', pronunciation: 'psuh-hoo', english: 'soup', arabic: 'حساء', category: 'food-drink' },
  { index: 69, circassian: 'шъо пс', pronunciation: 'shoh ps', english: 'milk', arabic: 'حليب', category: 'food-drink' },
  { index: 70, circassian: 'жьыгъу', pronunciation: 'zhih-ghoo', english: 'cheese', arabic: 'جبن', category: 'food-drink' },
  { index: 71, circassian: 'фэд', pronunciation: 'fed', english: 'tea', arabic: 'شاي', category: 'food-drink' },
  { index: 72, circassian: 'къэпэ', pronunciation: 'qe-peh', english: 'coffee', arabic: 'قهوة', category: 'food-drink' },

  // 7. Nature
  { index: 73, circassian: 'мафэ', pronunciation: 'mah-feh', english: 'day', arabic: 'يوم', category: 'nature' },
  { index: 74, circassian: 'жъы', pronunciation: 'zhuh', english: 'night', arabic: 'ليل', category: 'nature' },
  { index: 75, circassian: 'пшъашъэ', pronunciation: 'psha-sheh', english: 'morning', arabic: 'صباح', category: 'nature' },
  { index: 76, circassian: 'жъогъо', pronunciation: 'zho-gho', english: 'evening', arabic: 'مساء', category: 'nature' },
  { index: 77, circassian: 'тхьэ', pronunciation: 'thah', english: 'sun', arabic: 'شمس', category: 'nature' },
  { index: 78, circassian: 'мазэ', pronunciation: 'mah-zeh', english: 'moon', arabic: 'قمر', category: 'nature' },
  { index: 79, circassian: 'псы', pronunciation: 'psuh', english: 'river', arabic: 'نهر', category: 'nature' },
  { index: 80, circassian: 'пс', pronunciation: 'ps', english: 'water', arabic: 'ماء', category: 'nature' },
  { index: 81, circassian: 'мэз', pronunciation: 'mez', english: 'forest', arabic: 'غابة', category: 'nature' },
  { index: 82, circassian: 'къушъхьэ', pronunciation: 'qoosh-hah', english: 'mountain', arabic: 'جبل', category: 'nature' },

  // 8. Places
  { index: 83, circassian: 'ун', pronunciation: 'oon', english: 'house', arabic: 'بيت', category: 'places' },
  { index: 84, circassian: 'хьэщӏэ', pronunciation: "hesh'eh", english: 'room', arabic: 'غرفة', category: 'places' },
  { index: 85, circassian: 'шъхьэ', pronunciation: 'sh-hah', english: 'place', arabic: 'مكان', category: 'places' },
  { index: 86, circassian: 'мэзы', pronunciation: 'meh-zuh', english: 'road', arabic: 'طريق', category: 'places' },
  { index: 87, circassian: 'гуп', pronunciation: 'goop', english: 'yard', arabic: 'فناء', category: 'places' },
  { index: 88, circassian: 'къалэ', pronunciation: 'qa-leh', english: 'village', arabic: 'قرية', category: 'places' },
  { index: 89, circassian: 'къалэ шъхьэ', pronunciation: 'qa-leh sh-hah', english: 'town', arabic: 'بلدة', category: 'places' },

  // 9. Time
  { index: 90, circassian: 'нобэ', pronunciation: 'noh-beh', english: 'now', arabic: 'الآن', category: 'time' },
  { index: 91, circassian: 'небжь', pronunciation: 'nebzh', english: 'today', arabic: 'اليوم', category: 'time' },
  { index: 92, circassian: 'гъогу', pronunciation: 'ghogh', english: 'tomorrow', arabic: 'غداً', category: 'time' },
  { index: 93, circassian: 'жьыбжь', pronunciation: 'zhuh-bzh', english: 'yesterday', arabic: 'أمس', category: 'time' },
  { index: 94, circassian: 'са', pronunciation: 'sah', english: 'hour', arabic: 'ساعة', category: 'time' },
  { index: 95, circassian: 'минут', pronunciation: 'mee-noot', english: 'minute', arabic: 'دقيقة', category: 'time' },
  { index: 96, circassian: 'илъэс', pronunciation: 'ee-luhs', english: 'year', arabic: 'سنة', category: 'time' },
  { index: 97, circassian: 'мазэ', pronunciation: 'mah-zeh', english: 'month', arabic: 'شهر', category: 'time' },

  // 10. Adjectives
  { index: 98, circassian: 'дахэ', pronunciation: 'da-heh', english: 'good', arabic: 'جيّد', category: 'adjectives' },
  { index: 99, circassian: 'фӏы', pronunciation: "f'ee", english: 'nice', arabic: 'لطيف', category: 'adjectives' },
  { index: 100, circassian: 'хъуэжъ', pronunciation: 'khwezh', english: 'bad', arabic: 'سيّئ', category: 'adjectives' },
  { index: 101, circassian: 'ин', pronunciation: 'een', english: 'big', arabic: 'كبير', category: 'adjectives' },
  { index: 102, circassian: 'цы', pronunciation: 'tsuh', english: 'small', arabic: 'صغير', category: 'adjectives' },
  { index: 103, circassian: 'кӏыхь', pronunciation: "k'ih", english: 'long', arabic: 'طويل', category: 'adjectives' },
  { index: 104, circassian: 'пэ', pronunciation: 'peh', english: 'short', arabic: 'قصير', category: 'adjectives' },
  { index: 105, circassian: 'лъагэ', pronunciation: 'lha-geh', english: 'tall', arabic: 'طويل القامة', category: 'adjectives' },
  { index: 106, circassian: 'бжьэ', pronunciation: 'bzheh', english: 'low', arabic: 'منخفض', category: 'adjectives' },
  { index: 107, circassian: 'гъашӏо', pronunciation: 'ghash-oh', english: 'fast', arabic: 'سريع', category: 'adjectives' },
  { index: 108, circassian: 'псыу', pronunciation: 'psuh-oo', english: 'slow', arabic: 'بطيء', category: 'adjectives' },
  { index: 109, circassian: 'пшъэшъэ', pronunciation: 'pshesh', english: 'new', arabic: 'جديد', category: 'adjectives' },
  { index: 110, circassian: 'къэзы', pronunciation: 'qeh-zuh', english: 'old', arabic: 'قديم', category: 'adjectives' },

  // 11. Question Words
  { index: 111, circassian: 'хэт', pronunciation: 'het', english: 'who', arabic: 'مَن', category: 'questions' },
  { index: 112, circassian: 'сыдэ', pronunciation: 'suh-deh', english: 'what', arabic: 'ماذا', category: 'questions' },
  { index: 113, circassian: 'тӏан', pronunciation: "t'an", english: 'where', arabic: 'أين', category: 'questions' },
  { index: 114, circassian: 'сыт', pronunciation: 'sut', english: 'why', arabic: 'لماذا', category: 'questions' },
  { index: 115, circassian: 'сыд', pronunciation: 'sud', english: 'how', arabic: 'كيف', category: 'questions' },
  { index: 116, circassian: 'тӏан ма', pronunciation: 'tan mah', english: 'when', arabic: 'متى', category: 'questions' },

  // 12. Numbers
  { index: 117, circassian: 'зы', pronunciation: 'zuh', english: 'one', arabic: 'واحد', category: 'numbers' },
  { index: 118, circassian: 'тӏу', pronunciation: "t'u", english: 'two', arabic: 'اثنان', category: 'numbers' },
  { index: 119, circassian: 'щы', pronunciation: 'shuh', english: 'three', arabic: 'ثلاثة', category: 'numbers' },
  { index: 120, circassian: 'плӏы', pronunciation: 'pluh', english: 'four', arabic: 'أربعة', category: 'numbers' },
  { index: 121, circassian: 'тфы', pronunciation: 'tfuh', english: 'five', arabic: 'خمسة', category: 'numbers' },
  { index: 122, circassian: 'хы', pronunciation: 'huh', english: 'six', arabic: 'ستة', category: 'numbers' },
  { index: 123, circassian: 'блы', pronunciation: 'bluh', english: 'seven', arabic: 'سبعة', category: 'numbers' },
  { index: 124, circassian: 'пшъы', pronunciation: 'pshuh', english: 'eight', arabic: 'ثمانية', category: 'numbers' },
  { index: 125, circassian: 'бгъу', pronunciation: 'bghoo', english: 'nine', arabic: 'تسعة', category: 'numbers' },
  { index: 126, circassian: 'пшӏы', pronunciation: "psh'uh", english: 'ten', arabic: 'عشرة', category: 'numbers' },

  // 13. Directions
  { index: 127, circassian: 'ипэ', pronunciation: 'ee-peh', english: 'front', arabic: 'أمام', category: 'directions' },
  { index: 128, circassian: 'ипащхьэ', pronunciation: 'ee-pash-hah', english: 'back', arabic: 'خلف', category: 'directions' },
  { index: 129, circassian: 'щхьэ', pronunciation: 'sh-hah', english: 'up', arabic: 'فوق', category: 'directions' },
  { index: 130, circassian: 'лъапэ', pronunciation: 'lha-peh', english: 'down', arabic: 'تحت', category: 'directions' },
  { index: 131, circassian: 'ипсэ', pronunciation: 'ee-pseh', english: 'inside', arabic: 'داخل', category: 'directions' },
  { index: 132, circassian: 'пшъэ', pronunciation: 'psheh', english: 'outside', arabic: 'خارج', category: 'directions' },

  // 14. Basic Words
  { index: 133, circassian: 'а', pronunciation: 'ah', english: 'and', arabic: 'و', category: 'basic-words' },
  { index: 134, circassian: 'ау', pronunciation: 'ow', english: 'but', arabic: 'لكن', category: 'basic-words' },
  { index: 135, circassian: 'мы', pronunciation: 'muh', english: 'not', arabic: 'ليس', category: 'basic-words' },
  { index: 136, circassian: 'е', pronunciation: 'yeh', english: 'yes', arabic: 'نعم', category: 'basic-words' },
  { index: 137, circassian: 'хъу', pronunciation: 'khoo', english: 'no', arabic: 'لا', category: 'basic-words' },
  { index: 138, circassian: 'арэ', pronunciation: 'ah-reh', english: 'also', arabic: 'أيضاً', category: 'basic-words' },
  { index: 139, circassian: 'рэ', pronunciation: 'reh', english: 'and (connector)', arabic: 'و (رابط)', category: 'basic-words' },

  // 15. Useful Verbs (Extended)
  { index: 140, circassian: 'къегъэ', pronunciation: 'qeh-ghah', english: 'answer', arabic: 'يُجيب', category: 'more-verbs' },
  { index: 141, circassian: 'щыжьы', pronunciation: "sh'izhuh", english: 'sleep', arabic: 'ينام', category: 'more-verbs' },
  { index: 142, circassian: 'шъу', pronunciation: 'shoo', english: 'cook', arabic: 'يطبخ', category: 'more-verbs' },
  { index: 143, circassian: 'къешъу', pronunciation: 'qeh-shoo', english: 'buy', arabic: 'يشتري', category: 'more-verbs' },
  { index: 144, circassian: 'тхьэ', pronunciation: 'thah', english: 'pay', arabic: 'يدفع', category: 'more-verbs' },
  { index: 145, circassian: 'гъэпсэ', pronunciation: 'ghep-seh', english: 'work', arabic: 'يعمل', category: 'more-verbs' },
  { index: 146, circassian: 'гъэлъэ', pronunciation: 'ghel-lha', english: 'watch', arabic: 'يُشاهد', category: 'more-verbs' },
  { index: 147, circassian: 'шӏагъэ', pronunciation: "sh'ah-ghah", english: 'build', arabic: 'يبني', category: 'more-verbs' },
  { index: 148, circassian: 'къэщыт', pronunciation: "qeh-sh'it", english: 'arrive', arabic: 'يصل', category: 'more-verbs' },

  // 16. Abstract Words
  { index: 149, circassian: 'гъогу', pronunciation: 'ghogh', english: 'way', arabic: 'طريقة', category: 'abstract' },
  { index: 150, circassian: 'гъэ', pronunciation: 'ghah', english: 'word', arabic: 'كلمة', category: 'abstract' },
  { index: 151, circassian: 'псэлъ', pronunciation: 'psehl', english: 'speech', arabic: 'كلام', category: 'abstract' },
  { index: 152, circassian: 'гуп', pronunciation: 'goop', english: 'group', arabic: 'مجموعة', category: 'abstract' },
  { index: 153, circassian: 'лъэпкъ', pronunciation: 'lhapk', english: 'nation', arabic: 'أمّة', category: 'abstract' },
  { index: 154, circassian: 'гъащӏэ', pronunciation: "ghash'eh", english: 'life', arabic: 'حياة', category: 'abstract' },

  // 17. Basic Expressions
  { index: 155, circassian: 'Сэ кӏу', pronunciation: "seh k'oo", english: 'I go', arabic: 'أنا أذهب', category: 'expressions' },
  { index: 156, circassian: 'Сэ пс фэ', pronunciation: 'seh ps feh', english: 'I drink water', arabic: 'أنا أشرب ماء', category: 'expressions' },
  { index: 157, circassian: 'Сэ уэ лъэ', pronunciation: 'seh weh lha', english: 'I see you', arabic: 'أنا أراك', category: 'expressions' },
  { index: 158, circassian: 'Уэ дахэ', pronunciation: 'weh da-heh', english: 'hello (friendly)', arabic: 'مرحباً', category: 'expressions' },
  { index: 159, circassian: 'Сэ дахэ', pronunciation: 'seh da-heh', english: 'I am well', arabic: 'أنا بخير', category: 'expressions' },
  { index: 160, circassian: 'Фэ дахэ', pronunciation: 'feh da-heh', english: 'you are well', arabic: 'أنتم بخير', category: 'expressions' },
];

export function getWordsByCategory(categoryId: string): Word[] {
  return words.filter(w => w.category === categoryId);
}

export function getWordByIndex(index: number): Word | undefined {
  return words.find(w => w.index === index);
}
