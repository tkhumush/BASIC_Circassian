export interface Word {
  index: number;
  circassian: string;
  pronunciation: string;
  english: string;
  category: string;
}

export interface Category {
  name: string;
  id: string;
  emoji: string;
  color: string;
}

export const categories: Category[] = [
  { name: 'Pronouns', id: 'pronouns', emoji: '👤', color: '#FF6B6B' },
  { name: 'Core Verbs', id: 'core-verbs', emoji: '⚡', color: '#4ECDC4' },
  { name: 'People', id: 'people', emoji: '👥', color: '#45B7D1' },
  { name: 'Family', id: 'family', emoji: '🏠', color: '#96CEB4' },
  { name: 'Body', id: 'body', emoji: '🦴', color: '#FFEAA7' },
  { name: 'Food & Drink', id: 'food-drink', emoji: '🍞', color: '#DDA0DD' },
  { name: 'Nature', id: 'nature', emoji: '🌿', color: '#98D8C8' },
  { name: 'Places', id: 'places', emoji: '🏘️', color: '#F7DC6F' },
  { name: 'Time', id: 'time', emoji: '⏰', color: '#BB8FCE' },
  { name: 'Adjectives', id: 'adjectives', emoji: '🎨', color: '#F1948A' },
  { name: 'Questions', id: 'questions', emoji: '❓', color: '#85C1E9' },
  { name: 'Numbers', id: 'numbers', emoji: '🔢', color: '#82E0AA' },
  { name: 'Directions', id: 'directions', emoji: '🧭', color: '#F0B27A' },
  { name: 'Basic Words', id: 'basic-words', emoji: '📝', color: '#AED6F1' },
  { name: 'More Verbs', id: 'more-verbs', emoji: '🏃', color: '#D2B4DE' },
  { name: 'Abstract', id: 'abstract', emoji: '💭', color: '#A3E4D7' },
  { name: 'Expressions', id: 'expressions', emoji: '💬', color: '#FAD7A0' },
];

