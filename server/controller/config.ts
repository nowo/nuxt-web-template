import { Prisma } from '@prisma/client'
import type { H3Event } from 'h3'
import { ResponseMessage } from '~/config/message'

/**
 * 获取配置信息
 */
export const getConfigInfo = defineEventHandler(async event => {
    // const url = getRequestURL(event)
    // // /api/page**的接口，跳过登录校验
    // if (!url.pathname.includes('/api/page')) {
    //     // 接口校验(是否登录)
    //     if (!event.context.user) return ResponseMessage.token
    // }

    // 获取参数
    const param = await getEventParams<{ type: string }>(event)

    if (!param?.type) return { msg: '不存在记录' }

    const res = await prisma.config.findUnique({
        where: {
            type: param.type,
        },
    })
    return { code: 200, data: res }
})

/**
 * 修改配置信息
 */
export const setConfigUpdate = defineEventHandler(async event => {
    // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<IConfigInfoUpdate>(event)

    if (!param?.type) return { msg: '缺少参数type' }
    // if (!param.title) return { msg: '菜单名称不能为空' }
    // if (!param.href) return { msg: '链接地址不能为空' }

    const update: Prisma.ConfigUpsertArgs['create'] = {
        title: param?.title || '',
        name: param?.name || '',
        content: param?.content || '',
        email: param?.email || '',
        port: param?.port || 0,
        password: param?.password || '',
        img: param?.img || '',
        href: param?.href || '',
        status: param?.status || 0,
        type: param?.type,
    }


    const res = await prisma.config.upsert({
        where: {
            type: param.type,
        },
        update: {
            ...update,
        },
        create: {
            ...update,
            type: param.type,
        },
    })

    if (res) {
        return { code: 200, msg: '修改成功' }
    } else {
        return { msg: '网络错误' }
    }
})
