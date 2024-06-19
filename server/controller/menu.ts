import type { Prisma } from '@prisma/client'

/**
 * 获取用户列表
 */
export const getMenuList = defineEventHandler(async (event) => {
    // // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<Prisma.MenuCreateInput & IListPage>(event)

    const where: Prisma.MenuWhereInput = {}

    if (param?.title) {
        where.title = {
            contains: param.title, // 包含
        }
    }
    if (param?.href) {
        where.href = {
            contains: param.href, // 包含
        }
    }



    // 查询用户姓"张"，1页显示20条
    let page: number | undefined
    let pageSize: number | undefined
    let pageSkip: number | undefined

    if (param?.isPage) {
        page = Number(param?.page) || 1
        pageSize = Number(param.pageSize) || 20
        pageSkip = pageSize * (page - 1) || 0
    }

    const [res1, res2] = await Promise.all([
        prisma.menu.findMany({
            skip: pageSkip,
            take: pageSize,
            where,
            orderBy: {
                id: 'asc', // 按id正序排序
            },
            include: {
                children: true,
            },
            // select: { // 只返回指定的字段
            //     username: true,
            //     account: true,
            // },
        }),
        prisma.menu.count({
            where,
        }),
    ])

    if (res1) {
        return { code: 200, data: { list: res1, total: res2 } }
    } else {
        return { code: 400, message: '查询失败' }
    }
})

/**
 * 创建用户
 */
export const setMenuCreate = defineEventHandler(async (event) => {
    // // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<Prisma.MenuCreateInput>(event)

    if (!param?.title) return { msg: '菜单名称不能为空' }
    if (!param.href) return { msg: '链接地址不能为空' }

    const res = await prisma.menu.create({
        data: param,
    })

    if (res) {
        return { code: 200, msg: '添加成功' }
    } else {
        return { msg: '网络错误' }
    }
})

/**
 * 修改用户
 */
export const setMenuUpdate = defineEventHandler(async (event) => {
    // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<Prisma.MenuUncheckedCreateInput>(event)

    if (!param?.id) return { msg: '缺少参数id' }
    if (!param.title) return { msg: '菜单名称不能为空' }
    if (!param.href) return { msg: '链接地址不能为空' }

    const res = await prisma.menu.update({
        data: param,
        where: {
            id: param.id,
        },
    })

    if (res) {
        return { code: 200, msg: '修改成功' }
    } else {
        return { msg: '网络错误' }
    }
})

/**
 * 删除用户
 */
export const setMenuDelete = defineEventHandler(async (event) => {
    // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<{ id: number }>(event)

    if (!param?.id) return { msg: '缺少参数id' }

    const res = await prisma.menu.delete({
        where: {
            id: param.id,
        },
    })

    if (res) {
        return { code: 200, msg: '删除成功' }
    } else {
        return { msg: '网络错误' }
    }
})
