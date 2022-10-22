<template>
  <div>
    <div class="panel" :class="addType">
			<!-- 头部 -->
      <div :class="[`panel-heading`]" @click="bodyHandle" :style="{fontSize:sizeComputed}">
			<div  v-if="head">{{head}}</div>
				<slot name="head"></slot>
      </div>
			<!-- 身体 -->
      <div class="panel-body" :style="{height:height}">
					<div  ref="innerBodyBody" style="padding: 15px;">
						<slot></slot>
					</div>
      </div>
    </div>
  </div>
</template>
    <!-- 
	default 
	primary
	success
	info
	warning
	danger
	 -->
<script>
	import elementResizeDetectorMaker from 'element-resize-detector'
	export default {
	  props: {
		head: String,
		type: {
			type: String,
			default: "primary"
		},
		close:{
			default: false
		},
		size:{
			type:String,
			default: ""
		}
	  },
	  computed:{
		  addType(){
			  return "panel-" + this.type
		  },
		  sizeComputed(){
			  let size = this.size
			  if(size == "h1"){
				  return  "32px"
			  }else if(size == "h2"){
				  return  "24px"
			  }else if(size == "h3"){
				  return  "18.72px"
			  }
		  },
	  },
	  data() {
		return {
		  showBody: true,
		  height:"0px",
		  count:0,
		};
	  },
	  mounted(){
		if(this.close){
		  this.showBody = false
		}else{
			this.height = this.$refs.innerBodyBody.offsetHeight+'px'
			this.count++ 
		}
		
		const _this = this;
		const erd = elementResizeDetectorMaker()
		//监听
		erd.listenTo(_this.$refs.innerBodyBody,(element)=>{
			_this.$nextTick(()=>{
				if(this.count === 0){
					
				}else{
					if(this.showBody){
						_this.height = element.offsetHeight+'px'
					}else{
						
					}
					
				}
				this.count++ 
			})
		})
	  },
	  methods: {
		bodyHandle() {
		  // 
		  if(this.showBody){
			  this.height = "0px"
		  }else{
			  this.height = this.$refs.innerBodyBody.offsetHeight+'px'
		  }
		  this.showBody = !this.showBody;
		  console.log(this.showBody)
		},
		
	  }
	};
</script>
    
<style scoped lang="scss">
	$fanwei:5px;
.panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  // -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  //   box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  

  &.panel-default {
    border-color: #ddd;
	// box-shadow: #ddd 0px 0px $fanwei;
    >.panel-heading {
      color: #333;
      background-color: #f5f5f5;
      border-color: #ddd;
    }
  }
  &.panel-primary {
    border-color: #337ab7;
	// box-shadow: #337ab7 0px 0px $fanwei;
    >.panel-heading {
      color: #fff;
      background-color: #337ab7;
      border-color: #337ab7;
    }
  }

  &.panel-success {
    border-color: #d6e9c6;
	// box-shadow: #d6e9c6 0px 0px $fanwei;
    >.panel-heading {
      color: #3c763d;
      background-color: #dff0d8;
      border-color: #d6e9c6;
    }
  }

  &.panel-info {
    border-color: #bce8f1;
	// box-shadow: #bce8f1 0px 0px $fanwei;
    >.panel-heading {
      color: #31708f;
      background-color: #d9edf7;
      border-color: #bce8f1;
    }
  }

  &.panel-warning {
    border-color: #faebcc;
	// box-shadow: #faebcc 0px 0px $fanwei;
    >.panel-heading {
      color: #8a6d3b;
      background-color: #fcf8e3;
      border-color: #faebcc;
    }
  }

  &.panel-danger {
    border-color: #ebccd1;
	// box-shadow: #ebccd1 0px 0px $fanwei;
    >.panel-heading {
      color: #a94442;
      background-color: #f2dede;
      border-color: #ebccd1;
    }
  }
  
  
  
  .panel-heading {
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
	
	// display: flex;
	// justify-content: space-between;
  }
  .panel-body {
	overflow: hidden;
	transition: all .2s;
  }
}
</style>
