import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import { COMMAND_DESCRIPTIONS, COMMANDS } from './constants';

const commands = Object.keys(COMMANDS).map((cmd) =>
  new SlashCommandBuilder()
    .setName(COMMANDS[cmd])
    .setDescription(COMMAND_DESCRIPTIONS[COMMANDS[cmd]])
    .toJSON(),
);

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
