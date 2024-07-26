import type { Admin } from '@prisma/client'

/**
 * 设置用户登录信息，token相关
 * @returns user information
 */
export const useUserState = () => {
    // const token = useState<string>('token', () => {
    //     return process.client ? useSessionStorage('token', '') : ''
    // })
    const token = useCookie('token')

    const userInfo = useState<Partial<Admin>>('userInfo', () => ({}))

    // if (!userInfo.value) {
    //     useCustomFetch<Admin>('/api/v1/system/info').then((res) => {
    //         if (res.data.value?.code === 200) {
    //             userInfo.value = res.data.value?.data
    //         }
    //     })
    //     // const { data: info, error, status } = await useCustomFetch<Admin>('/api/v1/system/info')
    //     // if (info.value?.code === 200) {
    //     //     userInfo.value = info.value?.data
    //     // }
    // }

    const setToken = (token: string) => {
        useSessionStorage('token', token)
        userInfo.value = {}
    }

    // 获取登录用户信息
    const setUserInfo = async () => {
        // 未登录，且不在客户端，则不执行
        if (!token.value || !import.meta.client) return
        const res = await useServerFetch<Admin>('/api/v1/user/info')

        if (res.code === 401) { // 账户登录失效
            ElMessage.error(res.msg)
            token.value = ''
            navigateTo('/admin/login')
        } else if (res.code === 200) {
            userInfo.value = res.data
        } else {
            userInfo.value = {}
        }
    }

    return {
        token,
        userInfo,
        setToken,
        setUserInfo,
    }
}

/**
 * 系统信息
 * @methods getSystemInfo 获取系统信息
 * @methods setSystemUpdate 更新系统信息
 */
export const useSystemState = async () => {
    const systemInfo = ref<ISystemInfoData>()
    if (!systemInfo.value) {
        const { data: info } = await useCustomFetch<ISystemInfoData>('/api/v1/system/info')
        if (info.value?.code === 200) {
            systemInfo.value = info.value?.data
        }
    }

    // 获取系统信息
    const getSystemInfo = async () => {
        const res = await useServerFetch('/api/v1/system/info')
        if (res.code !== 200) {
            ElMessage.error(res.msg)
        } else {
            systemInfo.value = res.data
        }
        return systemInfo
    }

    // 更新系统信息
    const setSystemUpdate = async (data: ISystemEditParams) => {
        const res = await useServerFetch('/api/v1/system/edit', { method: 'post', body: data })
        if (res.code !== 200) {
            ElMessage.error(res.msg)
            return false
        } else {
            getSystemInfo()
            return true
        }
    }

    return {
        systemInfo,
        getSystemInfo,
        setSystemUpdate,
    }
}
