import type { Prisma } from '@prisma/client'
import { createTransport } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport'

// 发送邮件
export const sendMessageMail = async (option: SMTPTransport.Options) => {
    const res = await prisma.config.findUnique({
        where: {
            type: 'email',
        },
    })
    if (!res) {
        console.warn('未找到邮箱配置或未启用')
        // return { code: 404, msg: '未找到邮箱配置或未启用' }
        return
    }
    if (res.status !== 1) {
        // return { code: 404, msg: '未找到邮箱配置或未启用' }
        return
    }



    // 创建一个 SMTP 传输对象 
    const transporter = createTransport({
        service: res.title, //  SMTP 服务器地址
        port: Number(res.port), // SMTP端口号，通常SMTP over SSL的端口是465  
        //   secure: true, // 使用SSL连接  
        secure: true, // 如果使用 587 端口，设置为 false；如果使用 465 端口，设置为 true
        // secure:false,
        // secureConnection:false,
        auth: {
            user: res.email || '',  // 发送方邮箱地址
            pass: res.password || '', // 发送方邮箱密码（授权码，不是登录密码）
        },
    });

    // // 验证 SMTP 服务器连接
    // transporter.verify(function (error, success) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log("Server is ready to take our messages");
    //     }
    // });

    // return false

    // 邮件的内容选项配置 
    const mailOptions: SMTPTransport.Options = {
        from: `"${res.name}" <${res.email}>`, // 发件人的邮箱地址和名称  
        to: res.href || '', // 收件人的邮箱地址  
        // subject: '邮件主题', // 邮件的标题  
        // text: '纯文本内容', // 邮件的纯文本内容（如果同时定义了html，则html会被优先使用）  
        // html: '<h1>HTML内容</h1>', // 邮件的HTML内容  
        // // 如果需要添加附件，可以定义attachments数组  
        // attachments: [
        //     {
        //         filename: '附件1.jpg', // 附件的文件名  
        //         path: '附件1的本地路径或URL', // 附件的本地文件路径或网络URL  
        //         cid: 'myImage1', // CID，用于在HTML内容中引用该图片  
        //     },
        //     {
        //         filename: '附件2.docx',
        //         path: '附件2的本地路径或URL',
        //         cid: 'myDocument',
        //     },
        //     // 可以继续添加更多附件...  
        // ],
        ...option
    };
    // console.log(mailOptions)
    // 发送邮件  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            // 如果发送邮件过程中出错，则打印错误信息  
            console.error('发送邮件时出错:', error);
            return;
        }
        // 如果邮件发送成功，则打印相关信息  
        console.log('邮件发送成功:', info);
        // info对象包含了邮件发送的详细信息，如messageId等  
    });
}


// banner

/**
 * 列表查询
 * @param event
 * @returns
 */
export const getMessageList = defineEventHandler(async event => {
    // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<{ status: number, title: string } & IListPage>(event)

    // if (!param?.type) return { msg: '请传递类型' }

    const where: Prisma.MessageWhereInput = {

    }

    if (param?.title) where.title = { contains: param.title }

    // 状态，判断是否为数字
    if (/^\d+$/.test(param?.status?.toString() || '')) where.status = Number(param?.status)

    // 查询菜单姓"张"，1页显示20条
    let page: number | undefined
    let pageSize: number | undefined
    let pageSkip: number | undefined

    if (param?.isPage) {
        page = Number(param.page || 1)
        pageSize = Number(param.pageSize || 20)
        pageSkip = pageSize * (page - 1) || 0
    }

    const [res1, res2] = await Promise.all([
        prisma.message.findMany({
            skip: pageSkip,
            take: pageSize,
            where,
            orderBy: {
                created_at: 'desc', // 按id正序排序
            },
            // include: {
            //     Product: {
            //         include: {
            //             links: {
            //                 where: {
            //                     type: 1,
            //                 },
            //             },
            //         },
            //     },
            // },
            // select: { // 只返回指定的字段
            //     username: true,
            //     account: true,
            // },
        }),
        prisma.message.count({
            where,
        }),
    ])
    const list = res1
    if (res1) {
        return { code: 200, data: { list, total: res2 } }
    } else {
        return { code: 400, message: '查询失败' }
    }
})

/**
 * 新增
 * @param event
 * @returns
 */
export const setMessageCreate = defineEventHandler(async event => {
    // const url = getRequestURL(event)
    // // /api/page**的接口，跳过登录校验
    // if (!url.pathname.includes('/api/page')) {
    //     // 接口校验(是否登录)
    //     if (!event.context.user) return ResponseMessage.token
    // }
    // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // sendMessageMail({})
    // return false

    // 获取参数
    const param = await getEventParams<Prisma.MessageCreateInput>(event)

    if (!param?.title) return { msg: '名称不能为空' }

    const res = await prisma.message.create({
        data: param,
    })

    if (res) {
        // 发送邮件
        sendMessageMail({
            subject: `[官网]客户：${res.title}的留言信息`, // 邮件的标题  
            text: `${res.content}\n\n时间：${res.created_at}\n名称：${res.title}\n邮箱：${res.email}\n电话：${res.phone}\n地址：${res.address}`, // 邮件的纯文本内容（如果同时定义了html，则html会被优先使用）  
            html: `
                <h3>${res.content}</h3>
                <hr />
                <p>时间：${res.created_at}</p>
                <p>名称：${res.title}</p>
                <p>邮箱：<b>${res.email}</b></p>
                <p>电话：${res.phone}</p>
                <p>地址：${res.address}</p>
            `, // 邮件的HTML内容 
            // attachments:[], // 附件
        })
        return { code: 200, msg: '添加成功' }
    } else {
        return { msg: '网络错误' }
    }
})

/**
 * 修改
 * @param event
 * @returns
 */
export const setMessageUpdate = defineEventHandler(async event => {
    // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<{ id: number } & Prisma.MessageUpdateInput>(event)

    if (!param?.id) return { msg: '缺少参数id' }
    if (!param?.title) return { msg: '标题不能为空' }

    const res = await prisma.message.update({
        data: param,
        where: {
            id: param.id,
        },
    })

    if (res) {
        return { code: 200, msg: '修改成功' }
    } else {
        return { msg: '网络错误' }
    }
})

/**
 * 删除
 * @param event
 * @returns
 */
export const setMessageDelete = defineEventHandler(async event => {
    // 接口校验(是否登录)
    // if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<{ id: number }>(event)

    if (!param?.id) return { msg: '缺少参数id' }

    const res = await prisma.message.delete({
        where: {
            id: param.id,
        },
    })

    if (res) {
        return { code: 200, msg: '删除成功' }
    } else {
        return { msg: '网络错误' }
    }
})
