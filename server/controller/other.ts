import type { H3Event } from 'h3'
import { ResponseMessage } from '~/config/message'

/**
 * 获取关于我们、联系我们的内容
 */
export const getOtherInfo =defineEventHandler( async event => {
    // const url = getRequestURL(event)
    // // /api/page**的接口，跳过登录校验
    // if (!url.pathname.includes('/api/page')) {
    //     // 接口校验(是否登录)
    //     if (!event.context.user) return ResponseMessage.token
    // }

    // 获取参数
    const param = await getEventParams<{ type: string }>(event)

    if (!param?.type) return { msg: '不存在记录' }

    const res = await prisma.other.findFirst({
        where: {
            type: param.type,
        },
    })
    return { code: 200, data: res }
})

/**
 * 修改
 */
export const setOtherUpdate =defineEventHandler( async event => {
    // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<IOtherInfoUpdate>(event)

    if (!param?.type) return { msg: '缺少参数type' }
    // if (!param.title) return { msg: '菜单名称不能为空' }
    // if (!param.href) return { msg: '链接地址不能为空' }

    const update = {
        title: param?.title||'',
        title_en: param?.title_en||'',
        content: param?.content||'',
        content_en: param?.content_en||'',
        subtitle: param?.subtitle||'',
        subtitle_en: param?.subtitle_en||'',
        img: param?.img || '',
    }

    const res = await prisma.other.upsert({
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
