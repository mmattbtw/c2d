const { getTitle, getMessage } = require("./messages");

addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    if (request.method === "POST") {
        const path = new URL(request.url).pathname;

        const data = await request.json();

        let embeds = [];

        /**
         * @type {import("./types/embed").DiscordEmbed}
         */
        let embed = buildEmbed();

        if (data.events === undefined) {
            embed.author.name = 'The awesome people at ' + data.event.project;
            embed.url = getProjectUrl(data.events[0].project);
            embed.title = getTitle(data.event.event)
            embed.description = getMessage(data.event.event, data.event)
            embed.footer.text = "Sent by c2d"
            console.debug("Event object:", JSON.stringify(data.event));
            embeds.push(embed);
        } else {
            if (data.events.length <= 1) {
                embed.author.name = 'The awesome people at ' + data.events[0].project;
                embed.url = getProjectUrl(data.events[0].project);
                embed.title = getTitle(data.events[0].event)
                embed.description = getMessage(data.events[0].event, data.events[0])
                embed.footer.text = "Sent by c2d"
                console.debug("Event object:", JSON.stringify(data.events[0]));
                embeds.push(embed);
            } else {
                embed.author.name = 'The awesome people at ' + data.events[0].project;
                embed.url = getProjectUrl(data.events[0].project);
                embed.title = 'Latest events';
                embed.footer.text = "Sent by c2d";
                data.events.forEach(event => {
                    console.debug("Event object:", JSON.stringify(event));
                    embed.fields.push({ name: getTitle(event.event), value: getMessage(event.event, event) });
                });
                embeds.push(embed);
            }
        }

        sendWebhook(path, embeds);

        return new Response("OK", { status: 200 });
    }
    return new Response("Resource Not Found", { status: 404 });
}

/**
 * @param {WebhookEvent} crowdin 
 * @returns {string}
 */
function getProjectUrl(project) {
    return `https://crowdin.com/project/${project}`
}

/**
 * @param {string} path
 * @param {DiscordEmbed[]} embeds
 */
async function sendWebhook(path, embeds) {
    const data = {
        username: "Crowdin",
        avatar_url: "https://support.crowdin.com/assets/logos/crowdin-dark-symbol.png",
        embeds: embeds
    };

    console.debug(JSON.stringify(data));
    
    fetch(`https://discordapp.com/api/webhooks${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => 
        console.log(res.text())
    ).catch((err) => {
        console.error(err.toString());
    });
}

function buildEmbed() {
    /**
     * @type {import("./types/embed").DiscordEmbed}
     */
    let content = {
        title: null,
        description: null,
        url: null,
        timestamp: new Date(Date.now()).toISOString(),
        color: null,
        footer: {
            text: null,
            icon_url: null
        },
        image: {
            url: null
        },
        thumbnail: {
            url: null
        },
        author: {
            name: null,
            url: null,
            icon_url: null
        },
        fields: []
    }

    return content;
}
