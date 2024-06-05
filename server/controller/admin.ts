import type { Prisma } from '@prisma/client'

export function getAdminList() {
    if (1) {
        return 123132
    }
    return false
}

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
    const userInfo=event.context.user
    if(!userInfo) return 



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

    if (user){
        // 可以进行cookie清除
        return { code: 200, msg: '修改成功' }
    }else{
        return { msg: '网络错误' }
    }
})
