# Fun with AI by Mike Dimitrov

Webapp allowing you to interact with OpenAI's “text-curie-001” AI engine.

## Demo
There is a demo website that is accessible [here](https://funwithai-ba3c7.web.app). It contains the entire project.

## Table of Contents
This serves as a general guide for navigating the repository!

- [Getting Setup](#getting-setup)
- [API Key](#api-key)
- [Disclaimers](#disclaimers)
- [Credits](#credits)
- [License](#license)

## Getting Setup
This project assumes that you already have `Node ^14.17.6` & `npm ^6.14.15`. If you do not, please download them from [the official website](https://nodejs.org/en/download/)
Here are a couple of steps that you can follow to quickly get started with the project.

1. Clone the repository: `git clone https://github.com/mike1572/funwithai.git`
2. Install the project dependencies by running `npm install` inside the cloned directory
3. Run `npm start` to start your own local development environment! Alternatively, here are some more commands available:

| Commands        | Output
|-----------------|-------------------------------------------------------------------|
| `npm run build` | Creates a production-ready build of the project, ready for deployment |
| `npm update`    | Updates dependencies that require newer versions to keep functioning correctly|
| `serve -s`      | You *must* install serve (`npm install -g serve`) before running this command. This command makes the project accessible both locally and on your network, in the event that you want to test it on different devices or share it with your entourage.|

There are many more commands, which you can familiarise yourself with on the [Create a React App](https://create-react-app.dev/) website, or in [npm's](https://docs.npmjs.com/) documentation.

## API Key
In order to run the app, you would need an API key from [OpenAI](https://openai.com/api/). Once you have it generated, please create a file `src/api.js` where you would have your API key in a variable called `api`. Export that variable. Once that is done, restart the project and everything should work.

## Disclaimers
The app demo's api key will expire on August 11, 2022. You are also required to provide your own API key, as there will be none in the project. This is for privacy & security reasons.

## License
This project or parts of its code are licensed under AGPLv3. Furthermore, npm libraries are subject to their own copyright.
