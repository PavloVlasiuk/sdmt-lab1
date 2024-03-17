import { MdValidator } from './md-validator';

export class MdParser {
  // create common pattern with capturing groups
  // replace /s/S with dot
  // add symbols : ; ! ? to the end of patterns
  private readonly fontsMarking = [
    {
      pattern: /(^|\s)\*\*((?=\S)[\s\S]*?(?=\S))\*\*([\s.,]|$)/g,
      marking: '**',
      startTag: '<b>',
      endTag: '</b>',
    },
    {
      pattern: /(^|\s)_((?=\S)[\s\S]*?(?=\S))_([\s.,]|$)/g,
      marking: '_',
      startTag: '<i>',
      endTag: '</i>',
    },
    {
      pattern: /(^|\s)`((?=\S)[\s\S]*?(?=\S))`([\s.,]|$)/g,
      marking: '`',
      startTag: '<tt>',
      endTag: '</tt>',
    },
  ];
  private readonly mdValidator = new MdValidator();

  parse (text: string) {
    const { formattedText, preformattedParts } = this.replacePreformattedText(text);

    const parsedParagraphs = this.parseParagraphs(formattedText);

    const parsedText = this.returnPreformattedText(parsedParagraphs, preformattedParts);

    return parsedText;
  }

  private replacePreformattedText (text: string): { formattedText: string, preformattedParts: Map<number, string> } {
    const preformattedParts: Map<number, string> = new Map();

    let index = 0;
    const formattedText = text.replace(/(?<=\s)```\n[\s\S]*?\n```(?=\s)/g, (match) => {
      const placeholder = `<pre>${index}</pre>`;
      preformattedParts.set(index, match.slice(3, -3));
      index++;
      return placeholder;
    });

    return { formattedText, preformattedParts };
  }

  private returnPreformattedText (indexedText: string, parts: Map<number, string>): string {
    const fullText = indexedText.replace(/<pre>\d+<\/pre>/g, (match) => {
      return match.replace(/\d+/, (match) => parts.get(+match)!);
    });

    return fullText;
  }

  private parseParagraphs (text: string): string {
    const paragraphs = text.split('\n\n');

    const parsedParagraphs = paragraphs
      .map((paragraph) => {
        const parsedParagraph = this.parseParagraph(paragraph);
        return `<p>${parsedParagraph}</p>`;
      })
      .join('\n');

    return parsedParagraphs;
  }

  private parseParagraph (paragraph: string): string {
    for (const font of this.fontsMarking) {
      if (!font.pattern.test(paragraph)) continue;

      paragraph = paragraph.replace(font.pattern, (match, startChar, textPart, endChar) => {
        return startChar + font.startTag + textPart + font.endTag + endChar;
      });
    }

    return paragraph;
  }
}