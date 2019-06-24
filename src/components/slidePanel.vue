<template>
  <div class="panel" v-show="show" :style="{'width':size,'z-index': leval}">
    <div class="close" @click="close()">
      <i class="el-icon-close"></i>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "slidePanel",
  props: ["show","size","leval"], //是否滑出，宽度，显示等级
  methods: {
    close(){
      this.$emit("closePanel",false) //关闭抽屉
    }
  }
}
</script>
<style>
.panel {
  height: 100%;
  position: fixed;
  top: 0;
  animation: slide 1.5s forwards;
}
@keyframes slide
{
  from {right:-100%;}
  to {right:0;}
}
.close{
  width:26px;
  height:0;
  position: absolute;
  top:80px;
  left: -30px;
  border-width:0 8px 20px 8px;
  border-style:none solid solid;
  border-color:transparent transparent white;
  transform: rotate(270deg);
}
.el-icon-close{
  margin-left: 5px;
}
</style>
