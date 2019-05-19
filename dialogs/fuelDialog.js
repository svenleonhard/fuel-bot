const {
    ChoiceFactory,
    ChoicePrompt,
    ComponentDialog,
    ConfirmPrompt,
    DialogSet,
    DialogTurnStatus,
    NumberPrompt,
    TextPrompt,
    WaterfallDialog
} = require('botbuilder-dialogs');

const { UserFuelInformation } = require('../userFuelInformation');
const CHOICE_PROMPT = 'CHOICE_PROMPT';
const CONFIRM_PROMPT = 'CONFIRM_PROMPT';
const NAME_PROMPT = 'NAME_PROMPT';
const NUMBER_PROMPT = 'NUMBER_PROMPT';
const USER_FUEL_INFORMATION = 'USER_FUEL_INFORMATION';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

const fs = require('fs');

let rawdata = fs.readFileSync('./fuel-api/apiKeys.json');  
let apiKeys = JSON.parse(rawdata);  

const { FuelApi } = require("../fuel-api");
const fuelApi = new FuelApi(apiKeys);

class FuelDialog extends ComponentDialog {

    constructor(userState, logger) {
        super('fuelDialog');

        this.userFuelInformation = userState.createProperty(USER_FUEL_INFORMATION);

        this.logger = logger;

        this.addDialog(new TextPrompt(NAME_PROMPT));
        this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));
        this.addDialog(new NumberPrompt(NUMBER_PROMPT, this.agePromptValidator));

        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.transportStep.bind(this),
            this.nameStep.bind(this),
            this.nameConfirmStep.bind(this),
            this.ageStep.bind(this),
            this.summaryStep.bind(this)
        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    /**
     * The run method handles the incoming activity (in the form of a TurnContext) and passes it through the dialog system.
     * If no dialog is active, it will start the default dialog.
     * @param {*} turnContext
     * @param {*} accessor
     */
    async run(turnContext, accessor) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);

        const dialogContext = await dialogSet.createContext(turnContext);
        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }


    }

    async transportStep(step) {
        // WaterfallStep always finishes with the end of the Waterfall or with another dialog; here it is a Prompt Dialog.
        // Running a prompt here means the next WaterfallStep will be run when the users response is received.
        return await step.prompt(CHOICE_PROMPT, {
            prompt: 'Please enter fuel type',
            choices: ChoiceFactory.toChoices(['E5', 'E10', 'Diesel'])
        });
    }

    async nameStep(step) {
        step.values.fuelType = step.result.value;
        return await step.prompt(NAME_PROMPT, `Where are you right now?`);
    }

    async nameConfirmStep(step) {

        step.values.city = step.result;

        // We can send messages to the user at any point in the WaterfallStep.
        // await step.context.sendActivity(`Thanks ${ step.result }.`);

        // WaterfallStep always finishes with the end of the Waterfall or with another dialog; here it is a Prompt Dialog.
        return await step.prompt(CONFIRM_PROMPT, 'Do you want to specify a maximum distance?', ['Yes', 'No']);
    }

    async ageStep(step) {
        if (step.result) {
            // User said "yes" so we will be prompting for the age.
            // WaterfallStep always finishes with the end of the Waterfall or with another dialog, here it is a Prompt Dialog.
            const promptOptions = { prompt: 'What is your maximum distance', retryPrompt: 'The value entered must be greater than 0 and less than 150.' };

            return await step.prompt(NUMBER_PROMPT, promptOptions);
        } else {
            // User said "no" so we will skip the next step. Give -1 as the age.
            return await step.next(-1);
        }
    }

    async summaryStep(step) {

        if (step.result) {
            step.values.distance = step.result;

            // Get the current profile object from user state.
            const userFuelInformation = await this.userFuelInformation.get(step.context, new UserFuelInformation());

            userFuelInformation.fuelType = step.values.fuelType;
            userFuelInformation.city = step.values.city;
            userFuelInformation.distance = step.values.distance;

            if (step.values.distance === -1) {
                step.values.distance = 10;
                await step.context.sendActivity('No maximum distance given.');
            }
            else {
                await step.context.sendActivity(`I have your maximum distance as ${step.values.distance} km.`);
            }

            const fuelApiResult = await fuelApi.getCheapestGasStation(userFuelInformation.city, userFuelInformation.fuelType.toLowerCase(), userFuelInformation.distance);
            console.log("#####");
            console.log(fuelApiResult);

            await step.context.sendActivity("empty");
        }
        else {
            await step.context.sendActivity("There was someting wrong with your maximum distance. Please try again");
        }

        // WaterfallStep always finishes with the end of the Waterfall or with another dialog, here it is the end.
        return await step.endDialog();
    }

    async agePromptValidator(promptContext) {
        // This condition is our validation rule. You can also change the value at this point.
        return promptContext.recognized.succeeded && promptContext.recognized.value > 0 && promptContext.recognized.value < 150;
    }
}

module.exports.FuelDialog = FuelDialog;