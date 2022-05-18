const titles = {
    "file.translated": "File translated",
    "file.approved": "File approved",
    "file.updated": "File updated",
    "file.added": "File added",
    "file.reverted": "File reverted",
    "project.translated": "Language fully translated",
    "project.approved": "Language fully approved",
    "project.built": "Project built",
    "translation.updated": "Translation updated",
    "suggestion.added": "Suggestion added",
    "suggestion.updated": "Suggestion updated",
    "suggestion.deleted": "Suggestion deleted",
    "suggestion.approved": "Suggestion approved",
    "suggestion.disapproved": "Suggestion disapproved",
    "string.added": "String added",
    "string.deleted": "String deleted",
    "string.updated": "String updated",
    "task.added": "Task added",
    "task.statusChanged": "Task status changed",
    "task.deleted": "Task deleted"
}

const messages = {
    "file.updated":"**{user}** updated `{file}` ➡️",
    "file.translated": "`{file}` is fully translated! 🥳",
    "file.approved": "`{file}` is fully approved! 🥳",
    "file.added": "`{file}` was added! ✅",
    "file.reverted": "`{file}` was reverted! ⬅️",
    "project.translated": "`{project}` is fully translated into `{language}`! 🥳",
    "project.built": "`{project}` was built! 🏗️",
    "project.approved": "`{project}` ``{language}`` translation is fully approved! 🥳",
    "translation.updated": "**{user}** updated an translation in `{file}` ➡️",
    "suggestion.added": "**{user}** added an suggestion to `{language}` in `{file}` ✅",
    "suggestion.updated": "**{user}** updated an suggestion from `{language}` in `{file}` ➡️",
    "suggestion.deleted": "**{user}** deleted an suggestion from `{language}` in `{file}` 🟥",
    "suggestion.approved": "**{user}** approved an suggestion from `{language}` in `{file}` 👍",
    "suggestion.disapproved":  "**{user}** disapproved an suggestion for `{language}` in `{file}` 👎",
    "string.added": "**{user}** added {string_identifier} to `{project}` ✅",
    "string.updated": "**{user}** updated {string_identifier} in `{project}` ➡️",
    "string.deleted": "**{user}** deleted {string_identifier} from `{project}` 🟥",
    "task.added": "Task **#{task_id}** was added by **{user}** 📝",
    "task.statusChanged": "Task **#{task_id}** was updated from **\"{old_status}\"** to **\"{new_status}\"** by **{user}** 📝",
    "task.deleted": "Task **#{task_id}** was deleted by **{user}** 📝"
}

function format(str, args) {
    if (args) {
        for (key in args) {
            str = str.replace(new RegExp('\\{' + key + '\\}', 'gi'), args[key]);
        }
    }
    return str;
}

function getMessage(key, event) {
    console.debug('GetMessage', key)
    return format(messages[key], event);
}

function getTitle(key) {
    console.debug('GetTitle', key)
    return titles[key];
}

export {
    getMessage,
    getTitle
}

