/**
 * 身份证正则（大陆，香港，新加坡）
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function IDcard(rule, value, callback) {
  if (value) {
    //\!\@\#\$\%\^\&\*
    var reg = /^[A-Za-z0-9\(\)（）]+$/;
    if (reg.test(value) == false) {
      callback(new Error("只能输入数字和英文"));
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 * 手机号正则
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function mobile(rule, value, callback) {
  if (value) {
    var reg = /^1[3,4,5,6,7,8,9][0-9]\d{8}$/;
    if (reg.test(value) == false) {
      callback("请输入正确的手机号");
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 * 手机号和座机正则
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function mobileOrphone(rule, value, callback) {
  if (value) {
    var reg = /^1[3,4,5,6,7,8,9][0-9]\d{8}$/;
    var reg1 = /^[0][1-9]{2,3}-[0-9]{5,10}$/; //带区号
    if (reg.test(value) == false && reg1.test(value) == false) {
      callback("请输入正确的号码");
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 * 最大允许12位整数内以及6位小数
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function numLimit18_6(rule, value, callback) {
  if (value) {
    var reg = /^[1-9]\d{0,11}(\.\d{1,6})?$|^0(\.\d{1,6})?$/;
    if (reg.test(value) == false) {
      callback("最大允许12位整数以及6位小数");
    } else {
      callback();
    }
  } else {
    callback();
  }
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 企业名称正则
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function isCompany(rule, value, callback) {
  if (value) {
    var reg = /^[\u4e00-\u9fa5\(\)（）、\da-zA-Z&]{2,50}$/;
    if (reg.test(value) == false) {
      callback("企业名称格式不正确");
    } else {
      callback();
    }
  } else {
    callback();
  }
}


/**
 * 只允许中文、括号
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function onlyZH(rule, value, callback) {
  if (value) {
    var reg = /^[\u4e00-\u9fa5\（\）\(\)]+$/;
    if (reg.test(value) == false) {
      callback("请输入中文、括号");
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 * 只允许中文、括号、数字
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function ZHnumber(rule, value, callback) {
  if (value) {
    var reg = /^[\u4e00-\u9fa5\（\）\(\)\d]+$/;
    if (reg.test(value) == false) {
      callback("请输入中文、括号、数字");
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 * 正数、负数和小数
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function numberpoint(rule, value, callback) {
  if (value) {
    var reg = /^(\-|\+)?\d+(\.\d+)?$/;
    if (reg.test(value) == false) {
      callback("请输入正数、负数和小数");
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 * 正数和小数
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function positivenumberpoint(rule, value, callback) {
  if (value) {
    var reg = /^\d+(\.\d+)?$/;
    if (reg.test(value) == false) {
      callback("请输入正数和小数");
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 * 正数和小数 0-100
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function positivenumberpoint_0_100(rule, value, callback) {
  if (value) {
    var reg = /^\d+(\.\d+)?$/;
    if (reg.test(value) == false) {
      callback("请输入正数和小数");
    } else if (value > 100 || value < 0) {
      callback("请输入0-100的数字");
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 * 正数
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function positivenumber(rule, value, callback) {
  if (value) {
    var reg = /^\d+$/;
    if (reg.test(value) == false) {
      callback("请输入正数");
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 * 有两位小数的正实数
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function realnumber2point(rule, value, callback) {
  if (value) {
    var reg = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (reg.test(value) == false) {
      callback("请输入整数或1-2位的小数");
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 * 有六位小数的数字
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function realnumber6point(rule, value, callback) {
  if (value) {
    var reg = /^[0-9]+(\.[0-9]{1,6})?$/;
    if (reg.test(value) == false) {
      callback("请输入整数或1-6位的小数");
    } else {
      callback();
    }
  } else {
    callback();
  }
}


/**
 * 邮编
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function ems(rule, value, callback) {
  if (value) {
    var reg = /^\d{6}$/;
    if (reg.test(value) == false) {
      callback("请输入正确邮编");
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 * 有两位小数的正数、负数
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function realnegativenumber2point(rule, value, callback) {
  if (value) {
    var reg = /^(\-|\+)?\d+(\.\d{1,2})?$/;
    if (reg.test(value) == false) {
      callback("请输入1-2位小数的正数、负数");
    } else {
      callback();
    }
  } else {
    callback();
  }
}


/**
 * 有两位小数的正实数
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function realnumber2pointBFS(rule, value, callback) {
  if (value) {
    var reg = /^[0-9]+(\.[0-9]{2})?$/;
    if (reg.test(value) == false) {
      callback("请输入两位小数的正实数");
    } else if (value < 0 || value > 100) {
      callback("必须在0-100之间");
    } else {
      callback();
    }
  } else {
    callback();
  }
}


/**
 * 最大允许12位整数内以及6位小数
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function numAndABC(rule, value, callback) {
  if (value) {
    var reg = /^[0-9a-zA-Z]{1,}$/;
    if (reg.test(value) == false) {
      callback("数字和英文");
    } else {
      callback();
    }
  } else {
    callback();
  }
}
///////////////////////////////////////////
/**
 * 护照
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function passport(rule, value, callback) {
  if (value) {
    var reg = /^[a-zA-Z0-9]{5,17}$/;
    if (reg.test(value) == false) {
      callback(new Error("护照格式不对"));
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 * 港澳通行证
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function hongkongpass(rule, value, callback) {
  if (value) {
    var reg = /^[a-zA-Z0-9]{6,10}$/;
    if (reg.test(value) == false) {
      callback(new Error("港澳通行证格式不对"));
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 * 台胞证
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function taiwanpass(rule, value, callback) {
  if (value) {
    var reg = /^([0-9]{8}|[0-9]{10})$/;
    if (reg.test(value) == false) {
      callback(new Error("台胞证格式不对"));
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 * 统一社会信用代码
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function creditCode(rule, value, callback) {
  if (value) {
    var reg = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/;
    if (reg.test(value) == false) {
      callback(new Error("统一社会信用代码格式不对"));
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 * 大陆身份证正则
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function IDcardChina(rule, value, callback) {
  if (value) {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(value) == false) {
      callback(new Error("大陆身份证格式错误"));
    } else {
      callback();
    }
  } else {
    callback();
  }
}


/**
 * 工商注册号
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function gsNum(rule, value, callback) {
  if (value) {
    var reg = /^[1-7]\d{14}$/;
    if (reg.test(value) == false) {
      callback(new Error("工商注册号格式错误"));
    } else {
      callback();
    }
  } else {
    callback();
  }
}


/**
 * 非空格
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function notSpace(rule, value, callback) {
  if (value) {
    var reg = /^[^\s]*$/;
    if (reg.test(value) == false) {
      callback(new Error("不能输入空格"));
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 * 匹配中文，英文字母和数字及_
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function zhNUmEng(rule, value, callback) {
  if (value) {
    var reg = /^[a-zA-Z0-9\u4e00-\u9fa5\.\(\)\（\）\&\[\]\{\}\、\_\-\,\，]+$/;
    if (reg.test(value) == false) {
      callback(new Error("请输入中文，英文字母和数字及_-.()&[]{}、"));
    } else if (value.length > 60) {
      callback(new Error("字符长度限制在60"));
    } else {
      callback();
    }
  } else {
    callback();
  }
}
