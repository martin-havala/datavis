# medium-website-crawling

Simple example code to crawl a certain website for specific HTML elements and get their value

#### Getting started

```
### Install all modules
npm install

### Start crawling
npm run dev
```

#### NPM Commands

Using the below command substituting `XXX` in `npm run XXX`.

| Command         | Effect        |
| -------------   | ------------- | 
| `clean`         | Delete `dist` folder | 
| `build`         | Trigger a clean build | 
| `start`         | Start the program using the output from `npm run build` ( -> `dist/index.js`)      |
| `dev`           | Directly start the program via the TypeScript files, without transpiling, using `ts-node-dev` |
| `lint`          | Run `eslint` on all TypeScript files under `src`      |
| `lint:write`    | Run `eslint` and fix all TypeScript files under `src`      | 