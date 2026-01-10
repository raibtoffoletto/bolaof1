import type { Message, OmitPartialGroupDMChannel } from 'discord.js';
import INSTANCES from '../data/repos/instances';

export default async function onMessageCreate(
  message: OmitPartialGroupDMChannel<Message>,
) {
  const instance = INSTANCES.get(message.guild?.id || '');

  if (!instance) {
    return;
  }

  if (message.channel.id !== instance.channelId || message.author.bot) {
    return;
  }

  await message.delete();
}
