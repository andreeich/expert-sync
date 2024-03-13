import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    userTokenId: v.string(),
    title: v.string(),
    content: v.optional(v.string()),
    isArchived: v.boolean(),
  }).index("by_user", ["userTokenId"]),
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.string(),
    email: v.string(),
    nickname: v.string(),
    picture: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_token", ["tokenIdentifier"]),
  sharedDocuments: defineTable({
    documentId: v.id("documents"),
    userTokenId: v.string(),
  })
    .index("by_user", ["userTokenId"])
    .index("by_document", ["documentId"])
    .index("by_user_document", ["userTokenId", "documentId"]),
  templates: defineTable({
    name: v.string(),
    icon: v.string(),
    content: v.optional(v.string()),
    userTokenId: v.string(),
  })
    .index("by_user", ["userTokenId"])
    .index("by_name", ["name"]),
  messages: defineTable({
    documentId: v.id("documents"),
    userTokenId: v.string(),
    content: v.string(),
  })
    .index("by_user", ["userTokenId"])
    .index("by_document", ["documentId"]),
});
