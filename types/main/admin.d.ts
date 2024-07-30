// 修改密码
declare interface IAdminPasswordUpdate {
    account?: string
    password: string
    newPassword: string
}

/**
 * 管理员列表参数
 */
declare interface IAdminListParams extends IListPage {
    account: string
    username: string
    status: string | number
}

/**
 * 产品列表查询参数
 */
declare interface IProductListParams extends IListPage {
    title: string

    status: string | number
}


/**
 * 关于我们、 联系我们、合作伙伴、招聘、服务
 */
declare type IOtherType = 'about' | 'organization' | 'culture' | 'recruit' | 'recruit-notice' | 'recruit-cultivate' | 'service-mend' | 'message'


/**
 * 修改关于我们、联系我们 - 请求参数
 */
declare interface IOtherInfoUpdate {

    // id?: number,
    title?: string,  // 标题
    title_en?: string,  // 标题
    subtitle?: string,  // 标题
    subtitle_en?: string,  // 标题
    img: string; // 图片地址

    content: string; // 内容
    content_en: string; // 内容

    type: IOtherType    // 类型 关于我们、联系我们、合作伙伴
}



/**
 * 链接类型：外链、轮播图、文件、荣誉、 合作伙伴、公司介绍
 */
declare type ILinkType = 'link' | 'banner' | 'file' | 'honor' | 'cooper' | 'company' 
