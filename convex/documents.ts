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

export const getDocumentById = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await checkIdentity(ctx);

    const document = await ctx.db.get(args.documentId);

    if (!document) {
      throw new Error("Not found");
    }

    const sharedDocument = await ctx.db
      .query("sharedDocuments")
      .withIndex("by_user_document", (q) =>
        q.eq("userId", user._id).eq("documentId", args.documentId)
      )
      ?.first();

    if (document.userId !== user._id && !sharedDocument) {
      throw new Error("Unauthorized");
    }

    return document;
  },
});

export const getDocuments = query({
  handler: async (ctx) => {
    const user = await checkIdentity(ctx);

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

export const getAllDocuments = query({
  handler: async (ctx) => {
    const user = await checkIdentity(ctx);

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();
    const sharedDocumentsIds = await ctx.db
      .query("sharedDocuments")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
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
    template: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await checkIdentity(ctx);

    const content = await ctx.db
      .query("templates")
      .withIndex("by_name", (q) => q.eq("name", args.template))
      ?.first();

    if (!content) {
      throw new Error("Template not found");
    }

    const document = await ctx.db.insert("documents", {
      title: "Untitled",
      userId: user._id,
      isArchived: false,
      content: content.content,
    });

    return document;
  },
});

export const deleteDocument = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await checkIdentity(ctx);

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new Error("Not found");
    }

    if (document.userId !== user._id) {
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
    const user = await checkIdentity(ctx);

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new Error("Not found");
    }

    if (document.userId !== user._id) {
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
    const user = await checkIdentity(ctx);

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new Error("Not found");
    }

    const sharedDocument = await ctx.db
      .query("sharedDocuments")
      .withIndex("by_user_document", (q) =>
        q.eq("userId", user._id).eq("documentId", args.id)
      )
      .collect();

    if (document.userId !== user._id && sharedDocument.length !== 1) {
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
    const user = await checkIdentity(ctx);

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new Error("Not found");
    }

    if (document.userId !== user._id) {
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
    const user = await checkIdentity(ctx);

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new Error("Not found");
    }

    if (document.userId !== user._id) {
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
    await checkIdentity(ctx);

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
        return await ctx.db.get<"users">(doc.userId);
      })
    );

    return members;
  },
});

export const getArchivedDocuments = query({
  handler: async (ctx) => {
    const user = await checkIdentity(ctx);

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return documents;
  },
});

// export const archive = mutation({
//   args: { id: v.id("documents") },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     const userId = identity.subject;

//     const existingDocument = await ctx.db.get(args.id);

//     if (!existingDocument) {
//       throw new Error("Not found");
//     }

//     if (existingDocument.userId !== userId) {
//       throw new Error("Unauthorized");
//     }

//     const recursiveArchive = async (documentId: Id<"documents">) => {
//       const children = await ctx.db
//         .query("documents")
//         .withIndex("by_user_parent", (q) =>
//           q.eq("userId", userId).eq("parentDocument", documentId)
//         )
//         .collect();

//       for (const child of children) {
//         await ctx.db.patch(child._id, {
//           isArchived: true,
//         });

//         await recursiveArchive(child._id);
//       }
//     };

//     const document = await ctx.db.patch(args.id, {
//       isArchived: true,
//     });

//     recursiveArchive(args.id);

//     return document;
//   },
// });

// export const getSidebar = query({
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     const userId = identity.subject;

//     const documents = await ctx.db
//       .query("documents")
//       .withIndex("by_user", (q) => q.eq("userId", userId))
//       .filter((q) => q.eq(q.field("isArchived"), false))
//       .order("desc")
//       .collect();

//     return documents;
//   },
// });

// export const create = mutation({
//   args: {
//     title: v.string(),
//     parentDocument: v.optional(v.id("documents")),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     const userId = identity.subject;

//     const document = await ctx.db.insert("documents", {
//       title: args.title,
//       parentDocument: args.parentDocument,
//       userId,
//       isArchived: false,
//       isPublished: false,
//       members: [],
//     });

//     return document;
//   },
// });

// export const createWithTemplate = mutation({
//   args: {
//     title: v.string(),
//     parentDocument: v.optional(v.id("documents")),
//     template: v.optional(v.string()),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     const userId = identity.subject;

