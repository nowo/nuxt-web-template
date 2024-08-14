import { mkdir, writeFile } from 'node:fs/promises'
import svgCaptcha from 'svg-captcha'

/**
 * 保存文件信息
 */
export const setSaveFile = defineEventHandler(async (event) => {
    const { host } = useRuntimeConfig()

    // const data = await readFormData(event)
    // const t = data.get('file') as string
    // return JSON.parse(t)

    const files = (await readMultipartFormData(event)) || []

    const dir = `public/upload`
    // 创建文件夹
    await mkdir(dir, { recursive: true })
    const list: string[] = []
    let filename = ''
    for (const item of files) {
        if (item.type) {
            filename = item.filename || ''
            // await createWriteStream()
            await writeFile(`${dir}/${filename}`, item.data as any, {
                flag: 'w',
            })
            list.push(`/upload/${filename}`)
        }
    }
    return {
        code: 200,
        data: {
            src: `/upload/${filename}`,
            list,
        },
        msg: '上传失败',
    }
    // await writeFile(`${location}${filelocation}/${filename}.${ext}`, binaryString, {
    //     flag: 'w',
    // })
    // return `${filename}.${ext}`

    // // // 接口校验
    // // const authSign = await useVerifySign(event)
    // // if (!authSign) return ResponseMessage.sign

    // // if (!event.context.user) return ResponseMessage.token
    // const { file } = await readBody<{ file: File }>(event)

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

    // // {OR}

    // // Parses a data URL and returns an object with the binary data and the file extension.
    // const { binaryString, ext } = parseDataUrl(file.content)

    // if (res) return `${host + fileDir}/${res}`
    // return res
})

/**
 * 删除文件
 */
export const setDeleteFile = defineEventHandler(async (event) => {
    const { host } = useRuntimeConfig()

    const files = await readFormData(event)

    const t = files.get('data') as string

    return JSON.parse(t)
})


/**
 * 保存文件信息
 */
export const setFileUpload = defineEventHandler(async (event) => {

    try {
        const form = await readFormData(event);
        console.log('form :>> ', form);
        // let list = form.getAll('files')
        // console.log('list :>> ', list);
        // return list
        // multiple
        // const files = await receiveFiles(form, {
        //     multiple: 3, // Max 20 files at a time for now
        //     ensure: {
        //         maxSize: '50MB', // Max 50 MB each file
        //         types: ['audio', 'csv', 'image', 'video', 'pdf', 'text'],
        //     },
        // });

        // for (const file of files) {
        //     await handleFileUpload(file);
        // }

        // single

        const [file] = await useFileVerify(form, {
            formKey: 'files',
            multiple: false,
            ensure: {
                maxSize: '25.6MB',
                types: ['audio', 'csv', 'image', 'video', 'pdf', 'text', 'zip', 'exe'],
            },
            lang: 'zh'
        });
        console.log('file :>> ', file);
        const date = new Date()
        // // 根据时间生成文件夹
        const dateDir = date.toLocaleDateString('zh-cn') // 2023/01/02
        // const dateDir = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
        const randomStr = Math.random().toString(36).substring(2, 6 + 2) // 随机字符串6位
        const fileDir = `/upload/${dateDir}`
        // randomStr
        let url = await useFileSave(file, `${Date.now()}${randomStr}`, fileDir);
        if (!url) return { code: 500, msg: '上传失败' }
        return { code: 200, msg: '上传成功', data: url }
    } catch (error: any) {
        console.log('error :>> ', error);
        return { code: 500, msg: error.message || '上传失败' }
    }


})

/**
 * 获取验证码
 */
export const getVerifyCode = defineEventHandler(async (event) => {

    const captcha = svgCaptcha.create();
    let key = Date.now()
    setCaptchaList('add', key, captcha.text)

    return {
        code: 200,
        data: {
            key, 
            code: captcha.data
        },
        msg: '获取成功'
    }
})