import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    userId: v.id("users"),
    title: v.string(),
    content: v.optional(v.string()),
    isArchived: v.boolean(),
  }).index("by_user", ["userId"]),
  users: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    fullName: v.string(),
    email: v.string(),
    username: v.string(),
    avatarUrl: v.optional(v.string()),
  }).index("by_email", ["email"]),
  sharedDocuments: defineTable({
    documentId: v.id("documents"),
    userId: v.id("users"),
  })
    .index("by_user", ["userId"])
    .index("by_document", ["documentId"])
    .index("by_user_document", ["userId", "documentId"]),
  templates: defineTable({
    name: v.string(),
    icon: v.string(),
    content: v.string(),
    isGeneral: v.boolean(),
    userId: v.optional(v.id("users")),
  })
    .index("by_user", ["userId"])
    .index("by_name", ["name"])
    .index("by_isGeneral", ["isGeneral"]),
  messages: defineTable({
    documentId: v.id("documents"),
    userId: v.id("users"),
    content: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_document", ["documentId"]),
});
