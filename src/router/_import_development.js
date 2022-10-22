/*
 * @Author: wjs
 * @Date: 2022-03-14 16:42:49
 * @Description: 
 * @FilePath: \oaweb\src\router\_import_development.js
 * 
 */
module.exports = name => require('@/views/' + name + '.vue').default;
// module.exports = name => () => import('@/views/' + name + '.vue')
