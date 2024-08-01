import type { H3Event } from 'h3'
import type { Prisma } from '@prisma/client'


/**
 * 列表查询
 * @param event
 * @returns
 */
export const getLinkList = defineEventHandler(async event => {
    // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<{ type: number, title: string, goods_id: string } & IListPage>(event)

    if (!param?.type) return { msg: '请传递类型' }
    // 1: '轮播图',
    // 2: '产品图片',
    // // 3:'',
    // 4: '文档',
    // 5: '视频',
    // 6: '其他',
    // 7: '外链',
    // 8: '合作伙伴',
    // 9: '公司介绍图',
    // 10: '荣誉资质',
    const types = param?.type.toString().split(',').filter(item => !!item)
    const where: Prisma.LinkWhereInput = {
        type: { in: types },
        // isHide: false,
    }

    if (param.title) where.title = { contains: param.title }

    // if (param.goods_id) where.productId = Number(param.goods_id)
    // let includes: Prisma.LinkInclude = {
    // }
    // if (!types.includes(1)) {
    //     includes = {
    //         product: {
    //             include: {
    //                 links: {
    //                     where: {
    //                         type: 1,
    //                     },
    //                 },
    //             },
    //         },
    //     }
    // }

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
        prisma.link.findMany({
            skip: pageSkip,
            take: pageSize,
            where,
            orderBy: [
                {
                    sort: 'desc', // 按id正序排序
                    // created_at:'desc'
                },
                {
                    // sort: 'desc', // 按id正序排序
                    created_at: 'desc'
                }
            ],
            // include: includes,
            // select: { // 只返回指定的字段
            //     username: true,
            //     account: true,
            // },
        }),
        prisma.link.count({
            where,
        }),
    ])
    const list = res1
    // .map((item) => {
    //     if (!item?.img) item.img = item.Product?.links?.[0]?.img || ''
    //     return {
    //         ...item,
    //         password: '',
    //     }
    // })
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
export const setLinkCreate = defineEventHandler(async event => {
    // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<Prisma.LinkCreateInput>(event)

    if (!param?.title) return { msg: '标题不能为空' }

    const res = await prisma.link.create({
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
export const setLinkUpdate = defineEventHandler(async event => {
    // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<{ id: number } & Prisma.LinkUpdateInput>(event)

    if (!param?.id) return { msg: '缺少参数id' }
    if (!param?.title) return { msg: '标题不能为空' }

    const res = await prisma.link.update({
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
export const setLinkDelete = defineEventHandler(async event => {
    // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<{ id: number }>(event)

    if (!param?.id) return { msg: '缺少参数id' }

    const res = await prisma.link.delete({
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
