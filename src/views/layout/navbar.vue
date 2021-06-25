<template>
  <div class="navbar">
    <router-link to="/">
      <img
        class="logo"
        src="../../assets/logo.png"
        alt="LOGO"
      >
    </router-link>

    <ul class="nav-list">
      <li
        v-for="nav in navList"
        :key="nav.code"
      >
        <router-link
          :to="nav.code"
          :class="isActive(nav.code) ? 'active ' : ''"
        >
          {{ nav.value }}
        </router-link>
      </li>
    </ul>

    <ul
      class="nav-user"
    >
      <li>
        <router-link
          to="/user/register"
          :class="isActive('/user/register') ? 'active ' : ''"
        >
          注册
        </router-link>
      </li>
      <li>
        <router-link
          to="/user/login"
          :class="isActive('/user/login') ? 'active ' : ''"
        >
          登录
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentUrl: '/',
      navList: [
        {
          code: '/contract',
          value: '合约'
        }, {
          code: '/wallet',
          value: '钱包'
        }]
    }
  },
  methods: {
    isActive: function (url) {
      if (url === '/') {
        return this.currentUrl === '/';
      }
      return this.currentUrl.startsWith(url);
    },
    logout() {
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post('user/logout').finally(() => {
          this.$store.commit('setLoginData', {})
          this.$router.push({
            path: '/user/login'
          })
        })
      })
    },
    handleCommand: function (command) {
      if (command === 'logout') {
        this.logout()
      } else {
        this.$router.push(command)
      }
    }
  },
  mounted() {
    this.currentUrl = this.$route.path;
  },
  watch: {
    '$route'(newRoute) {
      this.currentUrl = newRoute.path;
    }
  }
}
</script>

<style scoped lang="scss">
$--color-primary: #D8BE33;

.navbar {
  min-width: 600px;
  height: 60px;
  line-height: 60px;
  background: #1d2635;
  border-bottom: 1px solid #293448;

  .logo {
    float: left;
    height: 50px;
    margin-left: 50px;
    margin-top: 8px;
  }

  .nav-list {
    float: left;
    list-style: none;
    margin: 0 0 0 40px;
    padding: 0;

    li {
      float: left;
      height: 60px;
      line-height: 60px;
      text-align: center;

      a {
        display: block;
        width: 70px;
        text-decoration: none;
        color: #828ea1;
      }

      a.active {
        color: $--color-primary;
      }

      a:hover {
        color: $--color-primary;
      }
    }
  }

  .nav-user {
    float: right;
    list-style: none;
    margin: 0 15px 0 40px;
    padding: 0;

    li {
      height: 60px;
      line-height: 60px;
      text-align: center;
      float: right;
      border-left: 1px solid #293448;

      a {
        cursor: pointer;
        display: block;
        width: 70px;
        text-decoration: none;
        color: #828ea1;
      }

      a.active {
        color: $--color-primary;
      }

      a:hover {
        color: $--color-primary;
      }

      .profile {
        .avatar {
          float: left;
          margin-top: 13px;
          margin-left: 10px;
        }

        i {
          margin-top: 25px;
          margin-right: 10px;
        }
      }
    }

    li.no-border {
      border: 0;
    }
  }
}
</style>
