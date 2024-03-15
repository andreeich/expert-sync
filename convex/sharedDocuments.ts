import { v } from "convex/values";

import { mutation, query, QueryCtx } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

import { getUser } from "./_utils";

export const getSharedDocuments = query({
  handler: async (ctx) => {
    const user = await getUser(ctx);

    const sharedDocumentsIds = await ctx.db
      .query("sharedDocuments")
      .withIndex("by_user", (q) => q.eq("userTokenId", user.tokenIdentifier))
      .collect();
    const sharedDocuments = await Promise.all(
      sharedDocumentsIds.map(async (doc) => {
        return await ctx.db.get<"documents">(doc.documentId);
      })
    );

    return sharedDocuments;
  },
});

export const addSharedDocumentById = mutation({
  args: {
    documentId: v.id("documents"),
    userTokenId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    const document = await ctx.db.get<"documents">(args.documentId);

    if (!document) {
      throw new Error("Document not found");
    }

    if (user.tokenIdentifier !== document.userTokenId) {
      throw new Error("Not authorized");
    }

    if (user.tokenIdentifier === args.userTokenId) {
      throw new Error("You can't share the document with yourself");
    }

    const sharedDocument = await ctx.db.insert("sharedDocuments", {
      documentId: args.documentId,
      userTokenId: args.userTokenId,
    });

    return sharedDocument;
  },
});

export const addSharedDocumentByEmail = mutation({
  args: {
    documentId: v.id("documents"),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    const document = await ctx.db.get<"documents">(args.documentId);

    if (!document) {
      throw new Error("Document not found");
    }

    if (user.tokenIdentifier !== document.userTokenId) {
      throw new Error("Not authorized");
    }

    if (user.email === args.email) {
      throw new Error("You can't share the document with yourself");
    }

    const member = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (!member) {
      throw new Error("User not found");
    }

    const sharedDocument = await ctx.db.insert("sharedDocuments", {
      documentId: args.documentId,
      userTokenId: member.tokenIdentifier,
    });

    return sharedDocument;
  },
});

export const removeSharedDocument = mutation({
  args: {
    documentId: v.id("documents"),
    userTokenId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    const document = await ctx.db.get<"documents">(args.documentId);

    if (!document) {
      throw new Error("Document not found");
    }

    const sharedDocument = await ctx.db
      .query("sharedDocuments")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .unique();

    if (!sharedDocument) {
      throw new Error("Document not shared");
    }

    if (
      user.tokenIdentifier !== document.userTokenId &&
      sharedDocument.userTokenId !== user.tokenIdentifier
    ) {
      throw new Error("Not authorized");
    }

    const removed = await ctx.db.delete(sharedDocument._id);

    return removed;
  },
});
