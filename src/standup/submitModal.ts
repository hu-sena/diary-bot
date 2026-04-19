import { MessageFlags, ModalSubmitInteraction } from "discord.js";
import { createLearningNotes } from "./createLearningNotes";
import { formatNotes } from "./formatNotes";
import { writeNotes } from "./writeNotes";

export const submitModal = async (interaction: ModalSubmitInteraction) => {
  await interaction.deferReply({ flags: MessageFlags.Ephemeral });

  const today = interaction.fields.getTextInputValue("today-input");
  const learning = interaction.fields.getTextInputValue("learning-input");

  const keywordsList = interaction.fields
    .getTextInputValue("keywords-input")
    .split(", ")
    .map((keyword) => keyword.trim());

  const tagsList = interaction.fields
    .getTextInputValue("tags-input")
    .split(", ")
    .map((tag) => tag.trim());

  await interaction.editReply("Researching and building learning notes...");

  const researchedNotes = await createLearningNotes({
    keywords: keywordsList,
    learning,
  });

  const formattedNotes = await formatNotes({
    today,
    learning,
    keywords: keywordsList,
    tags: tagsList,
    researchNotes: researchedNotes,
  });

  await writeNotes(formattedNotes);

  await interaction.editReply("Daily Standup Logged!");
};
