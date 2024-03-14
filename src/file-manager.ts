import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';

export class FileManager {
  static read (path: string): string {
    if (!path) throw new Error('Input file is not specified');
    if (!existsSync(path)) throw new Error('Input file path is incorrect');

    const content = readFileSync(path, 'utf-8');

    return content;
  }

  static write (filename: string, content: string): void {
    if (!filename) throw new Error('Output filename is not specified');

    const fileExtension = filename.split('.')[1];
    const htmlExtension = 'html';

    if (fileExtension !== htmlExtension) throw new Error('Invalid extension of output file');

    const outputDir = './parsedFiles/';

    this.createDirIfNotExists(outputDir);
    
    writeFileSync(outputDir + filename, content);
  }

  private static createDirIfNotExists (dir: string) {
    if (!existsSync(dir)) mkdirSync(dir);
  }
}