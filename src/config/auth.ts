const { AUTH_SECRET } = process.env;

if (!AUTH_SECRET) {
  throw new Error('Missing environment variable AUTH_SECRET');
}

export const authConfig = { SECRET: AUTH_SECRET };
