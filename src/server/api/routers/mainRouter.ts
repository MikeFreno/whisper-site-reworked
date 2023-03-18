import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

import { User } from "@prisma/client";
import { encrypt, decrypt, stringToEncryptionKey } from "@/utils/crypto";

export const mainRouter = createTRPCRouter({
  uploadFile: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {}),
  checkEmail: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.user.findFirst({
        where: { email: input },
      });
      if (res) {
        return "found";
      } else {
        return "not found";
      }
    }),
  apiKeyStore: protectedProcedure
    .input(
      z.object({
        apiKey: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const encryptionKey = stringToEncryptionKey(input.password);
      const encryptedApiKey = encrypt(input.apiKey, encryptionKey);
      await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: { apiKey: encryptedApiKey },
      });
    }),
  getApiKey: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const encryptionKey = stringToEncryptionKey(input);
      const user = await ctx.prisma.user.findFirst({
        where: {
          id: ctx.session.user.id,
        },
      });
      if (user && user.apiKey) {
        const decryptedApiKey = decrypt(user?.apiKey, encryptionKey);
        return decryptedApiKey;
      } else {
        return "No stored Api key found";
      }
    }),
});
