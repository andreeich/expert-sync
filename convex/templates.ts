import { v } from "convex/values";

import { mutation, query, QueryCtx } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

import { getUser } from "./_utils";

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

export const getUserTemplates = query({
  handler: async (ctx) => {
    const user = await getUser(ctx);
    const templates = await ctx.db
      .query("templates")
      .withIndex("by_user", (q) => q.eq("userTokenId", user.tokenIdentifier))
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
    const user = await getUser(ctx);
    const template = await ctx.db.insert("templates", {
      ...args,
      userTokenId: user.tokenIdentifier,
    });
    return template;
  },
});

export const removeTemplate = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);
    const template = await ctx.db
      .query("templates")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .unique();

    if (!template) {
      throw new Error("Template not found");
    }

    if (template.userTokenId !== user.tokenIdentifier) {
      throw new Error("Unauthorized");
    }
    return ctx.db.delete(template._id);
  },
});
