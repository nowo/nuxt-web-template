declare interface ILoginUserInfo {
    id: number // 用户id
    username: string // 用户名
    account: string // 昵称
}
declare interface ISystemInfoData {
    company: string // 公司名称
    logo: string // logo
    email: string // 邮箱
    phone: string // 联系电话
    address: string // 地址
    title: string // 标题
    keywords: string // 关键字
    description: string // 描述
    wx_code: string // 二维码
    icon: string // 网站图标
    is_en: boolean // 是否开启英文
    filing: string // 备案信息
    // copyright:string; // 版权信息
    hm_url:string   // 百度统计js文件地址

    company_en: string //
    address_en: string //
    filing_en: string //
    logo2: string // logo2(移动端)
}
/**
 * 修改系统信息请求参数
 */
declare interface ISystemEditParams {
    company: string // 公司名称
    logo: string // logo
    logo2: string // logo2(移动端)
    email: string // 邮箱
    phone: string // 联系电话
    address: string // 地址
    title: string // 标题
    keywords: string // 关键字
    description: string // 描述
    wx_code: string // 二维码
    icon: string // 网站图标
    is_en: boolean // 是否开启英文
    filing: string // 备案信息
    // copyright:string; // 版权信息
    hm_url:string   // 百度统计js文件地址

    company_en: string //
    address_en: string //
    filing_en: string //
}

/**
 * 系统信息-基础信息
 */
declare interface ISystemFormBasic {
    company: string // 公司名称
    address: string // 公司地址

    company_en: string
    address_en: string // 公司地址

    phone: string // 公司电话
    email: string // 公司邮箱

    logo: string // 网站logo
    logo2: string // 网站logo
    qr_code: string // 二维码
    filing: string // 备案号
    copyright: string // 版权信息
    filing_en: string // 备案号
    copyright_en: string // 版权信息

    icon: string // 网站图标
    is_en: boolean // 是否开启英文版
}

/**
 * 系统信息- SEO信息
 */
declare interface ISystemFormSeo {
    seo_title: string // 标题
    seo_keywords: string // 关键字
    seo_description: string // 描述
    hm_url:string // 百度统计地址
}

type LanguageType = 'cn' | 'en'
