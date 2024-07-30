import type { Prisma } from '@prisma/client'


// banner

/**
 * 列表查询
 * @param event
 * @returns
 */
export const getMessageList = defineEventHandler(async event => {
    // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<{ status: number, title: string } & IListPage>(event)

    // if (!param?.type) return { msg: '请传递类型' }

    const where: Prisma.MessageWhereInput = {

    }

    if (param?.title) where.title = { contains: param.title }

    // 状态，判断是否为数字
    if (/^\d+$/.test(param?.status?.toString() || '')) where.status = Number(param?.status)

    // 查询菜单姓"张"，1页显示20条
    let page: number | undefined
    let pageSize: number | undefined
    let pageSkip: number | undefined

    if (param?.isPage) {
        page = Number(param.page || 1)
        pageSize = Number(param.pageSize || 20)
        pageSkip = pageSize * (page - 1) || 0
    }

    const [res1, res2] = await Promise.all([
        prisma.message.findMany({
            skip: pageSkip,
            take: pageSize,
            where,
            orderBy: {
                createdAt: 'desc', // 按id正序排序
            },
            // include: {
            //     Product: {
            //         include: {
            //             links: {
            //                 where: {
            //                     type: 1,
            //                 },
            //             },
            //         },
            //     },
            // },
            // select: { // 只返回指定的字段
            //     username: true,
            //     account: true,
            // },
        }),
        prisma.message.count({
            where,
        }),
    ])
    const list = res1
    if (res1) {
        return { code: 200, data: { list, total: res2 } }
    } else {
        return { code: 400, message: '查询失败' }
    }
})

/**
 * 新增
 * @param event
 * @returns
 */
export const setMessageCreate = defineEventHandler(async event => {
    // const url = getRequestURL(event)
    // // /api/page**的接口，跳过登录校验
    // if (!url.pathname.includes('/api/page')) {
    //     // 接口校验(是否登录)
    //     if (!event.context.user) return ResponseMessage.token
    // }
    // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<Prisma.MessageCreateInput>(event)

    if (!param?.title) return { msg: '名称不能为空' }

    const res = await prisma.message.create({
        data: param,
    })

    if (res) {
        return { code: 200, msg: '添加成功' }
    } else {
        return { msg: '网络错误' }
    }
})

/**
 * 修改
 * @param event
 * @returns
 */
export const setMessageUpdate = defineEventHandler(async event => {
    // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<{ id: number } & Prisma.MessageUpdateInput>(event)

    if (!param?.id) return { msg: '缺少参数id' }
    if (!param?.title) return { msg: '标题不能为空' }

    const res = await prisma.message.update({
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
 * 删除
 * @param event
 * @returns
 */
export const setMessageDelete = defineEventHandler(async event => {
    // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<{ id: number }>(event)

    if (!param?.id) return { msg: '缺少参数id' }

    const res = await prisma.message.delete({
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
