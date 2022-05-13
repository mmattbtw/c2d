addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    if (request.method === "POST") {
        const path = new URL(request.url).pathname;

        /**
         * @type { WebhookEvent | { events: Array<WebhookEvent> } }
         */
        const data = await request.json();

        /**
         * @type { string[] }
         */
        let content = [];

        //content.push('```json\n' + JSON.stringify(data) + '```');

        if (data.events === undefined) {
            content.push('>>> **' + getTitle(data.event) + '** @ ' + data.project);
            content.push(getMessage(data.event, data));
        } else {
            content.push('>>> **Latest events** @ ' + data.events[0].project);
            data.events.forEach(element => {
                content.push("• " + getMessage(element.event, element));
            });
        }

        // Results in odd date, better leave it for later.
        //content.push(`<t:${Date.now().valueOf()}:F>`);

        sendWebhook(path, content.join("\n"));

        return new Response('OK', { status: 200 });
    }
    return new Response('Resource Not Found', { status: 404 });
}

/**
 * @param {string} event 
 * @returns {string}
*/
function getTitle(event) {
    switch (event) {
        case 'file.translated':
            return 'File translated'
        case 'file.approved':
            return 'File approved'
        case 'file.updated':
            return 'File updated'
        case 'project.translated':
            return 'Language fully translated'
        case 'project.approved':
            return 'Language fully approved'
        case 'translation.updated':
            return 'Translation updated'
        case 'suggestion.added':
            return 'Suggestion added'
        case 'suggestion.updated':
            return 'Suggestion updated'
        case 'suggestion.deleted':
            return 'Suggestion deleted'
        case 'suggestion.approved':
            return 'Suggestion approved'
        case 'suggestion.disapproved':
            return 'Suggestion disapproved'
        case 'string.added':
            return 'String added'
        case 'string.deleted':
            return 'String deleted'
        case 'string.updated':
            return 'String updated'
        default:
            return event
    }
}

/**
 * @param {string} eventType 
 * @param {WebhookEvent} event 
 * @returns {string}
 */
function getMessage(eventType, event) {
    switch (eventType) {
        case 'file.updated':
            return `File ${getFileUrl(event)} translation updated by ${event.user}`
        case 'file.translated':
            return `File ${getFileUrl(event)} fully translated`
        case 'file.approved':
            return `File ${getFileUrl(event)} fully approved`
        case 'project.translated':
            return `All strings translated into \`${event.language}\` in ${getProjectUrl(event)}`
        case 'project.approved':
            return `All strings approved into \`${event.language}\` in ${getProjectUrl(event)}`
        case 'translation.updated':
            return `Translation in \`${event.language}\` updated by ${event.user} in ${getFileUrl(event)}`
        case 'suggestion.added':
            return `Suggestion in \`${event.language}\` added by ${event.user} in ${getFileUrl(event)}`
        case 'suggestion.updated':
            return `Suggestion in \`${event.language}\` updated by ${event.user} in ${getFileUrl(event)}`
        case 'suggestion.deleted':
            return `Suggestion in \`${event.language}\` deleted by ${event.user} in ${getFileUrl(event)}`
        case 'suggestion.approved':
            return `Suggestion in \`${event.language}\` approved by ${event.user} in ${getFileUrl(event)}`
        case 'suggestion.disapproved':
            return `Suggestion in \`${event.language}\` disapproved by ${event.user} in ${getFileUrl(event)}`
        case 'string.added':
            return `Source string **${event.string_identifier}** added to ${getProjectUrl(event)} by ${event.user}`
        case 'string.deleted':
            return `Source string **${event.string_identifier}** deleted from ${getProjectUrl(event)} by ${event.user}`
        case 'string.updated':
            return `Source string **${event.string_identifier}** updated in ${getProjectUrl(event)} by ${event.user}`
        default:
            return `Unknown event \`${eventType}\``
    }
}


/**
 * @param {WebhookEvent} crowdin 
 * @returns {string} 
 */
function getFileUrl(crowdin) {
    if (crowdin.language !== undefined)
        return `<https://crowdin.com/translate/${crowdin.project}/${crowdin.file_id}/en-${crowdin.language.replace('-', '').toLowerCase()}>`
    else
        return `<https://crowdin.com/translate/${crowdin.project}/${crowdin.file_id}>`
}

/**
 * @param {WebhookEvent} crowdin 
 * @returns {string}
 */
function getProjectUrl(crowdin) {
    return `<https://crowdin.com/project/${crowdin.project}>`
}

/**
 * @param {string} path
 * @param {string} content
 */
async function sendWebhook(path, content) {
    const data = {
        username: 'Crowdin Events 🌐',
        avatar_url: 'https://support.crowdin.com/assets/logos/crowdin-dark-symbol.png',
        content: content
    };

    fetch(`https://discordapp.com/api/webhooks${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}
