import "dotenv/config";
import {
  Client,
  GatewayIntentBits,
  Partials,
  Events,
  ChannelType,
} from "discord.js";
import { appendToFile } from "./appendToFile";
import path from "path";

const client = new Client({
  intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Channel, Partials.Message, Partials.User],
});

client.on(Events.Raw, async (packet) => {
  if (packet.t !== "MESSAGE_CREATE") return;
  const data = packet.d;

  // skips bot message, this is to avoid infinite loop
  if (data.author.bot) return;
  try {
    // fetch the channel so discord.js caches it
    const channel = await client.channels.fetch(data.channel_id);

    if (!channel || channel.type !== ChannelType.DM) return;
    console.log(`DM from ${data.author.username}: ${data.content}`);

    // await channel.send("Got your message!");
  } catch (error) {
    console.error("Failed to fetch DM channel:", error);
  }
});

client.on(Events.MessageCreate, async (message) => {
  console.log(message);
  try {
    if (message.author.bot) return;
    if (message.author.id !== process.env.DISCORD_USER_ID) return;

    const messageContent = message.content.trim();
    const filePath = await appendToFile(messageContent);

    await message.reply(`Saved to ${path.basename(filePath)}`);
  } catch (error) {
    console.error(error);
    await message.reply("Failed to save message to file");
  }
});

client.once(Events.ClientReady, (client) => {
  console.log(`Bot: ${client.user.tag}`);
});

client.login(process.env.DISCORD_BOT_TOKEN);
