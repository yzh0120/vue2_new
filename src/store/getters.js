const getters = {
  tagsViewList: state => state.tagsView.tagsViewList,
  currentTagView: state => state.tagsView.currentTagView,
  permission: state => state.router.routes,
  isCollapse: state => state.config.isCollapse,
  userInfo: state => state.user.userInfo,
}
export default getters
