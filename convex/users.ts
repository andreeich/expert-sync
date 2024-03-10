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
    throw new Error("No email");
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

export const createUser = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    username: v.string(),
    avatarUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .collect();

    if (users.length > 0) {
      throw new Error("User already exists");
    }

    const user = await ctx.db.insert("users", {
      ...args,
      fullName: `${args.firstName} ${args.lastName}`,
    });
    return user;
  },
});

export const getUserByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (e) => e.eq("email", args.email))
      ?.first();

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },
});

export const updateUser = mutation({
  args: {
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    fullName: v.optional(v.string()),
    email: v.optional(v.string()),
    username: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await checkIdentity(ctx);

    const updatedUser = await ctx.db.patch<"users">(user._id, args);

    return updatedUser;
  },
});
