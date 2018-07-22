const https = require('https');

/**
 * @async
 * Procedure to make the request and check.
 * 
 * @param {string} usernameValue - username to check for
 * 
 * @returns {Promise} response body, as Buffer
 */
const getAvailabilityResponse = async (usernameValue) => {
    const checkRequestOptions = {
        hostname: 'twitter.com',
        port: 443,
        path: `/users/username_available?username=${usernameValue}`,
        method: 'GET',
    };

    return new Promise((resolve, reject) => {
        const request = https.request(checkRequestOptions, response => {
            response.on('data', data => {
                const responseBody = data;
                resolve(responseBody);
            });
        });

        request.on('error', err => {
            process.stderr.write(err);
            reject(new Error(err))
        });

        // send request here, after all handlers have been attached
        request.end();
    });
};

/**
 * 
 * @param {string} usernameValue - username to check for availability
 * 
 * @return {Promise} - availability information from Twitter API as a JSON
 */
const checkUsername = async (usernameValue) => {
    const responseBody = await getAvailabilityResponse(usernameValue);
    // this might throw a parse error, but I'm okay with that bubbling up to the top-level try-catch
    const responseObject = JSON.parse(responseBody); // parsing from Buffer
    
    const { valid, msg } = responseObject;
    return {
        valid: valid,
        message: msg,
    };
}

module.exports = {
    validate: checkUsername,
};
