import {
  CommandInteraction,
  LabelBuilder,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

export const commandInputData = new SlashCommandBuilder()
  .setName("standup")
  .setDescription("Input your today's update");

export const createModal = async (interaction: CommandInteraction) => {
  const modal = new ModalBuilder()
    .setCustomId("standup-modal")
    .setTitle("Log Event");

  const todayInput = new TextInputBuilder()
    .setCustomId("today-input")
    .setPlaceholder("What did you today?")
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(true);
  const todayLabel = new LabelBuilder()
    .setLabel("Today")
    .setTextInputComponent(todayInput);

  const learningInput = new TextInputBuilder()
    .setCustomId("learning-input")
    .setPlaceholder("What did you learn?")
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(true);
  const learningLabel = new LabelBuilder()
    .setLabel("Learning")
    .setTextInputComponent(learningInput);

  const keywordsInput = new TextInputBuilder()
    .setCustomId("keywords-input")
    .setPlaceholder("Keywords")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);
  const keywordsLabel = new LabelBuilder()
    .setLabel("Keywords")
    .setTextInputComponent(keywordsInput);

  const tagsInput = new TextInputBuilder()
    .setCustomId("tags-input")
    .setPlaceholder("Tags")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);
  const tagsLabel = new LabelBuilder()
    .setLabel("Tags")
    .setTextInputComponent(tagsInput);

  modal.addLabelComponents([
    todayLabel,
    learningLabel,
    keywordsLabel,
    tagsLabel,
  ]);

  await interaction.showModal(modal);
};
