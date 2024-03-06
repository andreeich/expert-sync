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

export const getTemplateByName = query({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const template = await ctx.db
      .query("templates")
      .withIndex("by_name", (e) => e.eq("name", args.name))
      .collect();
    return template;
  },
});

export const getGeneralTemplates = query({
  handler: async (ctx) => {
    const templates = await ctx.db
      .query("templates")
      .withIndex("by_isGeneral", (q) => q.eq("isGeneral", true))
      .collect();
    return templates;
  },
});

export const getUserTemplates = query({
  handler: async (ctx) => {
    const user = await checkIdentity(ctx);
    const templates = await ctx.db
      .query("templates")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();
    return templates;
  },
});

export const addTemplate = mutation({
  args: {
    name: v.string(),
    content: v.string(),
    icon: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await checkIdentity(ctx);
    const template = await ctx.db.insert("templates", {
      ...args,
      userId: user._id,
      isGeneral: false,
    });
    return template;
  },
});

export const removeTemplate = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await checkIdentity(ctx);
    const template = await ctx.db
      .query("templates")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      ?.first();

    if (!template) {
      throw new Error("Template not found");
    }

    if (template.userId !== user._id) {
      throw new Error("Unauthorized");
    }
    return ctx.db.delete(template._id);
  },
});
