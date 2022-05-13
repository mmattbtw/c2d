<p align="center">
  <img src="https://svgshare.com/i/Nb1.svg" height="80"/>
  <h1 align="center">c2d</h1>
</p>

**c2d** sends your Crowdin events to a Discord channel, no hosting or servers required! Simply point a Crowdin webhook to it and you're good to go!

## About this fork
**c2d is a fork of [crowdin-discord-webhooks](https://github.com/SwitchbladeBot/crowdin-discord-webhooks)**, including but not limited to:
- Unsupported event types
- Bundled webhooks not working at all
- Odd formatting sometimes
- No profile picture
- No way of self-deploying to CF Workers

## Setup
1. Deploy yourself: <br>
[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/GNosii/c2d)<br>
2. Create a Discord Webhook in the channel you want to receive your events in and copy its URL
3. Replace `https://discordapp.com/api/webhooks` with your worker's base route, and save it temporarily somewhere like notepad
4. Go to your Crowdin Project settings, and navigate to the "API & Webhooks" tab
5. Click _"Add Webhook"_  and configure it like so:
    - **Name** can be whatever you want
    - Paste the Webhook URL from Step 2 on the **URL** field
    - Set the **Request Method** to `POST`
    - Set the **Content Type** to `application/json`
    - Select what events you want to be notified about
6. Click _"Test"_ on the right panel to check if your webhook is working
7. Click _"Add"_ and you should be good to go!

