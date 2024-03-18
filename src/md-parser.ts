import { CORRECT_PATTERN } from './constants/regexes';
import { MdValidator } from './md-validator';

export class MdParser {
  private readonly fontsMarking = [
    {
      marking: '**',
      startTag: '<b>',
      endTag: '</b>',
    },
    {
      marking: '_',
      startTag: '<i>',
      endTag: '</i>',
    },
    {
      marking: '`',
      startTag: '<tt>',
      endTag: '</tt>',
    },
  ];
  private readonly mdValidator = new MdValidator();

  parse (text: string): string {
    const { paragraphsText, preformattedParts } = this.replacePreformattedText(text);

    const parsedParagraphs = this.parseParagraphs(paragraphsText);

    const parsedText = this.returnPreformattedText(parsedParagraphs, preformattedParts);

    return parsedText;
  }

  private replacePreformattedText (text: string): { paragraphsText: string, preformattedParts: Map<number, string> } {
    const preformattedParts: Map<number, string> = new Map();

    let index = 0;
    const paragraphsText = text.replace(/(?<=\s)```\n[\s\S]*?\n```(?=\s)/g, (match) => {
      const placeholder = `<pre>${index}</pre>`;
      preformattedParts.set(index, match.slice(3, -3));
      index++;
      return placeholder;
    });

    return { paragraphsText, preformattedParts };
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
    this.mdValidator.checkNesting(paragraph);
    this.mdValidator.checkIncomplete(paragraph);

    paragraph = paragraph.replace(CORRECT_PATTERN, (match, marking, textPart) => {
      const font = this.fontsMarking.find((f) => f.marking === marking);
      const parsedParagraph = font?.startTag + textPart + font?.endTag;
      return parsedParagraph;
    });

    return paragraph;
  }
}