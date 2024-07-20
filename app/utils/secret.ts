// 前后端共用签名加密方式   //////////////////////////////////
/**
 * 签名加密 加密规则： 使用字符串中的数字转对应的进制，从而实现加密的效果
 * @param {string} str 用于混入密钥的字符串（一般用时间戳）
 * @returns 加密后的字符串
 * @example
 * ```javascript
 * setSignRule(new Date().getTime().toString())    // 50m1mr0k7505976d
 * ```
 */
export const setSignRule = (str: string | number) => {
    // 去除非数字字符
    const numStr = str.toString().replace(/\D+/g, '').trim()
    // 控制数字长度在13位（避免转数字类型时精度丢失），
    const numStr2 = numStr.padEnd(13, '5').slice(0, 13)

    // 将字符串反转（时间戳前面部分是同样的，进行反转能减少相似），然后转成数字类型
    const num = Number(numStr2.split('').reverse().join(''))

    // 加密，使用数字对应的32进制+16进制
    const s = `${num.toString(32)}${num.toString(16)}`

    // 返回一个16位数的字符串
    return s.substring(0, 16)
}
