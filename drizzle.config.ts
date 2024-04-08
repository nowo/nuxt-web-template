import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    // schema: "./schema.ts",
    driver: 'mysql2',
    dbCredentials: {
        // host: process.env.DB_HOST || 'localhost',
        // user: process.env.DB_USER,
        // password: process.env.DB_PASSWORD,
        // database: process.env.DB_NAME || '',
        uri: process.env.DB_URL || '',
    },
    verbose: true,
    strict: true,
})
