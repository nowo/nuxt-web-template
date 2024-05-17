import { defu } from 'defu'
import type { UseFetchOptions } from 'nuxt/app'
import type { NitroFetchRequest } from 'nitropack'

interface ResponseDataType<T> {
    code: number
    data: T
    msg: string
}

/**
 * useFetch二次封装，增加token和签名
 * @param url
 * @param options
 * @returns useFetch
 */
export async function useCustomFetch<T>(url: NitroFetchRequest, options: UseFetchOptions<ResponseDataType<T>> = {}) {
    const time = Date.now().toString()
    const sign = await setSignRule(time)
    const headers: HeadersInit = { 'x-sign': `${sign}-${time}` }

    // cookie会自动发送到后端，所以这里不传token也可以
    // const token = useCookie('token')
    // if (token.value) headers.Authorization = `Bearer ${token.value}`

    const defaults: UseFetchOptions<ResponseDataType<T>> = {
        // cache request
        key: url as string,
        // set user token if connected
        headers,
        onResponse(_ctx) {
            // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
        },
        onResponseError(_ctx) {
            // throw new myBusinessError()
        },
    }

    // for nice deep defaults, please use unjs/defu
    const params = defu(options, defaults)

    return useFetch(url, params)
}