//     let content: string | undefined = undefined;
//     switch (args.template) {
//       case "test":
//         content = `[
//           {
//             "id": "initialBlockId",
//             "type": "heading",
//             "props": {
//               "textColor": "default",
//               "backgroundColor": "default",
//               "textAlignment": "left",
//               "level": 1
//             },
//             "content": [
//               {
//                 "type": "text",
//                 "text": "Test 1",
//                 "styles": {}
//               }
//             ],
//             "children": []
//           },
//           {
//             "id": "bed3a06e-5b8e-4b85-99b8-9bd851a082ba",
//             "type": "heading",
//             "props": {
//               "textColor": "default",
//               "backgroundColor": "default",
//               "textAlignment": "left",
//               "level": 2
//             },
//             "content": [
//               {
//                 "type": "text",
//                 "text": "Test 2",
//                 "styles": {}
//               }
//             ],
//             "children": []
//           },
//           {
//             "id": "5821d9cf-0c9e-4b8e-8c58-e764afca9a7d",
//             "type": "paragraph",
//             "props": {
//               "textColor": "default",
//               "backgroundColor": "default",
//               "textAlignment": "left"
//             },
//             "content": [],
//             "children": []
//           }
//         ]`;
//         break;
//       default:
//         content = undefined;
//     }

//     const document = await ctx.db.insert("documents", {
//       title: args.title,
//       parentDocument: args.parentDocument,
//       userId,
//       isArchived: false,
//       isPublished: false,
//       members: [],
//       content,
//     });

//     return document;
//   },
// });

// export const getTrash = query({
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     const userId = identity.subject;

//     const documents = await ctx.db
//       .query("documents")
//       .withIndex("by_user", (q) => q.eq("userId", userId))
//       .filter((q) => q.eq(q.field("isArchived"), true))
//       .order("desc")
//       .collect();

//     return documents;
//   },
// });

// export const restore = mutation({
//   args: { id: v.id("documents") },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     const userId = identity.subject;

//     const existingDocument = await ctx.db.get(args.id);

//     if (!existingDocument) {
//       throw new Error("Not found");
//     }

//     if (existingDocument.userId !== userId) {
//       throw new Error("Unauthorized");
//     }

//     const recursiveRestore = async (documentId: Id<"documents">) => {
//       const children = await ctx.db
//         .query("documents")
//         .withIndex("by_user_parent", (q) =>
//           q.eq("userId", userId).eq("parentDocument", documentId)
//         )
//         .collect();

//       for (const child of children) {
//         await ctx.db.patch(child._id, {
//           isArchived: false,
//         });

//         await recursiveRestore(child._id);
//       }
//     };

//     const options: Partial<Doc<"documents">> = {
//       isArchived: false,
//     };

//     if (existingDocument.parentDocument) {
//       const parent = await ctx.db.get(existingDocument.parentDocument);
//       if (parent?.isArchived) {
//         options.parentDocument = undefined;
//       }
//     }

//     const document = await ctx.db.patch(args.id, options);

//     recursiveRestore(args.id);

//     return document;
//   },
// });

// export const remove = mutation({
//   args: { id: v.id("documents") },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     const userId = identity.subject;

//     const existingDocument = await ctx.db.get(args.id);

//     if (!existingDocument) {
//       throw new Error("Not found");
//     }

//     if (existingDocument.userId !== userId) {
//       throw new Error("Unauthorized");
//     }

//     const document = await ctx.db.delete(args.id);

//     return document;
//   },
// });

// export const getSearch = query({
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     const userId = identity.subject;

//     const documents = await ctx.db
//       .query("documents")
//       .withIndex("by_user", (q) => q.eq("userId", userId))
//       .filter((q) => q.eq(q.field("isArchived"), false))
//       .order("desc")
//       .collect();

//     return documents;
//   },
// });

// export const getById = query({
//   args: { documentId: v.id("documents") },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();

//     const document = await ctx.db.get(args.documentId);

//     if (!document) {
//       throw new Error("Not found");
//     }

//     if (document.isPublished && !document.isArchived) {
//       return document;
//     }

//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     const userId = identity.subject;
//     const userEmail = identity.email;

//     if (
//       document.userId !== userId &&
//       !document?.members?.includes(userEmail!)
//     ) {
//       throw new Error("Unauthorized");
//     }

//     return document;
//   },
// });

// export const update = mutation({
//   args: {
//     id: v.id("documents"),
//     title: v.optional(v.string()),
//     content: v.optional(v.string()),
//     coverImage: v.optional(v.string()),
//     icon: v.optional(v.string()),
//     isPublished: v.optional(v.boolean()),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       throw new Error("Unauthenticated");
//     }

//     const existingDocument = await ctx.db.get(args.id);

