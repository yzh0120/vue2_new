import dayjs from "dayjs";
import XEUtils, {
  toNumber
} from "xe-utils";

/**
 * 深度克隆
 * @param {*} target 
 * @returns 
 */
export function deepClone(target) {
  return XEUtils.clone(target, true);
}

/**
 * 格式化金额
 * @param {string | number} val 需要格式化的值
 * @param {number} digits 保留几位小数，默认2位
 * @returns XEUtils.commafy(1000000.5678, { digits: 2 }) // '1,000,000.57'
 */
export function formatMoney(val, digits = 2) {
  if (val !== "" && val !== undefined && val !== null) {
    return XEUtils.commafy(toNumber(val), {
      digits: digits
    })
  }
  return ""
}

/**
 * 字符串每隔4位用空格分隔
 * @param {string} val 
 * @param {number} spaceNumber 分割位数
 * @param {string} separator 分隔符
 * @returns XEUtils.commafy('6660000000000001', {spaceNumber: 4, separator: ' '}) // '6660 0000 0000 0001'
 */
export function formatSpace(val, spaceNumber = 4, separator = " ") {
  if (val !== "" && val !== undefined && val !== null) {
    return XEUtils.commafy(val, {
      spaceNumber: spaceNumber,
      separator: separator
    })
  }
  return ""
}

/**
 * 格式化时间
 * @param {datetime} date 传入的时间
 * @param {string} format 格式化的时间类型
 * @returns XEUtils.toDateString(new Date(), 'yyyy-MM-dd HH:mm:ss')  //'2017-01-01 14:05:30'
 *  yy	年份	自动截取后两位	
    yyyy	年份		
    M	月份		1~12
    MM	月份	自动补0	01~12
    d	日		1~31
    dd	日	自动补0	01~31
    h	12小时制		1~12
    hh	12小时制	自动补0	01~12
    H	24小时制		0~23
    HH	24小时制	自动补0	00~23
    m	分钟		
    mm	分钟	自动补0	00~59
    s	秒		
    ss	秒	自动补0	00~59
    S	毫秒		
    SSS	毫秒	自动补0	
    a	am/pm，小写		am/pm
    A	AM/PM，大写		AM/PM
    D	年份的第几天		1~366
    DDD	年份的第几天	自动补0	001~366
    e	星期几		0~6
    E	星期几		1~7
    q	季度		1~4
    W	年的第几周		1~53
    WW	年的第几周	自动补0	
    Z	时区值		[+-]HH:mm
    ZZ	时区值		[+-]HHmm
 */
export function formatDate(date, format = "yyyy-MM-dd") {
  if (date) {
    // var date = new Date(date.replace(/-/g, "/").replace(/T/g, " "))
    return XEUtils.toDateString(date, format)
  }
  return "";
}


/**
 * 数字加法
 * @param {number} num1 
 * @param {number} num2 
 * @returns 
 */
export function add(num1, num2) {
  return XEUtils.add(num1, num2)
}

/**
 * 数字减法
 * @param {number} num1 
 * @param {number} num2 
 * @returns 
 */
export function subtract(num1, num2) {
  return XEUtils.subtract(num1, num2)
}

/**
 * 数字乘法
 * @param {number} num1 
 * @param {number} num2 
 * @returns 
 */
export function multiply(num1, num2) {
  return XEUtils.multiply(num1, num2)
}

/**
 * 数字除法
 * @param {number} num1 
 * @param {number} num2 
 * @returns 
 */
export function divide(num1, num2) {
  if (num2 !== 0) {
    return XEUtils.divide(num1, num2)
  } else {
    return 0
  }
}

/**
 * 集合分组,默认使用键值分组,如果有 iterate 则使用结果进行分组
 * @param {number} num1 
 * @param {number} num2 
 * @returns 
 */
export function groupBy(data, key) {
  if (data && key) {
    return XEUtils.groupBy(data, key)
  } else {
    return []
  }
}

/////////////////////////////////////////////////////////////////////////////////////

/**
 * 返回指定单位下两个日期时间之间的差异。
 * @param {*} val1 需要比较的日期（传入的日期）
 * @param {*} val2 目标日期，默认为当天
 * @param {*} type 返回的日期格式（day,week,quarter,month,year,hour,minute,second,millisecond）
 * @returns dayjs('2019-01-25').diff('2019-01-26', 'day') //-1
 */
export function datediff(val1, val2 = dayjs(), type = "day") {
  if (val1 && val2) {
    return dayjs(val1).diff(val2, type)
  }
}

