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

.primary-color {
  color: $--color-primary !important;
}

.el-loading-mask {
  background: none !important;
}

</style>
