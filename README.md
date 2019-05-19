# Fuel Bot
This is a basic example of a bot using Microsoft Bot Framework. It is possible to get the lowest petrol prices in a city. Therefore a specially developed API in form of a node.js package is used. It is also part of this repository and combines the petrol price API Tankerkönig and the geo API OpenCage Geocoding.

This bot has been created using [Bot Framework][1].

## Prerequisites
- [Node.js][4] version 8.5 or higher
- API Key from [Tankerkönig][12]
- API Key from [OpenCage][13]

## First steps
- Determine node version
```bash
node --version
```
- Create a new folder in which the bot should be placed (e.g. fuel-api)
- Install Yeoman, a tool that can be used to generate a microsoft bot automatically
    ```bash
    npm install -g yo generator-botbuilder
    ```
- Generate an empty bot
    ```bash
   yo botbuilder
    ```
- Copy the files from this repository into the folder of the bot you generated before. All files, htat already exist can be replaced. The initial generation only ensures the availability of filese igonored by git.
- Install modules
    ```bash
    npm install
- Switch to the folder `fuel-api`, which you have just copied into the root folder of your bot. Open a terminal within this folder and install node module `node-fetch`
- Create a json file called `apiKeys.json` within `fuel-api` directory and insert your API keys (See example below)
    ```bash
    {
    "geoApi": xxxxxxxxxxxxxxxxxxxxxxx",
    "fuelApi": "xxxxxxxxxxxxxxxxxxxxxxxx"
    }
    ```
    
# To run the bot
- Start the bot
    ```bash
    npm start
    ```

# Testing the bot using Bot Framework Emulator **v4**
[Bot Framework Emulator][5] is a desktop application that allows bot developers to test and debug their bots on localhost or running remotely through a tunnel.

- Install the Bot Framework Emulator version 4.2.0 or greater from [here][6]

## Connect to the bot using Bot Framework Emulator **v4**
- Launch Bot Framework Emulator
- File -> Open Bot Configuration
- Navigate to `fuel-bot` folder
- Select `fuel-bot.bot` file

# Deploy the bot to Azure
This bot was generated using the Empty bot template.  Unmodified, it's not practical to deploy an empty bot to Azure, as it doesn't have any conversational behavior yet.
After making modifications to the bot and testing it locally, you can deploy it to Azure to make it accessible from anywhere.
To learn how, see [Deploy your bot to Azure][40] for a complete set of deployment instructions.

# Further reading
- [Bot Framework Documentation][20]
- [Bot Basics][32]
- [Azure Bot Service Introduction][21]
- [Azure Bot Service Documentation][22]
- [Deploy Your Bot to Azure][40]
- [Azure CLI][7]
- [msbot CLI][9]
- [Azure Portal][10]
- [Language Understanding using LUIS][11]
- [Restify][30]

[1]: https://dev.botframework.com
[2]: https://www.typescriptlang.org
[3]: https://www.typescriptlang.org/#download-links
[4]: https://nodejs.org
[5]: https://github.com/microsoft/botframework-emulator
[6]: https://github.com/Microsoft/BotFramework-Emulator/releases
[7]: https://docs.microsoft.com/cli/azure/?view=azure-cli-latest
[8]: https://docs.microsoft.com/cli/azure/install-azure-cli?view=azure-cli-latest
[9]: https://github.com/Microsoft/botbuilder-tools/tree/master/packages/MSBot
[10]: https://portal.azure.com
[11]: https://www.luis.ai
[20]: https://docs.botframework.com
[21]: https://docs.microsoft.com/azure/bot-service/bot-service-overview-introduction?view=azure-bot-service-4.0
[22]: https://docs.microsoft.com/azure/bot-service/?view=azure-bot-service-4.0
[30]: https://www.npmjs.com/package/restify
[32]: https://docs.microsoft.com/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0
[40]: https://aka.ms/azuredeployment
[41]: ./PREREQUISITES.md
[12]: https://creativecommons.tankerkoenig.de/
[13]: https://opencagedata.com/api
