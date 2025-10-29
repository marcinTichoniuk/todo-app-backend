import z from 'zod';

const envSchema = z.object({
  PORT: z
    .string()
    .regex(/^\d+$/, { error: 'PORT must be a number' })
    .transform(Number)
    .pipe(z.number().min(1).max(65535))
    .default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  API_VERSION: z.string().default('v1'),
  DB_URI: z.url().startsWith('mongodb://', { error: 'DB_URI must start with mongodb://' }),
});

const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('Invalid envs!');
    console.dir(z.treeifyError(error), { depth: 5 });
    process.exit(1);
  }
};

const env = parseEnv();

export const config = {
  port: env.PORT,
  environment: env.NODE_ENV,
  apiVersion: env.API_VERSION,
  db: {
    uri: env.DB_URI,
  },

  isDevelopment: () => env.NODE_ENV === 'development',
  isProduction: () => env.NODE_ENV === 'production',
  isTest: () => env.NODE_ENV === 'test',
};
