import { FileManager } from './file-manager';
import { MdParser } from './md-parser';

function main () {
  const inputArgs = process.argv.slice(2);
  const outOptions = ['-o', '--out'];
  const mdParser = new MdParser();

  try {
    const markdownText = FileManager.read(inputArgs[0]);
    const parsedText = mdParser.parse(markdownText);

    if (inputArgs[1]) {
      outOptions.includes(inputArgs[1]) ? FileManager.write(inputArgs[2], parsedText) : (() => {
        throw new Error('Invalid command'); 
      })();
      return;
    }

    console.log(parsedText);

  } catch (error: any) {
    const e = error as Error;
    console.error(`Error: ${e.message}`);
    process.exit(1);
  }
}

main();
