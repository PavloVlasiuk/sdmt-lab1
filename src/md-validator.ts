import { INCOMPLETE_PATTERNS, NESTED_PATTERNS } from './constants/regexes';

export class MdValidator {
  checkNesting (text: string) {
    const errorMessage = 'Invalid markdown *nested marking*'; 
    
    for (const regex of NESTED_PATTERNS) {
      if (text.includes('<pre>')) {
        text.split(/<pre>\d+<\/pre>/).find((part) => {
          if (regex.test(part)) throw new Error(errorMessage);
        });
        continue;
      }

      if (regex.test(text)) throw new Error(errorMessage);
    }
  }

  checkIncomplete (text: string) {
    const errorMessage = 'Invalid markdown *incomplete marking*';

    for (const regex of INCOMPLETE_PATTERNS) {
      if (text.includes('<pre>')) {
        text.split(/<pre>\d+<\/pre>/).find((part) => {
          if (regex.test(part)) throw new Error(errorMessage);
        });
        continue;
      }

      if (regex.test(text)) throw new Error(errorMessage);
    }
  }
}