import "dotenv/config";
import {
  Client,
  GatewayIntentBits,
  Partials,
  Events,
  ChannelType,
  Message,
  GatewayReceivePayload,
  Interaction,
  REST,
  Routes,
} from "discord.js";
import { appendToFile } from "./diary/appendToFile";
import path from "path";
import { commandInputData, createModal } from "./standup/createModal";
import { submitModal } from "./standup/submitModal";

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN!;
const DISCORD_USER_ID = process.env.DISCORD_USER_ID!;
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID!;

const rest = new REST({ version: "10" }).setToken(DISCORD_BOT_TOKEN);
await rest.put(Routes.applicationCommands(DISCORD_CLIENT_ID), {
  body: [commandInputData.toJSON()],
});

const client = new Client({
  intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Channel, Partials.Message, Partials.User],
});

client.once(Events.ClientReady, (client: Client) => {
  if (!client.user) return;
  console.log(`Bot: ${client.user.tag}`);
});

client.on(Events.Raw, async (packet: GatewayReceivePayload) => {
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

client.on(Events.MessageCreate, async (message: Message) => {
  console.log(message);
  try {
    if (message.author.bot) return;
    if (message.author.id !== DISCORD_USER_ID) return;

    const messageContent = message.content.trim();
    const filePath = await appendToFile(messageContent);

    await message.reply(`Saved to ${path.basename(filePath)}`);
  } catch (error) {
    console.error(error);
    await message.reply("Failed to save message to file");
  }
});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (interaction.isChatInputCommand()) {
    switch (interaction.commandName) {
      case "standup":
        await createModal(interaction);
      default:
        interaction.reply("No such command");
    }
  }

  if (interaction.isModalSubmit()) {
    switch (interaction.customId) {
      case "standup-modal":
        await submitModal(interaction);
      default:
        interaction.reply("Failed to submit");
    }
  }
});

client.login(DISCORD_BOT_TOKEN);
