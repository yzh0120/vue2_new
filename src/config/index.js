export const needTags = true;
const screenHeight = Number(clientHeight());


export const tableheight = needTags ? screenHeight - 280 + "px" : screenHeight - 227 + "px";

// export const nopagetableheight = needTags ? screenHeight - 205 + "px" : screenHeight - 217 + "px";

// export const linkheight = needTags ? screenHeight - 270 + "px" : screenHeight - 250 + "px";

// export const rollheight = needTags ? screenHeight - 114 + "px" : screenHeight - 80 + "px";

function clientHeight() {
  return document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
}
