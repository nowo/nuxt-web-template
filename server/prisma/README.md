# nuxt项目集成prisma

<a href="https://prisma.yoga/" target="_blank">prisma中文文档 https://prisma.yoga/</a>

<a href="https://prisma.yoga/reference/api-reference/prisma-schema-reference" target="_blank">https://prisma.yoga/reference/api-reference/prisma-schema-reference</a>

## 一、添加prisma到项目中，并连接数据库
安装`prisma`
```bash
pnpm install prisma --save-dev
```
通过命令生成`schema.prisma`模型文件，也可以自己手动去创建prisma/schema.prisma
```bash
npx prisma init
```
<!-- ## 二、连接数据库 -->
1. 这里连接的是`mysql`数据库，将`provider`设置成`mysql`

2. `.env`文件设置环境变量`DATABASE_URL`连接数据库的配置,
数据库类型、账号、密码、主机、端口号、数据库名
```prisma
// prisma/schema.prisma
datasource db {
  // provider = "postgresql"
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// .env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
```

3. 生成prisma客户端 <mark>重要!</mark>
```bash
npx prisma generate
```

## 三、prisma模型处理
数据库已经存在各种数据表时，此时就将各个表的字段同步到schema.prisma生成对应的各个模型
```bash
npx prisma db pull
```

#### 修改、创建模型,只要是对model有改动时，就要同步到数据库里，更新相应的表，同时typescript对应的类型也会更新
```bash
npx prisma db push
```

## 四、 安装@prisma/client执行业务操作
```bash
pnpm install @prisma/client
```
1. 将prisma实例挂载到event参数上使用

在`server/middleware`文件夹下创建`0.prisma.ts`文件，前面的这个0表示这个中间件加载的顺序
```typescript
// server/middleware/0.prisma.ts
import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

declare module 'h3' {
    interface H3EventContext {
        prisma: PrismaClient
    }
}

export default eventHandler((event) => {
    if (!prisma) {
        prisma = new PrismaClient()
    }
    event.context.prisma = prisma
})
```

使用方式,通过`event.context.prisma`就可以拿到对应的模型，然后进行相应的操作
```typescript
// server/api/user.ts
export default defineEventHandler(async (event) => {
    // 获取用户表的所有用户
    const res = await event.context.prisma.user.findMany()
    // console.log(res)
    return { code: 200, data: res }
})
```

2. 第二种方式，将prisma实例在`/server/utils`文件夹下直接导出
```typescript
// server/utils/prisma.ts
import { PrismaClient } from '@prisma/client'

export const prisma: PrismaClient = new PrismaClient()
```

使用方式,直接通过`prisma.<模型名>`就可以拿到对应的模型，`server/utils`下的文件在服务端是全局导入的
```typescript
// server/api/user.ts
export default defineEventHandler(async (event) => {
    // 获取用户表的所有用户
    const res = await prisma.user.findMany()
    // console.log(res)
    return { code: 200, data: res }
})
```

<!-- npx prisma db pull -->

<!-- npx prisma db push -->

## 四、上线部署至服务器（PM2）
> 先创建线上数据库，将本地数据库上传到线上
1. 拉取仓库代码
```bash
git clone https://github.com/... # 仓库地址
```
2. 安装依赖
```bash
pnpm install
```
3. 生成prisma客户端 <mark>重要!</mark>
```bash
npx prisma generate
```
4. 打包项目
```bash
pnpm build
```
5. 配置PM2
> 项目根目录下创建在`ecosystem.config.js`文件，使用PM2作为进程监控，应用程序发生错误时，PM2会自动重启进程
```javascript
module.exports = {
    apps: [
        {
            name: 'nuxt-pro', // 设置PM2进程的名称
            port: '8004', // 项目运行的端口
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs',
            env: {
                // 数据库
                DATABASE_URL: 'mysql://root:root@localhost:3306/nuxt-pro', // 更改成实际的数据库
            },
        },
    ],
}
```
6. 启动项目
```bash
pm2 start
```

#### 后续PM2相关操作

7. 停止项目
```bash
pm2 stop nuxt-pro
```

8. 重启项目
```bash
pm2 restart nuxt-pro
```

9. 删除项目
```bash
pm2 delete nuxt-pro
```

10. 项目日志
```bash
pm2 logs nuxt-pro
```

11. 项目监控
```bash
pm2 monit
```

12. 项目列表
```bash
    pm2 list
```
