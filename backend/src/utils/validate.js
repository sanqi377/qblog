/**
 * 格式校验工具方法 License By http://eleadmin.com
 */
export default {
    /* 是否是手机号 */
    isPhone(value) {
        const reg = /^1\d{10}$/;
        return reg.test(value);
    },
    /* 是否为固话 */
    isTel(value) {
        const reg = /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?$/;
        return reg.test(value);
    },
    /* 是否是邮箱 */
    isEmail(value) {
        const reg = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return reg.test(value);
    },
    /* 是否是网址 */
    isUrl(value) {
        const reg = /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/;
        return reg.test(value);
    },
    /* 是否是数字 */
    isNumber(value) {
        /*const reg = /^1\d{10}$/;
        return reg.test(value);*/
        return !isNaN(value);
    },
    /* 是否是日期 */
    isDate(value) {
        const reg = /^(\d{4})[-/](\d{1}|0\d{1}|1[0-2])([-/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/;
        return reg.test(value);
    },
    /* 是否是身份证 */
    isIdentity(value) {
        const reg = /(^\d{15}$)|(^\d{17}(x|X|\d)$)/;
        return reg.test(value);
    },
    /* 是否是整数 */
    isDigits(value) {
        const reg = /^-?\d+$/;
        return reg.test(value);
    },
    /* 是否是正整数 */
    isDigitsP(value) {
        const reg = /^[1-9]\d*$/;
        return reg.test(value);
    },
    /* 是否是负整数 */
    isDigitsN(value) {
        const reg = /^-[1-9]\d*$/;
        return reg.test(value);
    },
    /* 是否是非负整数(正整数或0) */
    isDigitsPZ(value) {
        const reg = /^\d+$/;
        return reg.test(value);
    },
    /* 是否是非正整数(负整数或0) */
    isDigitsNZ(value) {
        const reg = /^-[1-9]\d*|0/;
        return reg.test(value);
    },
    /* 验证最小长度、最大长度 */
    maxMinLength(value, minLength, maxLength) {
        if (value === undefined || value === null) return !minLength;
        if (minLength && value.toString().length < minLength) return false;
        return !(maxLength !== undefined && maxLength !== null && value.toString().length > maxLength);
    },
    /* 验证最小值、最大值 */
    maxMin(value, min, max) {
        if (value === undefined || value === null) return min === undefined || min === null;
        if (min !== undefined && min !== null && value < min) return false;
        return !(max !== undefined && max !== null && value > max);
    },
    /* 是否是中文 */
    isChina(value) {
        const reg = /^[\u4E00-\u9FA5]{2,4}$/;
        return reg.test(value);
    },
    /* 是否是端口号 */
    isPort(value) {
        const reg = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
        return reg.test(value);
    },
    /* 是否是IP */
    isIP(value) {
        const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        return reg.test(value);
    },
    /* 是否是经度 -180.0～+180.0（整数部分为0～180，必须输入1到5位小数） */
    isLongitude(value) {
        const reg = /^[-|+]?(0?\d{1,2}\.\d{1,5}|1[0-7]?\d{1}\.\d{1,5}|180\.0{1,5})$/;
        return reg.test(value);
    },
    /* 是否是纬度 -90.0～+90.0（整数部分为0～90，必须输入1到5位小数） */
    isLatitude(value) {
        const reg = /^[-|+]?([0-8]?\d{1}\.\d{1,5}|90\.0{1,5})$/;
        return reg.test(value);
    },
    /* 是否是身份证(强校验) */
    isIdentityStrong(value) {
        if (!this.isIdentity(value)) return '身份证号码格式错误';
        const ai = value.length === 18 ? value.substring(0, 17) : (value.substring(0, 6) + '19' + value.substring(6, 15));
        // 验证出生年月
        const year = ai.substring(6, 10);  // 年
        const birthday = year + '/' + ai.substring(10, 12) + '/' + ai.substring(12, 14);
        if (!this.isDate(birthday)) return '身份证号码出生日期无效';
        const now = new Date();
        if ((now.getFullYear() - parseInt(year)) > 150 || (now.getTime() - new Date(birthday).getTime()) < 0)
            return '身份证号码出生日期不在有效范围';
        // 验证地区码
        const areaCodes = ['11', '12', '13', '14', '15', '21', '22', '23',
            '31', '32', '33', '34', '35', '36', '37', '41', '42', '43', '44', '45', '46',
            '50', '51', '52', '53', '54', '61', '62', '63', '64', '65', '71', '81', '82', '91'];
        if (areaCodes.indexOf(ai.substring(0, 2)) === -1) return '身份证号码地区编码错误';
        // 验证最后一位
        if (value.length === 18) {
            const valCode = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
            const wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            let totalMulAiWi = 0;
            for (let i = 0; i < 17; i++) totalMulAiWi += parseInt(ai.charAt(i)) * wi[i];
            if (value !== (ai + valCode[totalMulAiWi % 11])) return '身份证号码最后一位错误';
        }
    }
}