import { WebhookEvent } from "./types/event";

/**
 * "Borrowed" & adapted from Pogbot 
 * {@link https://github.com/GNosii/Pogbot/blob/bae67f1d9f7f694ecc19e5a1d5e6d05f2ce46ccc/src/object/Translator.ts#L24}
 */
function format(str: string, args?: Object): string;

export function getMessage(event: WebhookEvent): string;

export function getTitle(event: WebhookEvent): string;
