import "dotenv/config";
import {
  Client,
  GatewayIntentBits,
  Partials,
  Events,
  ChannelType,
} from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Channel, Partials.Message, Partials.User],
});

client.on(Events.Raw, async (packet) => {
  if (packet.t !== "MESSAGE_CREATE") return;
  if (packet.d.channel_type !== ChannelType.DM) return;

  const data = packet.d;

  // skips bot message, this is to avoid infinite loop
  if (data.author?.bot) return;

  try {
    // fetch the channel so discord.js caches it
    const channel = await client.channels.fetch(data.channel_id);

    if (!channel || channel.type !== ChannelType.DM) return;
    console.log(`DM from ${data.author.username}: ${data.content}`);

    await channel.send("Got your message!");
  } catch (error) {
    console.error("Failed to fetch DM channel:", error);
  }
});

client.once(Events.ClientReady, (client) => {
  console.log(`Bot: ${client.user.tag}`);
});

client.login(process.env.DISCORD_BOT_TOKEN);
