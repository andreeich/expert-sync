import { v } from "convex/values";

import { mutation, query, QueryCtx } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

import { getUser } from "./_utils";

export const getAllDocumentHistoryById = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    const document = await ctx.db.get(args.documentId);

    if (!document) {
      throw new Error("Not found");
    }

    if (document.userTokenId !== user.tokenIdentifier) {
      throw new Error("Unauthorized");
    }

    const documentHistory = await ctx.db
      .query("documentHistory")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .collect();

    return documentHistory;
  },
});

export const getHistoryById = query({
  args: { documentHistoryId: v.id("documentHistory") },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    const documentHistory = await ctx.db.get(args.documentHistoryId);

    if (!documentHistory) {
      throw new Error("Not found");
    }

    const document = await ctx.db.get(documentHistory.documentId);

    if (!document) {
      throw new Error("Not found");
    }

    if (document.userTokenId !== user.tokenIdentifier) {
      throw new Error("Unauthorized");
    }

    return documentHistory;
  },
});

export const addDocumentHistory = mutation({
  args: { documentId: v.id("documents"), content: v.string() },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    const document = await ctx.db.get(args.documentId);

    if (!document) {
      throw new Error("Not found");
    }

    // if (document.userTokenId !== user.tokenIdentifier) {
    //   throw new Error("Unauthorized");
    // }

    const documentHistory = await ctx.db
      .query("documentHistory")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .collect();

    if (documentHistory.length > 5) {
      await ctx.db.delete(documentHistory[0]._id);
    }

    await ctx.db.insert("documentHistory", {
      documentId: args.documentId,
      content: args.content,
      createdBy: user.name,
      timestamp: Date.now(),
    });
  },
});
