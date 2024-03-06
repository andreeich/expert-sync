import { v } from "convex/values";

import { mutation, query, QueryCtx } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

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

export const getSharedDocuments = query({
  handler: async (ctx) => {
    const user = await checkIdentity(ctx);

    const sharedDocumentsIds = await ctx.db
      .query("sharedDocuments")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
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
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await checkIdentity(ctx);

    const document = await ctx.db.get<"documents">(args.documentId);

    if (!document) {
      throw new Error("Document not found");
    }

    if (user._id !== document.userId) {
      throw new Error("Not authorized");
    }

    const sharedDocument = await ctx.db.insert("sharedDocuments", {
      documentId: args.documentId,
      userId: args.userId,
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
    const user = await checkIdentity(ctx);

    const document = await ctx.db.get<"documents">(args.documentId);

    if (!document) {
      throw new Error("Document not found");
    }

    if (user._id !== document.userId) {
      throw new Error("Not authorized");
    }

    const member = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      ?.first();

    if (!member) {
      throw new Error("User not found");
    }

    const sharedDocument = await ctx.db.insert("sharedDocuments", {
      documentId: args.documentId,
      userId: member._id,
    });

    return sharedDocument;
  },
});

export const removeSharedDocument = mutation({
  args: {
    documentId: v.id("documents"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await checkIdentity(ctx);

    const document = await ctx.db.get<"documents">(args.documentId);

    if (!document) {
      throw new Error("Document not found");
    }

    const sharedDocument = await ctx.db
      .query("sharedDocuments")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      ?.first();

    if (!sharedDocument) {
      throw new Error("Document not shared");
    }

    if (user._id !== document.userId && sharedDocument.userId !== user._id) {
      throw new Error("Not authorized");
    }

    const removed = await ctx.db.delete(sharedDocument._id);

    return removed;
  },
});
