import type { Prisma } from '@prisma/client'
import type { PrismaListItem } from '~~/prisma/type'
// import { PrismaListItem } from '~/config/enum';

/**
 * 获取产品列表
 */
export const getModelList = defineEventHandler(async (event) => {
    // // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token
    // let a:PrismaListItem={

    // }

    const prismaList = await useStorage('prisma').getItem<PrismaListItem[]>('prismaList', []) || []
    console.log('prismaList :>> ', prismaList)

    // 获取参数
    const param = await getEventParams<IProductListParams>(event)

    const where: Prisma.ProductWhereInput = {}

    if (param?.title) {
        where.title = {
            contains: param.title, // 包含
        }
    }
    // 状态，判断是否为数字
    if (/^\d+$/.test(param?.status?.toString() || '')) where.status = Number(param?.status)

    // 时间范围查询
    if (param?.startTime) {
        where.created_at = {
            gte: param.startTime, // 大于等于
        }
    }
    if (param?.endTime) {
        where.created_at = {
            lte: param.endTime, // 小于等于
        }
    }
    // if (param?.href) {
    //     where.href = {
    //         contains: param.href, // 包含
    //     }
    // }

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
        prisma.product.findMany({
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
                },
            ],
            // include: {
            //     children: true,
            // },
            // select: { // 只返回指定的字段
            //     username: true,
            //     account: true,
            // },
        }),
        prisma.product.count({
            where,
        }),
    ])

    if (res1) {
        return { code: 200, data: { list: res1, total: res2 } }
    } else {
        return { code: 400, message: '查询失败' }
    }
})
