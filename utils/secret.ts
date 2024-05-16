import * as jose from 'jose'

// 前后端共用签名加密方式   //////////////////////////////////
/**
 * 签名加密 加密规则： jwt加密字符串
 * @param {string} str 用于混入密钥的字符串（一般用时间戳）
 * @returns 加密后的字符串
 * @example
 * ```javascript
 * setSignRule(new Date().getTime().toString())    // NQcjY3X1lpYmpQS0
 * ```
 */
export const setSignRule = async (str: string) => {
    // 加密,转成`{key:value}`对象，进行jwt加密
    const encodeSecret = new TextEncoder().encode(str)
    const s1 = await new jose.SignJWT({ t: str }).setProtectedHeader({ alg: 'HS256' }).sign(encodeSecret)
    // 第二次加密（取得一次加密后的最后一部分）
    const arr = s1.split('.')
    // return arr[2]
    const s2 = await new jose.SignJWT({ t: arr[2] }).setProtectedHeader({ alg: 'HS256' }).sign(encodeSecret)
    //     console.log('s2 :>> ', s2);
    const s3 = s2.split('.')[1]
    // 字符串的长度是足够的(68位)，从10位开始截取，返回16位数的字符串
    return s3.substring(10, 26)
}
