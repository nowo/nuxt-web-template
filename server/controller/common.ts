/**
 * 修改公司信息
 */
export const setSaveFile = defineEventHandler(async (event) => {
    const { host } = useRuntimeConfig()

    const files = await readFormData(event)
    console.log('files :>> ', files)
    const t = files.get('data') as string
    console.log('0 :>> ', t)
    console.log(JSON.parse(t))
    return JSON.parse(t)

    // console.log(1111)
    // // // 接口校验
    // // const authSign = await useVerifySign(event)
    // // if (!authSign) return ResponseMessage.sign

    // // if (!event.context.user) return ResponseMessage.token
    // const { file } = await readBody<{ file: File }>(event)
    // console.log('file :>> ', file)
    // if (!file) return 'no file'

    // const date = new Date()
    // // 根据时间生成文件夹
    // // const dateDir = date.toLocaleDateString('zh-cn') // 2023/01/02
    // const dateDir = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    // const randomStr = Math.random().toString(36).substring(2, 6 + 2) // 随机字符串6位
    // const fileDir = `/upload/${dateDir}`
    // const res = await storeFileLocally(
    //     file.content, // the stringified version of the file
    //     `${date.getTime() + randomStr}`, // 使用时间戳+随机字符串，作为文件名
    //     fileDir, // 根据时间生成文件夹
    // )
    // console.log(res)

    // // {OR}

    // // Parses a data URL and returns an object with the binary data and the file extension.
    // const { binaryString, ext } = parseDataUrl(file.content)

    // console.log('{ binaryString :>> ', binaryString)
    // console.log('ext } :>> ', ext)
    // if (res) return `${host + fileDir}/${res}`
    // return res
})
