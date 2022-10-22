/*
 * @Author: wjs
 * @Date: 2022-03-16 20:14:14
 * @Description: 
 * @FilePath: \oaweb\src\utils\getStyleSheets.js
 * 
 */
import Vue from 'vue'
/**
 *  初始化获取 css 样式，这里使用 fontawesome 的图标
 * @returns 
 */
export function getAwesomeIconfont() {
  return new Promise((resolve, reject) => {
    Vue.nextTick(() => {
      const styles = document.styleSheets;
      let sheetsList = [];
      let sheetsIconList = [];
      for (let i = 0; i < styles.length; i++) {
        if (styles[i].href && styles[i].href.indexOf('font-awesome.min.css') > -1) {
          sheetsList.push(styles[i]);
        }
      }
      // console.log(sheetsList[0].cssRules);
      for (let i = 0; i < sheetsList.length; i++) {
        for (let j = 0; j < sheetsList[i].cssRules.length; j++) {
          if (
            sheetsList[i].cssRules[j].selectorText &&
            sheetsList[i].cssRules[j].selectorText.indexOf('.fa-') === 0
          ) {
            if (/::before/.test(sheetsList[i].cssRules[j].selectorText)) {
              if (sheetsList[i].cssRules[j].selectorText.indexOf(',') > -1) {
                var text = sheetsList[i].cssRules[j].selectorText;
                var icons = text.split(", ");
                sheetsIconList.push(
                  `${icons[0].substring(1, icons[0].length).replace(/\:\:before/gi, '')}`
                );
              } else {
                sheetsIconList.push(
                  `${sheetsList[i].cssRules[j].selectorText.substring(1, sheetsList[i].cssRules[j].selectorText.length).replace(/\:\:before/gi, '')}`
                );
              }

            }
          }
        }
      }
      if (sheetsIconList.length > 0) resolve(sheetsIconList.reverse());
      else reject('未获取到值，请刷新重试');
    });
  });
};
