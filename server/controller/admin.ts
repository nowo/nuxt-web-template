import type { Prisma } from '@prisma/client'

/**
 * 登录
 */
export const setLoginSign = defineEventHandler(async (event) => {
    // 获取参数
    const param = await getEventParams<Prisma.AdminWhereUniqueInput>(event)

    if (!param?.account) return { msg: '请输入登录账号' }
    if (!param?.password) return { msg: '请输入登录密码' }

    const user = await prisma.admin.findUnique({
        where: {
            status: 1, // 1：启用
            account: param.account,
            // password: setEncryptPassword(param.password),
        },
    })

    // console.log('user', user)
    // // 密码变更
    // if (user) {
    //     await prisma.admin.update({
    //         data: {
    //             password: setEncryptPassword(param.password.trim()),
    //         },
    //         where: {
    //             id: user.id,
    //         },
    //     })
    //     return 'success'
    // }

    if (!user) {
        return { msg: '用户不存在' }
    } else {
        const { password, id, account, username } = user
        if (password !== setEncryptPassword(param.password as string)) return { msg: '密码错误' }
        const token = await createToken({ id, account, username })
        return {
            code: 200,
            data: {
                token,
            },
        }
    }
})

/**
 * 注册
 */
export const setRegister = defineEventHandler(async (event) => {
    // TODO 注册用户

    interface LoginDataType {
        account: string
        password: string
        username: string
    }
    // const method = getMethod(event)
    // const query = getQuery(event) as unknown as LoginDataType
    // const body = await readBody<LoginDataType>(event)
    // const param = method === 'GET' ? query : body

    // 接口校验
    // const authSign = await useVerifySign(event)
    // if (!authSign) return { msg: '签名错误' }

    // 获取参数
    const param = await getEventParams<Prisma.AdminCreateInput>(event)

    const username = param?.username?.trim?.() || ''
    const account = param?.account?.trim?.() || ''
    const password = param?.password?.trim?.() || ''

    if (!username) return { msg: '请输入用户名' }

    if (!account) return { msg: '请输入登录账号' }
    if (!password) return { msg: '请输入登录密码' }
    // TODO 可以进行密码强度校验

    const user = await prisma.admin.create({
        data: {
            username,
            account,
            password: setEncryptPassword(password),
        },
    })

    if (user) {
        return { code: 200, data: { account: user.account, username: user.username }, msg: 'success' }
    } else {
        return { msg: '注册失败，请稍后再试' }
    }
})

/**
 * 修改密码
 */
export const setPasswordUpdate = defineEventHandler(async (event) => {
    const userInfo = event.context.user
    if (!userInfo) return

    // 获取参数
    const param = await getEventParams<IAdminPasswordUpdate>(event)

    // const account = param?.account?.trim?.() || ''
    const password = param?.password?.trim?.() || ''
    const newPassword = param?.newPassword?.trim?.() || ''

    // if (!account) return { msg: '请输入登录账号' }
    if (!password) return { msg: '请输入登录密码' }

    // 查询原密码是否正确
    const admin = await prisma.admin.findUnique({
        where: {
            id: userInfo.id,
            password: setEncryptPassword(password),
        },
    })
    if (!admin) return { msg: '原密码错误' }
    if (password === newPassword) return { msg: '新密码不能与原密码相同' }

    // 修改密码
    const user = await prisma.admin.update({
        data: {
            password: setEncryptPassword(newPassword),
        },
        where: {
            id: userInfo.id,
        },
    })

    if (user) {
        // 可以进行cookie清除
        return { code: 200, msg: '修改成功' }
    } else {
        return { msg: '网络错误' }
    }
})

/**
 * 用户登录账户信息
 */
export const getAdminInfo = defineEventHandler(async (event) => {
    const userInfo = event.context.user
    if (!userInfo) return
    const admin = await prisma.admin.findUnique({
        where: {
            id: userInfo.id,
        },
    })
    if (admin) {
        return { code: 200, data: { ...admin, password: '' } }
    } else {
        return { msg: '网络错误' }
    }
})

// 、、、/////////////////////////

/**
 * 获取用户列表
 */
export const getAdminList = defineEventHandler(async (event) => {
    // // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<IAdminListParams>(event)

    const where: Prisma.AdminWhereInput = {}

    if (param?.account) {
        where.account = {
            contains: param.account, // 包含
        }
    }
    if (param?.username) {
        where.username = {
            contains: param.username, // 包含
        }
    }

    if (typeof param?.status === 'number') {
        where.status = param.status
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
        prisma.admin.findMany({
            skip: pageSkip,
            take: pageSize,
            where,
            orderBy: {
                id: 'asc', // 按id正序排序
            },
            // select: { // 只返回指定的字段
            //     username: true,
            //     account: true,
            // },
        }),
        prisma.admin.count({
            where,
        }),
    ])
    const list = res1.map((item) => {
        return {
            ...item,
            password: '',
        }
    })
    if (res1) {
        return { code: 200, data: { list, total: res2 } }
    } else {
        return { code: 400, message: '查询失败' }
    }
})

/**
 * 创建用户
 */
export const setAdminCreate = defineEventHandler(async (event) => {
    // // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<Prisma.AdminCreateInput>(event)

    if (!param?.account) return { msg: '请输入登录账号' }
    if (!param?.username) return { msg: '请输入用户名称' }
    if (!param?.password) return { msg: '请输入登录密码' }

    const user = await prisma.admin.create({
        data: {
            ...param,
            status: param.status ? param.status : 1,
            password: setEncryptPassword(param.password?.trim()),
        },
    })

    if (user) {
        return { code: 200, msg: '添加成功' }
    } else {
        return { msg: '网络错误' }
    }
})

/**
 * 修改用户
 */
export const setAdminUpdate = defineEventHandler(async (event) => {
    // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<Prisma.AdminUncheckedCreateInput>(event)

    if (!param?.id) return { msg: '缺少参数id' }

    const user = await prisma.admin.update({
        data: {
            ...param,
            status: param.status ? param.status : 1,
            password: param.password ? setEncryptPassword(param.password) : undefined,
        },
        where: {
            id: param.id,
        },
    })

    if (user) {
        return { code: 200, msg: '修改成功' }
    } else {
        return { msg: '网络错误' }
    }
})

/**
 * 删除用户
 */
export const setAdminDelete = defineEventHandler(async (event) => {
    // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<{ id: number }>(event)

    if (!param?.id) return { msg: '缺少参数id' }

    const user = await prisma.admin.delete({
        where: {
            id: param.id,
        },
    })

    if (user) {
        return { code: 200, msg: '删除成功' }
    } else {
        return { msg: '网络错误' }
    }
})
