import { z } from "zod"

const envSchema = z.object({
    COMPANY_NAME: z.string(),
    TWITTER_CREATOR: z.string(),
    TWITTER_SITE: z.string(),
    SITE_NAME: z.string(),
    SHOPIFY_REVALIDATION_SECRET: z.string(),
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string(),
    SHOPIFY_STORE_DOMAIN: z.string(),
    MONGODB_URI: z.string()
});

envSchema.parse(process.env);

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      interface ProcessEnv extends z.infer<typeof envSchema> {}
    }
  }