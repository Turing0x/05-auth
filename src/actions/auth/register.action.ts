import { defineAction, z } from "astro:actions";

export const registerUser = defineAction({
  accept: "form",
  input: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    remember_me: z.boolean(),
  }),
  handler: async ({ name, email, password, remember_me }) => {
    return true;
  },
});
