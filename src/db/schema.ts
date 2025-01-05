import { relations } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const chat = sqliteTable('chat', {
  id: int().primaryKey({ autoIncrement: true }),
  telegramId: int().notNull(),
  rulesMessage: text(),
});

export const userInChat = sqliteTable('user_in_chat', {
  id: int().primaryKey({ autoIncrement: true }),
  chatId: int()
    .notNull()
    .references(() => chat.id),
  telegramId: int().notNull(),
});

export const userInChatRelations = relations(userInChat, ({ one }) => ({
  chat: one(chat, {
    fields: [userInChat.chatId],
    references: [chat.id],
  }),
}));
