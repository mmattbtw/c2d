export type WebhookEvent = {
    event: string,
    project: string,
    project_id: number,

    file?: string,
    file_id?: number,

    user?: string
    user_id?: number

    string_id?: number,
    string_identifier?: string,
    string_context?: string
}