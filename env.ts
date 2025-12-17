import { z } from 'zod';

const schema = z.object({
  EXPO_PUBLIC_BACKEND_BASE_URL: z.url(),
});

const safeParseEnvObj = schema.safeParse(process.env);

if (!safeParseEnvObj.success) {
  console.log('❌ Invalid or missing environment variables:');
  safeParseEnvObj.error.issues.forEach((error) => {
    console.log(`- ${error.path.join('.')}: ${error.message}`);
  });
} else {
  console.info('✅ All environment variables are valid.');
}

export const env = safeParseEnvObj.data as z.infer<typeof schema>;
export const envError = safeParseEnvObj.success ? null : safeParseEnvObj.error;
