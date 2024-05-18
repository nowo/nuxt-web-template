/**
 * 设置用户登录信息，token相关
 * @returns user information
 */
export function useUserState() {
    // const token = useState<string>('token', () => {
    //     return process.client ? useSessionStorage('token', '') : ''
    // })
    const token = useCookie('token')

    const userInfo = useState<any>('userInfo', () => ({}))

    const setToken = (token: string) => {
        useSessionStorage('token', token)
        userInfo.value = {}
    }

    return {
        token,
        userInfo,
        setToken,
    }
}

/**
 * 系统信息
 * @methods getSystemInfo 获取系统信息
 * @methods setSystemUpdate 更新系统信息
 */
export const useSystemState = () => {
    const systemInfo = ref<ISystemInfoData>()

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
