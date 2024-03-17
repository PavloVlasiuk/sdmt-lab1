import { INCOMPLETE_PATTERNS, NESTED_PATTERNS } from './constants/regexes';

export class MdValidator {
  checkNesting (text: string): void {
    const errorMessage = 'Invalid markdown *nested marking*'; 
    
    this.checkTextByRegexes(text, NESTED_PATTERNS, errorMessage);
  }

  checkIncomplete (text: string): void {
    const errorMessage = 'Invalid markdown *incomplete marking*';

    this.checkTextByRegexes(text, INCOMPLETE_PATTERNS, errorMessage);
  }

  private checkTextByRegexes (text: string, regexes: RegExp[], errorMessage: string): void {
    for (const regex of regexes) {
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