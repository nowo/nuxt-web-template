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
