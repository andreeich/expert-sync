import { v } from "convex/values";

import { mutation, query, QueryCtx } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

import { getUser } from "./_utils";

export const getDocumentById = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    const document = await ctx.db.get(args.documentId);

    if (!document) {
      throw new Error("Not found");
    }

    const sharedDocument = await ctx.db
      .query("sharedDocuments")
      .withIndex("by_user_document", (q) =>
        q
          .eq("userTokenId", user.tokenIdentifier)
          .eq("documentId", args.documentId)
      )
      .unique();

    if (document.userTokenId !== user.tokenIdentifier && !sharedDocument) {
      throw new Error("Unauthorized");
    }

    return document;
  },
});

export const getDocuments = query({
  handler: async (ctx) => {
    const user = await getUser(ctx);

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userTokenId", user.tokenIdentifier))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

export const getAllDocuments = query({
  handler: async (ctx) => {
    const user = await getUser(ctx);

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userTokenId", user.tokenIdentifier))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();
    const sharedDocumentsIds = await ctx.db
      .query("sharedDocuments")
      .withIndex("by_user", (q) => q.eq("userTokenId", user.tokenIdentifier))
      .collect();
    const sharedDocuments = await Promise.all(
      sharedDocumentsIds.map(async (doc) => {
        return await ctx.db.get<"documents">(doc.documentId);
      })
    );

    return [...documents, ...sharedDocuments];
  },
});

export const createDocument = mutation({
  args: {
    template: v.optional(v.string()),
    content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    let content: string | undefined;

    if (args.template && args.content === undefined) {
      const contentObj = await ctx.db
        .query("templates")
        .withIndex("by_name", (q) => q.eq("name", args.template!))
        .unique();

      if (!contentObj) {
        throw new Error("Template not found");
      }

      content = contentObj.content;
    } else {
      content = args.content;
    }

    const document = await ctx.db.insert("documents", {
      title: "Untitled",
      userTokenId: user.tokenIdentifier,
      isArchived: false,
      content,
    });

    return document;
  },
});

export const deleteDocument = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new Error("Not found");
    }

    if (document.userTokenId !== user.tokenIdentifier) {
      throw new Error("Unauthorized");
    }

    const sharedDocuments = await ctx.db
      .query("sharedDocuments")
      .withIndex("by_document", (q) => q.eq("documentId", args.id))
      .collect();
    Promise.all(
      sharedDocuments.map((sharedDocument) => {
        ctx.db.delete(sharedDocument._id);
      })
    );
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_document", (q) => q.eq("documentId", args.id))
      .collect();
    Promise.all(
      messages.map((message) => {
        ctx.db.delete(message._id);
      })
    );

    await ctx.db.delete(args.id);

    return document;
  },
});

export const updateDocumentTitle = mutation({
  args: {
    id: v.id("documents"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new Error("Not found");
    }

    if (document.userTokenId !== user.tokenIdentifier) {
      throw new Error("Unauthorized");
    }

    const updatedDocument = await ctx.db.patch(args.id, {
      title: args.title,
    });

    return updatedDocument;
  },
});

export const updateDocumentContent = mutation({
  args: {
    id: v.id("documents"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new Error("Not found");
    }

    const sharedDocument = await ctx.db
      .query("sharedDocuments")
      .withIndex("by_user_document", (q) =>
        q.eq("userTokenId", user.tokenIdentifier).eq("documentId", args.id)
      )
      .collect();

    if (
      document.userTokenId !== user.tokenIdentifier &&
      sharedDocument.length !== 1
    ) {
      throw new Error("Unauthorized");
    }

    const updatedDocument = await ctx.db.patch(args.id, {
      content: args.content,
    });

    return updatedDocument;
  },
});

export const archiveDocument = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new Error("Not found");
    }

    if (document.userTokenId !== user.tokenIdentifier) {
      throw new Error("Unauthorized");
    }

    const updatedDocument = await ctx.db.patch(args.id, {
      isArchived: true,
    });

    return updatedDocument;
  },
});

export const restoreDocument = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new Error("Not found");
    }

    if (document.userTokenId !== user.tokenIdentifier) {
      throw new Error("Unauthorized");
    }

    const updatedDocument = await ctx.db.patch(args.id, {
      isArchived: false,
    });

    return updatedDocument;
  },
});

export const getMembersByDocument = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    const document = await ctx.db.get(args.documentId);

    if (!document) {
      throw new Error("Not found");
    }

    const sharedDocument = await ctx.db
      .query("sharedDocuments")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .collect();
    const members = await Promise.all(
      sharedDocument.map(async (doc) => {
        const member = await ctx.db
          .query("users")
          // .filter((q) => q.neq(q.field("tokenIdentifier"), user.tokenIdentifier))
          .withIndex("by_token", (q) => q.eq("tokenIdentifier", doc.userTokenId))
          .filter((q) => q.neq(q.field("tokenIdentifier"), user.tokenIdentifier))
          .unique();
        return member;
      }),
    );
    if (user.tokenIdentifier !== document.userTokenId) {
      const owner = await ctx.db
        .query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", document.userTokenId))
        .unique();
      members.unshift(owner);
    }

    return members;
  },
});

export const getArchivedDocuments = query({
  handler: async (ctx) => {
    const user = await getUser(ctx);

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userTokenId", user.tokenIdentifier))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return documents;
  },
});

export const getDocumentRole = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    const document = await ctx.db.get(args.documentId);

    if (!document) {
      throw new Error("Not found");
    }

    const isOwnDocument = document.userTokenId === user.tokenIdentifier;

    const sharedDocument = await ctx.db
      .query("sharedDocuments")
      .withIndex("by_user_document", (q) =>
        q
          .eq("userTokenId", user.tokenIdentifier)
          .eq("documentId", args.documentId)
      )
      .unique();

    if (isOwnDocument) {
      return "owner";
    } else if (sharedDocument) {
      return "member";
    }
    return "none";
  },
});