export const words: Word[] = [
  // 1. Pronouns
  { index: 0, circassian: 'сэ', pronunciation: 'seh', english: 'I', category: 'pronouns' },
  { index: 1, circassian: 'уэ', pronunciation: 'weh', english: 'you (singular)', category: 'pronouns' },
  { index: 2, circassian: 'ар', pronunciation: 'ar', english: 'he / she / it', category: 'pronouns' },
  { index: 3, circassian: 'дэ', pronunciation: 'deh', english: 'we', category: 'pronouns' },
  { index: 4, circassian: 'фэ', pronunciation: 'feh', english: 'you (plural)', category: 'pronouns' },
  { index: 5, circassian: 'ахэр', pronunciation: 'ah-kher', english: 'they', category: 'pronouns' },
  { index: 6, circassian: 'сэр', pronunciation: 'sehr', english: 'my', category: 'pronouns' },
  { index: 7, circassian: 'уэр', pronunciation: 'wehr', english: 'your', category: 'pronouns' },
  { index: 8, circassian: 'арэр', pronunciation: 'ah-rehr', english: 'his / her', category: 'pronouns' },
  { index: 9, circassian: 'сэри', pronunciation: 'seh-ree', english: 'mine', category: 'pronouns' },
  { index: 10, circassian: 'уэри', pronunciation: 'weh-ree', english: 'yours', category: 'pronouns' },
  { index: 11, circassian: 'арри', pronunciation: 'ar-ree', english: 'theirs', category: 'pronouns' },

  // 2. Operator Verbs (Core Verbs)
  { index: 12, circassian: 'кӏу', pronunciation: "k'oo", english: 'go', category: 'core-verbs' },
  { index: 13, circassian: 'кӏэ', pronunciation: "k'eh", english: 'come', category: 'core-verbs' },
  { index: 14, circassian: 'лъэ', pronunciation: 'lha', english: 'see', category: 'core-verbs' },
  { index: 15, circassian: 'щыӏэ', pronunciation: "sh'ee", english: 'have', category: 'core-verbs' },
  { index: 16, circassian: 'шӏо', pronunciation: "sh'oh", english: 'do', category: 'core-verbs' },
  { index: 17, circassian: 'пэ', pronunciation: 'peh', english: 'give', category: 'core-verbs' },
  { index: 18, circassian: 'тэ', pronunciation: 'teh', english: 'take', category: 'core-verbs' },
  { index: 19, circassian: 'гъэ', pronunciation: 'ghah', english: 'say', category: 'core-verbs' },
  { index: 20, circassian: 'шӏу', pronunciation: "sh'oo", english: 'eat', category: 'core-verbs' },
  { index: 21, circassian: 'фэ', pronunciation: 'feh', english: 'drink', category: 'core-verbs' },
  { index: 22, circassian: 'щыс', pronunciation: 'shuhs', english: 'sit', category: 'core-verbs' },
  { index: 23, circassian: 'тӏыс', pronunciation: "t'us", english: 'stand', category: 'core-verbs' },
  { index: 24, circassian: 'жъэ', pronunciation: 'zhah', english: 'run', category: 'core-verbs' },
  { index: 25, circassian: 'кӏэл', pronunciation: "k'el", english: 'walk', category: 'core-verbs' },
  { index: 26, circassian: 'тхы', pronunciation: 'thuh', english: 'write', category: 'core-verbs' },
  { index: 27, circassian: 'едж', pronunciation: 'ehj', english: 'read', category: 'core-verbs' },
  { index: 28, circassian: 'гъу', pronunciation: 'ghoo', english: 'call', category: 'core-verbs' },
  { index: 29, circassian: 'къы', pronunciation: 'qih', english: 'bring', category: 'core-verbs' },
  { index: 30, circassian: 'къэ', pronunciation: 'qeh', english: 'send', category: 'core-verbs' },
  { index: 31, circassian: 'щыт', pronunciation: "sh'it", english: 'live', category: 'core-verbs' },
  { index: 32, circassian: 'шӏэн', pronunciation: "sh'en", english: 'make', category: 'core-verbs' },

  // 3. People
  { index: 33, circassian: 'лъэпкъ', pronunciation: 'lhapk', english: 'people', category: 'people' },
  { index: 34, circassian: 'цӏыф', pronunciation: "ts'if", english: 'person', category: 'people' },
  { index: 35, circassian: 'лъы', pronunciation: 'lhuh', english: 'man', category: 'people' },
  { index: 36, circassian: 'пшъашъэ', pronunciation: 'psha-sheh', english: 'woman', category: 'people' },
  { index: 37, circassian: 'сабый', pronunciation: 'sah-buy', english: 'child', category: 'people' },
  { index: 38, circassian: 'тхьамадэ', pronunciation: 'thah-ma-deh', english: 'elder', category: 'people' },
  { index: 39, circassian: 'ныбджэгъу', pronunciation: 'nib-jeg-hoo', english: 'friend', category: 'people' },
  { index: 40, circassian: 'бжьанэ', pronunciation: 'bzha-neh', english: 'neighbor', category: 'people' },
  { index: 41, circassian: 'псэлъыхъу', pronunciation: 'pse-luh-hoo', english: 'speaker', category: 'people' },
  { index: 42, circassian: 'хьакӏэ', pronunciation: 'ha-keh', english: 'guest', category: 'people' },
  { index: 43, circassian: 'унагъо', pronunciation: 'oo-na-gho', english: 'host', category: 'people' },
  { index: 44, circassian: 'мэз', pronunciation: 'mez', english: 'husband', category: 'people' },
  { index: 45, circassian: 'гуащэ', pronunciation: 'gwah-sheh', english: 'wife', category: 'people' },

  // 4. Family
  { index: 46, circassian: 'анэ', pronunciation: 'ah-neh', english: 'mother', category: 'family' },
  { index: 47, circassian: 'атэ', pronunciation: 'ah-teh', english: 'father', category: 'family' },
  { index: 48, circassian: 'шы', pronunciation: 'shih', english: 'son', category: 'family' },
  { index: 49, circassian: 'пшъашъ', pronunciation: 'pshash', english: 'daughter', category: 'family' },
  { index: 50, circassian: 'шыпхъу', pronunciation: 'ship-hoo', english: 'brother', category: 'family' },
  { index: 51, circassian: 'шыпхъу пшъашъ', pronunciation: 'ship-hoo pshash', english: 'sister', category: 'family' },
  { index: 52, circassian: 'нана', pronunciation: 'nah-nah', english: 'grandmother', category: 'family' },
  { index: 53, circassian: 'нэнэ', pronunciation: 'neh-neh', english: 'grandfather', category: 'family' },
  { index: 54, circassian: 'лъэпкъ ун', pronunciation: 'lhapk oon', english: 'family', category: 'family' },

  // 5. Body
  { index: 55, circassian: 'шъхьэ', pronunciation: 'sh-hah', english: 'head', category: 'body' },
  { index: 56, circassian: 'нэ', pronunciation: 'neh', english: 'eye', category: 'body' },
  { index: 57, circassian: 'жьы', pronunciation: 'zhuh', english: 'mouth', category: 'body' },
  { index: 58, circassian: 'пкъ', pronunciation: 'pk', english: 'nose', category: 'body' },
  { index: 59, circassian: 'пхъэ', pronunciation: 'phah', english: 'hand', category: 'body' },
  { index: 60, circassian: 'лъэ', pronunciation: 'lhah', english: 'leg', category: 'body' },
  { index: 61, circassian: 'жьы', pronunciation: 'zhuh', english: 'tongue', category: 'body' },
  { index: 62, circassian: 'гъу', pronunciation: 'ghoo', english: 'heart', category: 'body' },
  { index: 63, circassian: 'шъо', pronunciation: 'shoh', english: 'blood', category: 'body' },

  // 6. Food and Drink
  { index: 64, circassian: 'пс', pronunciation: 'ps', english: 'water', category: 'food-drink' },
  { index: 65, circassian: 'тхьэ', pronunciation: 'thah', english: 'bread', category: 'food-drink' },
  { index: 66, circassian: 'шъу', pronunciation: 'shoo', english: 'food', category: 'food-drink' },
  { index: 67, circassian: 'жьыф', pronunciation: 'zhif', english: 'meat', category: 'food-drink' },
  { index: 68, circassian: 'псыхъу', pronunciation: 'psuh-hoo', english: 'soup', category: 'food-drink' },
  { index: 69, circassian: 'шъо пс', pronunciation: 'shoh ps', english: 'milk', category: 'food-drink' },
  { index: 70, circassian: 'жьыгъу', pronunciation: 'zhih-ghoo', english: 'cheese', category: 'food-drink' },
  { index: 71, circassian: 'фэд', pronunciation: 'fed', english: 'tea', category: 'food-drink' },
  { index: 72, circassian: 'къэпэ', pronunciation: 'qe-peh', english: 'coffee', category: 'food-drink' },

  // 7. Nature
  { index: 73, circassian: 'мафэ', pronunciation: 'mah-feh', english: 'day', category: 'nature' },
  { index: 74, circassian: 'жъы', pronunciation: 'zhuh', english: 'night', category: 'nature' },
  { index: 75, circassian: 'пшъашъэ', pronunciation: 'psha-sheh', english: 'morning', category: 'nature' },
  { index: 76, circassian: 'жъогъо', pronunciation: 'zho-gho', english: 'evening', category: 'nature' },
  { index: 77, circassian: 'тхьэ', pronunciation: 'thah', english: 'sun', category: 'nature' },
  { index: 78, circassian: 'мазэ', pronunciation: 'mah-zeh', english: 'moon', category: 'nature' },
  { index: 79, circassian: 'псы', pronunciation: 'psuh', english: 'river', category: 'nature' },
  { index: 80, circassian: 'пс', pronunciation: 'ps', english: 'water', category: 'nature' },
  { index: 81, circassian: 'мэз', pronunciation: 'mez', english: 'forest', category: 'nature' },
  { index: 82, circassian: 'къушъхьэ', pronunciation: 'qoosh-hah', english: 'mountain', category: 'nature' },

  // 8. Places
  { index: 83, circassian: 'ун', pronunciation: 'oon', english: 'house', category: 'places' },
  { index: 84, circassian: 'хьэщӏэ', pronunciation: "hesh'eh", english: 'room', category: 'places' },
  { index: 85, circassian: 'шъхьэ', pronunciation: 'sh-hah', english: 'place', category: 'places' },
  { index: 86, circassian: 'мэзы', pronunciation: 'meh-zuh', english: 'road', category: 'places' },
  { index: 87, circassian: 'гуп', pronunciation: 'goop', english: 'yard', category: 'places' },
  { index: 88, circassian: 'къалэ', pronunciation: 'qa-leh', english: 'village', category: 'places' },
  { index: 89, circassian: 'къалэ шъхьэ', pronunciation: 'qa-leh sh-hah', english: 'town', category: 'places' },

  // 9. Time
  { index: 90, circassian: 'нобэ', pronunciation: 'noh-beh', english: 'now', category: 'time' },
  { index: 91, circassian: 'небжь', pronunciation: 'nebzh', english: 'today', category: 'time' },
  { index: 92, circassian: 'гъогу', pronunciation: 'ghogh', english: 'tomorrow', category: 'time' },
  { index: 93, circassian: 'жьыбжь', pronunciation: 'zhuh-bzh', english: 'yesterday', category: 'time' },
  { index: 94, circassian: 'са', pronunciation: 'sah', english: 'hour', category: 'time' },
  { index: 95, circassian: 'минут', pronunciation: 'mee-noot', english: 'minute', category: 'time' },
  { index: 96, circassian: 'илъэс', pronunciation: 'ee-luhs', english: 'year', category: 'time' },
  { index: 97, circassian: 'мазэ', pronunciation: 'mah-zeh', english: 'month', category: 'time' },

  // 10. Adjectives
  { index: 98, circassian: 'дахэ', pronunciation: 'da-heh', english: 'good', category: 'adjectives' },
  { index: 99, circassian: 'фӏы', pronunciation: "f'ee", english: 'nice', category: 'adjectives' },
  { index: 100, circassian: 'хъуэжъ', pronunciation: 'khwezh', english: 'bad', category: 'adjectives' },
  { index: 101, circassian: 'ин', pronunciation: 'een', english: 'big', category: 'adjectives' },
  { index: 102, circassian: 'цы', pronunciation: 'tsuh', english: 'small', category: 'adjectives' },
  { index: 103, circassian: 'кӏыхь', pronunciation: "k'ih", english: 'long', category: 'adjectives' },
  { index: 104, circassian: 'пэ', pronunciation: 'peh', english: 'short', category: 'adjectives' },
  { index: 105, circassian: 'лъагэ', pronunciation: 'lha-geh', english: 'tall', category: 'adjectives' },
  { index: 106, circassian: 'бжьэ', pronunciation: 'bzheh', english: 'low', category: 'adjectives' },
  { index: 107, circassian: 'гъашӏо', pronunciation: 'ghash-oh', english: 'fast', category: 'adjectives' },
  { index: 108, circassian: 'псыу', pronunciation: 'psuh-oo', english: 'slow', category: 'adjectives' },
  { index: 109, circassian: 'пшъэшъэ', pronunciation: 'pshesh', english: 'new', category: 'adjectives' },
  { index: 110, circassian: 'къэзы', pronunciation: 'qeh-zuh', english: 'old', category: 'adjectives' },

  // 11. Question Words
  { index: 111, circassian: 'хэт', pronunciation: 'het', english: 'who', category: 'questions' },
  { index: 112, circassian: 'сыдэ', pronunciation: 'suh-deh', english: 'what', category: 'questions' },
  { index: 113, circassian: 'тӏан', pronunciation: "t'an", english: 'where', category: 'questions' },
  { index: 114, circassian: 'сыт', pronunciation: 'sut', english: 'why', category: 'questions' },
  { index: 115, circassian: 'сыд', pronunciation: 'sud', english: 'how', category: 'questions' },
  { index: 116, circassian: 'тӏан ма', pronunciation: 'tan mah', english: 'when', category: 'questions' },

  // 12. Numbers
  { index: 117, circassian: 'зы', pronunciation: 'zuh', english: 'one', category: 'numbers' },
  { index: 118, circassian: 'тӏу', pronunciation: "t'u", english: 'two', category: 'numbers' },
  { index: 119, circassian: 'щы', pronunciation: 'shuh', english: 'three', category: 'numbers' },
  { index: 120, circassian: 'плӏы', pronunciation: 'pluh', english: 'four', category: 'numbers' },
  { index: 121, circassian: 'тфы', pronunciation: 'tfuh', english: 'five', category: 'numbers' },
  { index: 122, circassian: 'хы', pronunciation: 'huh', english: 'six', category: 'numbers' },
  { index: 123, circassian: 'блы', pronunciation: 'bluh', english: 'seven', category: 'numbers' },
  { index: 124, circassian: 'пшъы', pronunciation: 'pshuh', english: 'eight', category: 'numbers' },
  { index: 125, circassian: 'бгъу', pronunciation: 'bghoo', english: 'nine', category: 'numbers' },
  { index: 126, circassian: 'пшӏы', pronunciation: "psh'uh", english: 'ten', category: 'numbers' },

  // 13. Directions
  { index: 127, circassian: 'ипэ', pronunciation: 'ee-peh', english: 'front', category: 'directions' },
  { index: 128, circassian: 'ипащхьэ', pronunciation: 'ee-pash-hah', english: 'back', category: 'directions' },
  { index: 129, circassian: 'щхьэ', pronunciation: 'sh-hah', english: 'up', category: 'directions' },
  { index: 130, circassian: 'лъапэ', pronunciation: 'lha-peh', english: 'down', category: 'directions' },
  { index: 131, circassian: 'ипсэ', pronunciation: 'ee-pseh', english: 'inside', category: 'directions' },
  { index: 132, circassian: 'пшъэ', pronunciation: 'psheh', english: 'outside', category: 'directions' },

  // 14. Basic Words
  { index: 133, circassian: 'а', pronunciation: 'ah', english: 'and', category: 'basic-words' },
  { index: 134, circassian: 'ау', pronunciation: 'ow', english: 'but', category: 'basic-words' },
  { index: 135, circassian: 'мы', pronunciation: 'muh', english: 'not', category: 'basic-words' },
  { index: 136, circassian: 'е', pronunciation: 'yeh', english: 'yes', category: 'basic-words' },
  { index: 137, circassian: 'хъу', pronunciation: 'khoo', english: 'no', category: 'basic-words' },
  { index: 138, circassian: 'арэ', pronunciation: 'ah-reh', english: 'also', category: 'basic-words' },
  { index: 139, circassian: 'рэ', pronunciation: 'reh', english: 'and (connector)', category: 'basic-words' },

  // 15. Useful Verbs (Extended)
  { index: 140, circassian: 'къегъэ', pronunciation: 'qeh-ghah', english: 'answer', category: 'more-verbs' },
  { index: 141, circassian: 'щыжьы', pronunciation: "sh'izhuh", english: 'sleep', category: 'more-verbs' },
  { index: 142, circassian: 'шъу', pronunciation: 'shoo', english: 'cook', category: 'more-verbs' },
  { index: 143, circassian: 'къешъу', pronunciation: 'qeh-shoo', english: 'buy', category: 'more-verbs' },
  { index: 144, circassian: 'тхьэ', pronunciation: 'thah', english: 'pay', category: 'more-verbs' },
  { index: 145, circassian: 'гъэпсэ', pronunciation: 'ghep-seh', english: 'work', category: 'more-verbs' },
  { index: 146, circassian: 'гъэлъэ', pronunciation: 'ghel-lha', english: 'watch', category: 'more-verbs' },
  { index: 147, circassian: 'шӏагъэ', pronunciation: "sh'ah-ghah", english: 'build', category: 'more-verbs' },
  { index: 148, circassian: 'къэщыт', pronunciation: "qeh-sh'it", english: 'arrive', category: 'more-verbs' },

  // 16. Abstract Words
  { index: 149, circassian: 'гъогу', pronunciation: 'ghogh', english: 'way', category: 'abstract' },
  { index: 150, circassian: 'гъэ', pronunciation: 'ghah', english: 'word', category: 'abstract' },
  { index: 151, circassian: 'псэлъ', pronunciation: 'psehl', english: 'speech', category: 'abstract' },
  { index: 152, circassian: 'гуп', pronunciation: 'goop', english: 'group', category: 'abstract' },
  { index: 153, circassian: 'лъэпкъ', pronunciation: 'lhapk', english: 'nation', category: 'abstract' },
  { index: 154, circassian: 'гъащӏэ', pronunciation: "ghash'eh", english: 'life', category: 'abstract' },

  // 17. Basic Expressions
  { index: 155, circassian: 'Сэ кӏу', pronunciation: "seh k'oo", english: 'I go', category: 'expressions' },
  { index: 156, circassian: 'Сэ пс фэ', pronunciation: 'seh ps feh', english: 'I drink water', category: 'expressions' },
  { index: 157, circassian: 'Сэ уэ лъэ', pronunciation: 'seh weh lha', english: 'I see you', category: 'expressions' },
  { index: 158, circassian: 'Уэ дахэ', pronunciation: 'weh da-heh', english: 'hello (friendly)', category: 'expressions' },
  { index: 159, circassian: 'Сэ дахэ', pronunciation: 'seh da-heh', english: 'I am well', category: 'expressions' },
  { index: 160, circassian: 'Фэ дахэ', pronunciation: 'feh da-heh', english: 'you are well', category: 'expressions' },
];

export function getWordsByCategory(categoryId: string): Word[] {
  return words.filter(w => w.category === categoryId);
}

export function getWordByIndex(index: number): Word | undefined {
  return words.find(w => w.index === index);
}
