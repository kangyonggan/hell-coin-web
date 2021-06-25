<template>
  <div style="height: 100%">
    <div class="wrapper">
      <navbar />
      <div class="main">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
      <div style="height: 60px" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./navbar"
import Footer from "./footer"

export default {
  components: {Footer, Navbar}
}
</script>

<style scoped lang="scss">
.wrapper {
  min-height: 100%;
  margin-bottom: -61px;
}

.main {
  width: 1240px;
  margin: 0 auto;
}
</style>
