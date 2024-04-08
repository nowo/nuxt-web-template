import type { MySql2Database } from 'drizzle-orm/mysql2'
import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import * as schema from '~/drizzle/schema'

const connection = await mysql.createConnection({
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    uri: process.env.DB_URL,
})

// export const db = drizzle(connection, { schema, mode: 'default' });

let db: MySql2Database<typeof schema> | null = null

export function dbs() {
    if (!db)
        db = drizzle(connection, { schema, mode: 'default' })

    return db
}
