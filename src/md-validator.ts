export class MdValidator {
  checkNesting (text: string) {
    const errorMessage = 'Invalid markdown *nested marking*'; 

    const nestedPatternRegexes = [
      /(?:^|\s)([*]{2}|[_`])\S.*?\s([*]{2}|[_`])\S[\s\S]*?\S\2\s[\s\S]*?\S\1(?:[\s.,:;!?]|$)/,
      /(?:^|\s)([*]{2}|[_`])([*]{2}|[_`])\S.*?\S\2\1(?:[\s.,:;!?]|$)/,
      /(^|\s)(?<outer>[*]{2}|[_`])(?=\S).*?((\s([*]{2}|[_`])\S)|(\S([*]{2}|[_`])\s)).*?(?<=\S)\k<outer>([\s.,:;!?]|$)/,
    ];
    
    for (const regex of nestedPatternRegexes) {
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
    const incompletePatternRegexes = [
      /(?<!\*\*\S[\s\S]*?)(?<=\S)\*\*(?=\s)/,
      /(?<=(^|\s))\*\*(?=\S)(?![\s\S]*?\S\*\*)/,
      /(?<!_\S[\s\S]*?)(?<=\S)_(?=\s)/,
      /(?<=(^|\s))_(?=\S)(?![\s\S]*?\S_)/,
      /(?<!`\S[\s\S]*?)(?<=\S)`(?=\s)/,
      /(?<=(^|\s))`(?=\S)(?![\s\S]*?\S`)/,
    ];

    for (const regex of incompletePatternRegexes) {
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