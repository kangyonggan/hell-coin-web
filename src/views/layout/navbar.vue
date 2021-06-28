<template>
  <div class="navbar">
    <router-link to="/">
      <img
        class="logo"
        src="../../assets/logo.png"
        alt="LOGO"
      >
    </router-link>

    <ul
      class="nav-user"
    >
      <li>
        <router-link
          to="/register"
          :class="isActive('/register') ? 'active ' : ''"
        >
          注册
        </router-link>
      </li>
      <li>
        <router-link
          to="/login"
          :class="isActive('/login') ? 'active ' : ''"
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
      currentUrl: '/'
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
          this.$router.push({
            path: '/login'
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
