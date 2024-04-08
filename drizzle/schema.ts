import type { AnyMySqlColumn } from 'drizzle-orm/mysql-core'
import { datetime, int, mysqlTable, text, tinyint, unique, varchar } from 'drizzle-orm/mysql-core'

export const admin = mysqlTable('admin', {
    id: int('id').autoincrement().notNull(),
    account: varchar('account', { length: 50 }),
    username: varchar('username', { length: 30 }),
    password: varchar('password', { length: 255 }),
    avatar: varchar('avatar', { length: 255 }),
    status: int('status').default(1),
    createdAt: datetime('created_at', { mode: 'string', fsp: 3 }).default('CURRENT_TIMESTAMP(3)').notNull(),
    updatedAt: datetime('updated_at', { mode: 'string', fsp: 3 }).notNull(),
}, (table) => {
    return {
        adminAccountKey: unique('admin_account_key').on(table.account),
    }
})

export const company = mysqlTable('company', {
    id: int('id').autoincrement().notNull(),
    company: varchar('company', { length: 100 }).notNull(),
    address: varchar('address', { length: 200 }),
    logo: varchar('logo', { length: 255 }),
    logo2: varchar('logo2', { length: 255 }),
    qrCode: varchar('qr_code', { length: 255 }),
    phone: varchar('phone', { length: 20 }),
    email: varchar('email', { length: 50 }),
    seoKeyword: varchar('seo_keyword', { length: 100 }),
    seoDescription: varchar('seo_description', { length: 200 }),
    copyright: varchar('copyright', { length: 200 }),
    createdAt: datetime('created_at', { mode: 'string', fsp: 3 }).default('CURRENT_TIMESTAMP(3)').notNull(),
    updatedAt: datetime('updated_at', { mode: 'string', fsp: 3 }).notNull(),
    filing: varchar('filing', { length: 100 }),
})

export const link = mysqlTable('link', {
    id: int('id').autoincrement().notNull(),
    title: varchar('title', { length: 100 }),
    titleEn: varchar('title_en', { length: 100 }),
    img: varchar('img', { length: 255 }),
    href: varchar('href', { length: 255 }),
    sort: int('sort').default(0),
    type: int('type').default(1),
    isHide: tinyint('isHide').default(0).notNull(),
    createdAt: datetime('created_at', { mode: 'string', fsp: 3 }).default('CURRENT_TIMESTAMP(3)').notNull(),
    updatedAt: datetime('updated_at', { mode: 'string', fsp: 3 }).notNull(),
})

export const menu = mysqlTable('menu', {
    id: int('id').autoincrement().notNull(),
    // pId: int("p_id").default(0),
    pId: int('parent_id').references((): AnyMySqlColumn => menu.id),
    icon: varchar('icon', { length: 55 }),
    sort: int('sort').default(0),
    title: varchar('title', { length: 100 }),
    titleEn: varchar('title_en', { length: 100 }),
    createdAt: datetime('created_at', { mode: 'string', fsp: 3 }).default('CURRENT_TIMESTAMP(3)').notNull(),
    updatedAt: datetime('updated_at', { mode: 'string', fsp: 3 }).notNull(),
    href: varchar('href', { length: 200 }),
// }, (table) => {
//     return {
//         pIdFkey: index('menu_p_id_fkey').on(table.pId),
//     }
})

export const news = mysqlTable('news', {
    id: int('id').autoincrement().notNull(),
    title: varchar('title', { length: 100 }),
    titleEn: varchar('title_en', { length: 100 }),
    author: varchar('author', { length: 100 }),
    describe: varchar('describe', { length: 200 }),
    describeEn: varchar('describe_en', { length: 200 }),
    content: text('content'),
    contentEn: text('content_en'),
    img: varchar('img', { length: 255 }),
    sort: int('sort').default(0),
    type: int('type').default(0).notNull(),
    createdAt: datetime('created_at', { mode: 'string', fsp: 3 }).default('CURRENT_TIMESTAMP(3)').notNull(),
    updatedAt: datetime('updated_at', { mode: 'string', fsp: 3 }).notNull(),
    isHide: tinyint('isHide').default(0),
    read: int('read').default(0),
})

export const other = mysqlTable('other', {
    id: int('id').autoincrement().notNull(),
    title: varchar('title', { length: 100 }),
    titleEn: varchar('title_en', { length: 100 }),
    img: varchar('img', { length: 255 }),
    content: text('content'),
    contentEn: text('content_en'),
    createdAt: datetime('created_at', { mode: 'string', fsp: 3 }).default('CURRENT_TIMESTAMP(3)').notNull(),
    updatedAt: datetime('updated_at', { mode: 'string', fsp: 3 }).notNull(),
    type: int('type').default(0).notNull(),
}, (table) => {
    return {
        otherTypeKey: unique('other_type_key').on(table.type),
    }
})

export const product = mysqlTable('product', {
    id: int('id').autoincrement().notNull(),
    title: varchar('title', { length: 100 }),
    titleEn: varchar('title_en', { length: 100 }),
    author: varchar('author', { length: 100 }),
    describe: varchar('describe', { length: 200 }),
    describeEn: varchar('describe_en', { length: 200 }),
    content: text('content'),
    contentEn: text('content_en'),
    img: varchar('img', { length: 255 }),
    sort: int('sort').default(0),
    isHide: tinyint('isHide').default(0),
    type: int('type').default(0).notNull(),
    read: int('read').default(0),
    createdAt: datetime('created_at', { mode: 'string', fsp: 3 }).default('CURRENT_TIMESTAMP(3)').notNull(),
    updatedAt: datetime('updated_at', { mode: 'string', fsp: 3 }).notNull(),
})

export const system = mysqlTable('system', {
    id: int('id').autoincrement().notNull(),
    title: varchar('title', { length: 100 }),
    address: varchar('address', { length: 200 }),
    logo: varchar('logo', { length: 255 }),
    logo2: varchar('logo2', { length: 255 }),
    qrCode: varchar('qr_code', { length: 255 }),
    phone: varchar('phone', { length: 20 }),
    email: varchar('email', { length: 50 }),
    keyword: varchar('keyword', { length: 100 }),
    description: varchar('description', { length: 200 }),
    filing: varchar('filing', { length: 100 }),
    copyright: varchar('copyright', { length: 200 }),
    createdAt: datetime('created_at', { mode: 'string', fsp: 3 }).default('CURRENT_TIMESTAMP(3)').notNull(),
    updatedAt: datetime('updated_at', { mode: 'string', fsp: 3 }).notNull(),
    icon: varchar('icon', { length: 255 }),
})
