import Constants from 'expo-constants';
import { z } from 'zod';

const debuggerHost = Constants.expoConfig?.hostUri;
const localhost = debuggerHost?.split(':')[0];

const API_URL = localhost
  ? `http://${localhost}:8000` // Physical device or LAN
  : 'http://10.0.2.2:8000'; // Fallback (Emulator default)

const schema = z.object({});

const safeParseEnvObj = schema.safeParse(process.env);

if (!safeParseEnvObj.success) {
  console.log('❌ Invalid or missing environment variables:');
  safeParseEnvObj.error.issues.forEach((error) => {
    console.log(`- ${error.path.join('.')}: ${error.message}`);
  });
} else {
  console.info('✅ All environment variables are valid.');
}

const envFromFile = safeParseEnvObj.data as z.infer<typeof schema>;
export const env = { ...envFromFile, API_URL };
export const envError = safeParseEnvObj.success ? null : safeParseEnvObj.error;
