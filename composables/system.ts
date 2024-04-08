/**
 * 设置用户登录信息，token相关
 * @returns
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