/**
 * 返回增加一定时间的复制的 Day.js 对象
 * @param {*} date 目标日期，默认为当天
 * @param {*} number 需要增加的数值
 * @param {*} type 需要增加的类型（day,week,quarter,month,year,hour,minute,second,millisecond）
 * @param {*} number 需要格式化的类型，默认为YYYY-MM-DD
 * @returns dayjs().add(7, 'day').format("YYYY-MM-DD") //"2021-08-27"
 * YY	18	两位数的年份
  YYYY	2018	四位数的年份
  M	1-12	月份，从 1 开始
  MM	01-12	月份，两位数
  MMM	Jan-Dec	缩写的月份名称
  MMMM	January-December	完整的月份名称
  D	1-31	月份里的一天
  DD	01-31	月份里的一天，两位数
  d	0-6	一周中的一天，星期天是 0
  dd	Su-Sa	最简写的星期几
  ddd	Sun-Sat	简写的星期几
  dddd	Sunday-Saturday	星期几
  H	0-23	小时
  HH	00-23	小时，两位数
  h	1-12	小时, 12 小时制
  hh	01-12	小时, 12 小时制, 两位数
  m	0-59	分钟
  mm	00-59	分钟，两位数
  s	0-59	秒
  ss	00-59	秒 两位数
  SSS	000-999	毫秒 三位数
  Z	+05:00	UTC 的偏移量，±HH:mm
  ZZ	+0500	UTC 的偏移量，±HHmm
  A	AM PM	
  a	am pm
 */
export function addDate(number, type = "day", date = dayjs(), formatType = "YYYY/MM/DD") {
  if (date) {
    return dayjs(date).add(number, type).format(formatType)
  }
}

/**
 * 返回减去一定时间的复制的 Day.js 对象
 * @param {*} date 目标日期，默认为当天
 * @param {*} number 需要减去的数值
 * @param {*} type 需要减去的类型（day,week,quarter,month,year,hour,minute,second,millisecond）
 * @param {*} number 需要格式化的类型，默认为YYYY-MM-DD
 * @returns dayjs().subtract(7, 'day').format("YYYY-MM-DD") //"2021-08-13"
 */
export function subtractDate(date = dayjs(), number, type = "day", formatType = "YYYY-MM-DD") {
  if (date) {
    return dayjs(date).subtract(number, type).format(formatType)
  }
}

//////////////////////////////////////////////////////////////////////////////////自定义
/**
 * Number formatting对文件大小进行转换为K,M,G,T,P,E
 * like 10000 => 10k
 * @param {number} num 文件大小数值
 * @param {number} digits 保留的小数位数
 */
export function numberFormatter(num, digits) {
  const si = [{
      value: 1E18,
      symbol: 'E'
    },
    {
      value: 1E15,
      symbol: 'P'
    },
    {
      value: 1E12,
      symbol: 'T'
    },
    {
      value: 1E9,
      symbol: 'G'
    },
    {
      value: 1E6,
      symbol: 'M'
    },
    {
      value: 1E3,
      symbol: 'k'
    }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}


/**
 * 生成唯一的随机数
 * @returns 
 */
export function guid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}


/**
 * 对手机号码，身份证部分数字加*号处理
 * @param {string} str 
 * @param {number} s 开始下标
 * @param {number} e 截止下标
 * @returns 
 */
export function starReplace(str, s, e) {
  if (!str) return str;

  var _k = !!e && e != 0 ? str.substring(s, e) : str.substring(s);

  var _v = "";

  for (var i = 0; i < _k.length; i++) _v += "*";
  return str.replace(_k, _v);
}

/**
 * 小写金额转为大写
 * @param {String} money 
 * @returns 
 */
export function convertCurrency(money) {
  //汉字的数字
  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
  //基本单位
  var cnIntRadice = new Array('', '拾', '佰', '仟');
  //对应整数部分扩展单位
  var cnIntUnits = new Array('', '万', '亿', '兆');
  //对应小数部分单位
  var cnDecUnits = new Array('角', '分', '毫', '厘');
  //整数金额时后面跟的字符
  var cnInteger = '整';
  // var cnInteger = '';
  //整型完以后的单位
  var cnIntLast = '元';
  //最大处理的数字
  var maxNum = 999999999999999.9999;
  //金额整数部分
  var integerNum;
  //金额小数部分
  var decimalNum;
  //输出的中文金额字符串
  var chineseStr = '';
  //分离金额后用的数组，预定义
  var parts;
  if (money === '' || money === null || money === undefined) {
    return '';
  }
  money = parseFloat(money);
  if (money >= maxNum) {
    //超出最大处理数字
    return '';
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  //转换为字符串
  money = money.toString();
  if (money.indexOf('.') == -1) {
    integerNum = money;
    decimalNum = '';
  } else {
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0;
    var IntLen = integerNum.length;
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1);
      var p = IntLen - i - 1;
      var q = p / 4;
      var m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        //归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  //小数部分
  if (decimalNum != '') {
    var decLen = decimalNum.length;
    for (var i = 0; i < decLen; i++) {
      var n = decimalNum.substr(i, 1);
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      } else {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == '') {
    chineseStr += cnInteger;
  }
  return chineseStr;
}



/**
 * 类型
 * @param {string} str 
 * @returns 
 */
export function type(data) {
  let res = Object.prototype.toString.call(data).slice(8, -1)
  if (res == 'String') {
    return "str"
  } else if (res == 'Number') {
    return "num"
  } else if (res == 'Boolean') {
    return "boo"
  }
  // else if (res == 'Null'){
  // 	return "null"
  // }
  else if (res == 'Undefined' || res == 'Null') {
    return "und"
  } else if (res == 'Object') {
    return "obj"
  } else if (res == 'Function') {
    return "fn"
  } else if (res == 'Date') {
    return "date"
  } else if (res == 'RegExp') {
    return "reg"
  } else if (res == 'Array') {
    return "arr"
  }
}
