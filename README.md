# Markdown to HTML parser
This is an application that parses markdown language into HTML. It was written with Typescript and Node.js. If you want to install and launch this app you will need Node.js to be installed on your computer

## Installation guide
Firstly, clone the repository:
```bash
git clone https://github.com/PavloVlasiuk/sdmt-lab1
```
Then move to the project directory:
```bash
cd sdmt-lab1
```
Install dependencies:
```bash
npm install
```
Finnaly, you can run the application by using the command:
```bash
npm run start
```
or
```bash
npx tsc
node dist/main.js
```

## Usage guide
You can use the application by running:
```bash
npm run start -- <input_file> [-o, --out] <output_file.html>
```
or
```bash
npx tsc
node dist/main.js <input_file> [-o, --out] <output_file.html>
```
If you want to write the result into output file you will not need to create that file, the application will create a directory called 'parsedFiles' in the root and all your out files will be located there.

If you do not specify the option for output file it will display the result in the console. 

**You can test my application with markdown files from directory called markdown**

Sample of usage:
```bash
npm run start -- markdown/regexes.md --out regexes.html
```

## Revert commit
[Click here](https://github.com/PavloVlasiuk/sdmt-lab1/commit/351ff1a1e171e84744139b60ec5eefb55c25edd7)