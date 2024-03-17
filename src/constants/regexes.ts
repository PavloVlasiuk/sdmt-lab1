export const CORRECT_PATTERN = /(^|\s)(?<marking>[*]{2}|[_`])((?=\S).*?(?=\S))\k<marking>([\s.,:;!?]|$)/g;

export const NESTED_PATTERNS = [
  /(?:^|\s)([*]{2}|[_`])\S.*?\s([*]{2}|[_`])\S.*?\S\2\s.*?\S\1(?:[\s.,:;!?]|$)/,
  /(?:^|\s)([*]{2}|[_`])([*]{2}|[_`])\S.*?\S\2\1(?:[\s.,:;!?]|$)/,
  /(^|\s)(?<outer>[*]{2}|[_`])(?=\S).*?((\s([*]{2}|[_`])\S)|(\S([*]{2}|[_`])\s)).*?(?<=\S)\k<outer>([\s.,:;!?]|$)/,
];

export const INCOMPLETE_PATTERNS = [
  /(?<!\*\*\S.*?)(?<=\S)\*\*(?=\s)/,
  /(?<=(^|\s))\*\*(?=\S)(?!.*?\S\*\*)/,
  /(?<!_\S.*?)(?<=\S)_(?=\s)/,
  /(?<=(^|\s))_(?=\S)(?!.*?\S_)/,
  /(?<!`\S.*?)(?<=\S)`(?=\s)/,
  /(?<=(^|\s))`(?=\S)(?!.*?\S`)/,
];