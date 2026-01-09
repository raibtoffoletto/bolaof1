import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import {
  AllCommands,
  COMMAND_DESCRIPTIONS,
  COMMAND_OPTIONS,
  COMMANDS,
} from './constants';

const commands = AllCommands.map((cmd) => {
  const builder = new SlashCommandBuilder()
    .setName(COMMANDS[cmd])
    .setDescription(COMMAND_DESCRIPTIONS[COMMANDS[cmd]]);

  if (!!COMMAND_OPTIONS[COMMANDS[cmd]]) {
    for (const [option, description] of COMMAND_OPTIONS[COMMANDS[cmd]]) {
      builder.addStringOption((op) =>
        op.setName(option).setDescription(description).setRequired(true),
      );
    }
  }

  return builder.toJSON();
});

const rest = new REST({ version: '10' }).setToken(`${process.env.DISCORD_BOT_TOKEN}`);

export default async function registerCommands(guildId: string) {
  try {
    await rest.put(
      Routes.applicationGuildCommands(`${process.env.DISCORD_CLIENT_ID}`, guildId),
      { body: commands },
    );

    console.log(`[registerCommands] Commands registered for guild <${guildId}>.`);
  } catch (error: any) {
    console.error(`[registerCommands]: ${error.message}`);

    throw new Error(`Failed to register commands for guild ${guildId}`);
  }
}
