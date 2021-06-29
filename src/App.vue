<template>
  <router-view />
</template>

<script>
export default {}
</script>

<style lang="scss">
$--color-primary: #D8BE33;

html, body, #app {
  height: 100%;
  font-size: 15px;
  background: #171a21;
  color: #828ea1;
  margin: 0;
  padding: 0;
}

html {
  overflow-y: scroll; //这是为了兼容ie8，不支持:root, vw。这个可以删掉
}

:root {
  overflow-y: auto;
  overflow-x: hidden;
}

:root body {
  position: absolute;
}

body {
  width: 100vw;
}

//主色
.primary-color {
  color: $--color-primary !important;
}

//加载中
.el-loading-mask {
  background: none !important;
}

//下拉菜单
.el-dropdown-menu {
  background-color: #1d2635 !important;

  .el-dropdown-menu__item {
    color: #828ea1 !important;
    line-height: 30px !important;
  }

  .el-dropdown-menu__item--divided:before {
    background-color: #828ea1 !important;
    height: 0 !important;
  }
  .el-dropdown-menu__item:not(.is-disabled):hover {
    background: #171a21 !important;
    color: $--color-primary !important;
  }
}

</style>
