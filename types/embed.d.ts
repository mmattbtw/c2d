export type DiscordEmbed = {
    title: string,
    description?: string,
    url?: string,
    timestamp?: string,
    color: string,
    footer: {
        text: string,
        icon_url: string
    }
    image: {
        url: string
    }
    thumbnail: {
        url: string
    }
    author: {
        name: string,
        url: string,
        icon_url: string
    },
    fields?: DiscordField[]
}

type DiscordField = {
    name: string,
    value: string,
    inline: boolean
}
