import type { Admin } from "@prisma/client"

/**
 * 设置用户登录信息，token相关
 * @returns user information
 */
export function useUserState() {
    // const token = useState<string>('token', () => {
    //     return process.client ? useSessionStorage('token', '') : ''
    // })
    const token = useCookie('token')

    const userInfo = useState<Partial<Admin>>('userInfo', () => ({}))

    const setToken = (token: string) => {
        useSessionStorage('token', token)
        userInfo.value = {}
    }

    // 设置用户信息
    const setUserInfo=async()=>{
        const res=await useServerFetch('/api/v1/user/info')
        if(res.code===200){
            userInfo.value=res.data
        }else{
            userInfo.value={}
        }
    }

    return {
        token,
        userInfo,
        setToken,
        setUserInfo
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
