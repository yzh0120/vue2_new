<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>
<!-- <svgIcon icon="RDCIconDashboard" className="aaa"></svgIcon> -->
<script>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
export default {
  name: 'svgIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`
    },
    svgClass() {
      if (this.className) {
        return 'icon ' + this.className
      } else {
        return 'icon'
      }
    }
  }
}
</script>

<style type="text/css">
    .icon {
       width: 1em; 
	   height: 1em;
       /* vertical-align: -0.15em; */
       fill: currentColor;
       overflow: hidden;
    }
</style>
