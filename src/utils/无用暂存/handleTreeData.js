/*
 * @Author: wjs
 * @Date: 2022-04-28 10:42:33
 * @Description: 处理树形结构数据
 * @FilePath: \oaweb\src\utils\handleTreeData.js
 * 
 */

/**
 * @Author: wjs
 * @description: 处理树形结构数据
 * @param {*} data
 * @return {*}
 */
export function handleTreeData(data) {
  var arr = [];
  data.filter((item) => {
    var obj = {};
    obj.id = item.id;
    obj.label = item.text;
    if (item.childNodes && item.childNodes.length) {
      obj.children = handleTreeData(item.childNodes);
    }
    arr.push(obj);
    return true;
  });
  return arr;
}
