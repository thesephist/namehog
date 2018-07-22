#!/usr/bin/env node

const { validate } = require('../index.js');

// options
const cliOptions = {
    usernameValue: null,
    simplePrint: false, // controlled with the --simple flag
}

// get CLI args
const cliArguments = process.argv.slice(2);
if (cliArguments.includes('--simple')) {
    cliOptions.simplePrint = true;
    cliArguments.splice(cliArguments.indexOf('--simple'), 1);
}
cliOptions.usernameValue = cliArguments[0];

// Main process, wrapped in an IIFE because of top-level await calls
(async function () {

    if (typeof cliOptions.usernameValue === 'string') {
        try {
            const usernameAvailable = await validate(cliOptions.usernameValue);
            const { valid, message } = usernameAvailable;

            if (cliOptions.simplePrint) {
                console.log(+valid);
            } else {
                console.log(message);
            }

        } catch (error) {
            console.error(error);
        }
    } else {
        console.error('Please enter a valid username to check!');
    }

})();
