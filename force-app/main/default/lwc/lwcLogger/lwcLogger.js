/* eslint-disable no-console */
const logger = (
    logOn = false,
    source = 'unspecified source',
    message,
    data,
) => {
    if (logOn) {
        try {
            if (data) {
                console.log(
                    `## LWC LOG ## + ${source}: ${message}`,
                    JSON.parse(JSON.stringify(data)),
                );
            } else {
                console.log(`## LWC LOG ## + ${source}: ${message}`);
            }
        } catch (e) {
            if (data) {
                console.log(`## LWC LOG ## + ${source}: ${message}`, data);
            } else {
                console.log(`## LWC LOG ## + ${source}: ${message}`);
            }
        }
    }
};

const logError = (
    logOn = false,
    source = 'unspecified source',
    message,
    data,
) => {
    if (logOn) {
        try {
            if (data) {
                console.log(
                    `## LWC LOG ## + ${source}: ${message}`,
                    JSON.parse(JSON.stringify(data)),
                );
            } else {
                console.log(`## LWC LOG ## + ${source}: ${message}`);
            }
        } catch (e) {
            if (data) {
                console.log(`## LWC LOG ## + ${source}: ${message}`, data);
            } else {
                console.log(`## LWC LOG ## + ${source}: ${message}`);
            }
        }
    }
};

export { logger, logError };