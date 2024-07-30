import type { Prisma } from '@prisma/client'

/**
 * 获取产品列表
 */
export const getNewsList = defineEventHandler(async (event) => {
    // // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<Prisma.NewsCreateInput & IListPage>(event)

    const where: Prisma.NewsWhereInput = {}

    if (param?.title) {
        where.title = {
            contains: param.title, // 包含
        }
    }

    if (/^\d+$/.test(param?.type?.toString() || '')) where.type = Number(param?.type)

    // 状态，判断是否为数字
    if (/^\d+$/.test(param?.status?.toString() || '')) where.status = Number(param?.status)



    // 分页数量查询，1页显示20条
    let page: number | undefined
    let pageSize: number | undefined
    let pageSkip: number | undefined

    if (param?.isPage) {
        page = Number(param?.page) || 1
        pageSize = Number(param.pageSize) || 20
        pageSkip = pageSize * (page - 1) || 0
    }

    const [res1, res2] = await Promise.all([
        prisma.news.findMany({
            skip: pageSkip,
            take: pageSize,
            where,
            orderBy: [
                {
                    sort: 'desc', // 按创建时间倒序排序
                },
                {
                    created_at: 'desc', // 按创建时间倒序排序
                    // updated_at: 'desc', // 按更新时间倒序排序
                    // id: 'asc', // 按id正序排序
                }
            ],
            // include: {
            //     children: true,
            // },
            // select: { // 只返回指定的字段
            //     username: true,
            //     account: true,
            // },
        }),
        prisma.news.count({
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
 * 创建新闻
 */
export const setNewsCreate = defineEventHandler(async (event) => {
    // // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<Prisma.NewsCreateInput>(event)

    if (!param?.title) return { msg: '标题名称不能为空' }
    // if (!param.href) return { msg: '链接地址不能为空' }

    const res = await prisma.news.create({
        data: {
            ...param,
            status: Number(param.status)
        },
    })

    if (res) {
        return { code: 200, msg: '添加成功' }
    } else {
        return { msg: '网络错误' }
    }
})

/**
 * 修改产品
 */
export const setNewsUpdate = defineEventHandler(async (event) => {
    // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<Prisma.NewsUncheckedCreateInput>(event)

    if (!param?.id) return { msg: '缺少参数id' }
    if (!param.title) return { msg: '标题名称不能为空' }
    // if (!param.href) return { msg: '链接地址不能为空' }

    const res = await prisma.news.update({
        data: {
            ...param,
            status: Number(param.status)
        },
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
 * 删除产品
 */
export const setNewsDelete = defineEventHandler(async (event) => {
    // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<{ id: number }>(event)

    if (!param?.id) return { msg: '缺少参数id' }

    const res = await prisma.news.delete({
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



/**
 * 获取新闻详情
 */
export const getNewsInfo = defineEventHandler(async event => {
    // 获取参数
    const param = await getEventParams<{ id: number, type: number }>(event)

    if (!param?.id) return null
    // if (!param?.type) return null

    const res = await prisma.news.findUnique({
        where: {
            id: Number(param.id),
            // type: Number(param.type),
        },
    })

    if (!res) return null
    // 取得上一条、下一条记录、更新阅读量
    const [res1, res2] = await Promise.all([
        prisma.news.findFirst({ // lte 小于等于，使用倒序
            where: {
                created_at: {
                    lte: res.created_at,
                },
                id: { // 排除
                    not: res.id,
                },
                type: res.type, // 类型相同
            },
            orderBy: {
                created_at: 'desc', // 倒序排序
            },
        }),
        prisma.news.findFirst({ // gte 大于等于，使用正序
            where: {
                created_at: {
                    gt: res.created_at,
                },
                id: {
                    not: res.id,
                },
                type: res.type,
            },
            orderBy: {
                created_at: 'asc', // 升序排序
            },
        }),
        prisma.news.update({
            where: {
                id: res.id,
            },
            data: {
                read: (res.read || 0) + 1,
            },
        }),
    ])

    return {
        code: 200,
        data: {
            data: res,
            prevNews: res1,
            nextNews: res2,
        }
    }
})

