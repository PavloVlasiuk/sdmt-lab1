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

  parse (text: string) {
    const { formattedText, preformattedParts } = this.replacePreformattedText(text);

    const parsedParagraphs = this.parseParagraphs(formattedText);

    const readyText = this.returnPreformattedText(parsedParagraphs, preformattedParts);

    return readyText;
  }

  private replacePreformattedText (text: string): { formattedText: string, preformattedParts: Map<number, string> } {
    const preformattedParts: Map<number, string> = new Map();

    let index = 0;
    const formattedText = text.replace(/```[\s\S]*?```/g, (match) => {
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
      if (!paragraph.includes(font.marking)) continue;

      paragraph = paragraph
        .split(font.marking)
        .map((part, index) => {
          const replacement = font.startTag + part + font.endTag;
          return index % 2 ? replacement : part; 
        })
        .join('');
    }

    return paragraph;
  }
}