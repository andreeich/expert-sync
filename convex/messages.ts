import { v } from "convex/values";

import { mutation, query, QueryCtx } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

import { getUser } from "./_utils";

export const getMessagesByDocument = query({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .collect();

    const formattedMessages = await Promise.all(
      messages.map(async (message) => {
        const user = await ctx.db
          .query("users")
          .withIndex("by_token", (q) => q.eq("tokenIdentifier", message.userTokenId))
          .unique();
        const content = message.content;

        if (!message.parentMessageId) {
          return {
            _id: message._id,
            user,
            content,
          };
        } else {
          const parentMessage = await ctx.db.get(message.parentMessageId);

          if (!parentMessage) {
            throw new Error("Parent message not found!");
          }

          const parentMessageUser = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", parentMessage.userTokenId))
            .unique();
          return {
            _id: message._id,
            user,
            content,
            parentMessage: {
              _id: parentMessage._id,
              user: parentMessageUser,
              content: parentMessage.content,
            },
          };
        }
      }),
    );

    return formattedMessages;
  },
});

export const sendMessages = mutation({
  args: {
    documentId: v.id("documents"),
    content: v.string(),
    parentMessageId: v.optional(v.id("messages")),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    if (args.parentMessageId) {
      const parentMessage = ctx.db.get(args.parentMessageId);
      if (!parentMessage) throw new Error("Parent message not found!");
    }

    const message = await ctx.db.insert("messages", {
      documentId: args.documentId,
      userTokenId: user.tokenIdentifier,
      content: args.content,
      parentMessageId: args.parentMessageId,
    });

    return message;
  },
});
