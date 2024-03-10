import { v } from "convex/values";

import { mutation, query, QueryCtx } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { send } from "process";

const checkIdentity = async (ctx: QueryCtx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Not authenticated");
  }

  const userEmail = identity.email;

  if (!userEmail) {
    throw new Error("Unauthorized");
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_email", (q) => q.eq("email", userEmail))
    ?.first();

  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
};

export const getMessagesByDocument = query({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const user = await checkIdentity(ctx);

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .collect();

    const formattedMessages = await Promise.all(
      messages.map(async (message) => {
        const user = await ctx.db.get<"users">(message.userId);
        const content = message.content;
        return {
          _id: message._id,
          user,
          content,
        };
      })
    );

    return formattedMessages;
  },
});

export const sendMessages = mutation({
  args: {
    documentId: v.id("documents"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await checkIdentity(ctx);

    const message = await ctx.db.insert("messages", {
      documentId: args.documentId,
      userId: user._id,
      content: args.content,
    });

    return message;
  },
});
