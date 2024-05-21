import { ResponseMessage } from '~/config/message'

/**
 * 获取公司信息
 */
export const getSystemInfo = defineEventHandler(async (event) => {
    // // 接口校验
    // const authSign = await useVerifySign(event)
    // if (!authSign) return ResponseMessage.sign

    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    // const param = await getEventParams<LoginDataType>(event)
    //    const res=await prisma.system.findFirst()
    //    console.log(res)
    const p = getRequestURL(event)
    console.log(p)

    const [res1, res2] = await Promise.all([
        prisma.system.findUnique({ where: { id: 1 } }),
        prisma.system.findUnique({ where: { id: 2 } }),
    ])
    // console.timeEnd('timeout')
    if (res1 && res2) {
        return {
            code: 200,
            data: {
                ...res1,
                company_en: res2.company,
                title_en: res2.title,
                address_en: res2.address,
                filing_en: res2.filing,
                // copyright_en: res2.copyright,
            },
        }
    } else {
        return { msg: '获取数据有误' }
    }
})

/**
 * 修改公司信息
 */
export const setSystemInfo = defineEventHandler(async (event) => {
    // // 接口校验
    // const authSign = await useVerifySign(event)
    // if (!authSign) return ResponseMessage.sign

    if (!event.context.user) return ResponseMessage.token

    // 获取参数 ISystemEditParams
    const param = await getEventParams<ISystemEditParams>(event)
    console.log(param)
    if (!param?.company) return { msg: '公司名称不能为空' }

    const [res1, res2] = await Promise.all([
        prisma.system.update({
            data: {
                company: param.company,
                title: param.title,
                address: param.address,
                logo: param.logo,
                wx_code: param.wx_code,
                phone: param.phone,
                email: param.email,
                keyword: param.keyword,
                description: param.description,
                filing: param.filing,
                icon: param.icon,
                is_en: !!param.is_en,
            },
            where: { id: 1 },
        }),
        prisma.system.update({
            data: {
                // title: param.title_en,
                company: param.company_en,
                address: param.address_en,
                // logo: param.logo,
                // logo2: param.logo2,
                // qr_code: param.qr_code,
                // phone: param.phone,
                // email: param.email,
                // seo_keyword: param.seo_keyword,
                // seo_description: param.seo_description,
                filing: param.filing_en,
                // copyright: param.copyright_en,
                // welcome: param.welcome_en,
            },
            where: { id: 2 },
        }),
    ])
    if (res1 && res2) {
        return {
            code: 200,
            msg: '设置成功',
        }
    } else {
        return { msg: '获取数据有误' }
    }
})