//     if (!existingDocument) {
//       throw new Error("Not found");
//     }

//     const userId = identity.subject;
//     const userEmail = identity.email;

//     if (
//       existingDocument.userId !== userId &&
//       !existingDocument.members?.includes(userEmail!)
//     ) {
//       throw new Error("Unauthorized");
//     }

//     const { id, ...rest } = args;

//     const document = await ctx.db.patch(args.id, {
//       ...rest,
//     });

//     return document;
//   },
// });

// export const removeIcon = mutation({
//   args: { id: v.id("documents") },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       throw new Error("Unauthenticated");
//     }

//     const existingDocument = await ctx.db.get(args.id);

//     if (!existingDocument) {
//       throw new Error("Not found");
//     }

//     const userId = identity.subject;
//     const userEmail = identity.email;

//     if (
//       existingDocument.userId !== userId &&
//       !existingDocument.members?.includes(userEmail!)
//     ) {
//       throw new Error("Unauthorized");
//     }

//     const document = await ctx.db.patch(args.id, {
//       icon: undefined,
//     });

//     return document;
//   },
// });

// export const removeCoverImage = mutation({
//   args: { id: v.id("documents") },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       throw new Error("Unauthenticated");
//     }

//     const existingDocument = await ctx.db.get(args.id);

//     if (!existingDocument) {
//       throw new Error("Not found");
//     }

//     const userId = identity.subject;
//     const userEmail = identity.email;

//     if (
//       existingDocument.userId !== userId &&
//       !existingDocument.members?.includes(userEmail!)
//     ) {
//       throw new Error("Unauthorized");
//     }

//     const document = await ctx.db.patch(args.id, {
//       coverImage: undefined,
//     });

//     return document;
//   },
// });

// // add member
// export const addMember = mutation({
//   args: {
//     id: v.id("documents"),
//     member: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       throw new Error("Unauthenticated");
//     }
//     const existingDocument = await ctx.db.get(args.id);

//     if (!existingDocument) {
//       throw new Error("Not found");
//     }

//     const userId = identity.subject;
//     const userEmail = identity.email;

//     if (
//       existingDocument.userId !== userId &&
//       !existingDocument.members?.includes(userEmail!)
//     ) {
//       throw new Error("Unauthorized");
//     }

//     // check if the member is already in the members
//     if (existingDocument?.members?.includes(args.member)) {
//       throw new Error("Already in the members");
//     }

//     const document = await ctx.db.patch(args.id, {
//       members: !!existingDocument?.members?.length
//         ? [...existingDocument.members, args.member]
//         : [args.member],
//     });

//     return document;
//   },
// });

// // remove member
// export const removeMember = mutation({
//   args: {
//     id: v.id("documents"),
//     member: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       throw new Error("Unauthenticated");
//     }

//     const existingDocument = await ctx.db.get(args.id);

//     if (!existingDocument) {
//       throw new Error("Not found");
//     }

//     const userId = identity.subject;
//     const userEmail = identity.email;

//     if (
//       existingDocument.userId !== userId &&
//       !existingDocument.members?.includes(userEmail!)
//     ) {
//       throw new Error("Unauthorized");
//     }

//     // check if the member is not in the team
//     if (!existingDocument?.members?.includes(args.member)) {
//       throw new Error("Not in the team");
//     }
//     // if not add the member to the members
//     const newMembers = existingDocument?.members.filter(
//       (member: string) => member !== args.member
//     );

//     const document = await ctx.db.patch(args.id, {
//       members: newMembers,
//     });

//     return document;
//   },
// });

// export const getMembers = query({
//   args: { documentId: v.id("documents") },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       throw new Error("Unauthenticated");
//     }
//     const document = await ctx.db.get(args.documentId);

//     if (!document) {
//       throw new Error("Not found");
//     }

//     const userId = identity.subject;
//     const userEmail = identity.email;

//     if (document.userId !== userId && !document.members?.includes(userEmail!)) {
//       throw new Error("Unauthorized");
//     }

//     return document.members;
//   },
// });

// // get documents by member
// export const getSharedSidebar = query({
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     const userEmail = identity.email;

//     if (!userEmail) {
//       return [];
//     }

//     const documents = await ctx.db
//       .query("documents")
//       .filter((q) => q.eq(q.field("isArchived"), false))
//       .order("desc")
//       .collect();

//     const filteredDocuments = documents.filter((document) => {
//       if (document.members?.includes(userEmail)) {
//         return document;
//       }
//     });

//     return filteredDocuments;
//   },
// });
