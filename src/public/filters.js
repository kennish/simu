// 货币格式化 参数说明 value=值 currency=单位 bianhao=前置单位如+- decimals=小数点位数 round=四舍五入或截取
const digitsRE = /(\d{3})(?=\d)/g
export function currency (value, currency, bianhao, decimals, round) {
  let fuhao = ''
  if (bianhao) {
    if (value > 0) {
      fuhao = '+'
    } else if (value < 0) {
      fuhao = '-'
    }
  }
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return '--'
  currency = currency != null ? currency : ''
  decimals = decimals != null ? decimals : 2
  var stringified = null
  if (round) {
    // 保留两位小数点 不做四舍五入
    var weishu = '1'
    for(var n=0; n<decimals; n++){
      weishu += '0'
    }
    stringified = (Math.floor( (value * parseFloat(weishu) )) / parseFloat(weishu)).toString()  // 先乘以保留的位数再取整，再除以保留位数
  } else {
    // 四舍五入
    stringified = Math.abs(value).toFixed(decimals)
  }
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  
  return  fuhao + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float + currency
}

// 转换成中国数字
export function cnNumber (money) {
  //汉字的数字  
  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');  
  //基本单位  
  var cnIntRadice = new Array('', '拾', '佰', '仟');  
  //对应整数部分扩展单位  
  var cnIntUnits = new Array('', '万', '亿', '兆');  
  //对应小数部分单位  
  var cnDecUnits = new Array('角', '分', '毫', '厘');  
  //整数金额时后面跟的字符  
  var cnInteger = '';  
  //整型完以后的单位  
  var cnIntLast = '圆';  
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
  if (money == '') { return '--'; }  
  if (!money) { return '--'; }  
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
    decimalNum = parts[1].substr(0, 2);  // .substr(0, 4)
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

// 日期格式化
export function formatDate(date, format){
  if (typeof(date) == 'string') { return date }
  var o = {
  "M+" : date.getMonth()+1, //month
  "d+" : date.getDate(), //day
  "h+" : date.getHours(), //hour
  "m+" : date.getMinutes(), //minute
  "s+" : date.getSeconds(), //second
  "q+" : Math.floor((date.getMonth()+3)/3), //quarter
  "S" : date.getMilliseconds() //millisecond
  }
 if(/(y+)/i.test(format)) {
  format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
 for(var k in o) {
  if(new RegExp("("+ k +")").test(format)) {
  format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
  }
  }
  return format;
  }

// 金额单位换算
export function moneyUnits (x) {
  if (x != '--') {
    x=x/10000
    var y=x+"万"
    return y
  } else {
    return '--'
  }
}
