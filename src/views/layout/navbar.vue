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
      v-if="$store.getters.getUserInfo.uid"
    >
      <li>
        <el-dropdown
          trigger="click"
          class="profile"
          @command="handleCommand"
        >
          <span
            class="el-dropdown-link"
            style="margin-left: 20px;color: #d5d5d5;cursor: pointer;height: 60px;line-height: 60px;display: inline-block"
          >
            {{ $store.getters.getUserInfo.nickName }}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                command="/preference"
                style="line-height: normal"
              >
                {{ $t("navbar.settings") }}
              </el-dropdown-item>
              <el-dropdown-item
                divided
                command="logout"
              >
                {{ $t("navbar.logout") }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
    </ul>

    <ul
      v-else
      class="nav-user"
    >
      <li>
        <router-link
          to="/register"
          :class="isActive('/register') ? 'active ' : ''"
        >
          {{ $t("navbar.register") }}
        </router-link>
      </li>
      <li>
        <router-link
          to="/login"
          :class="isActive('/login') ? 'active ' : ''"
        >
          {{ $t("navbar.login") }}
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
      this.$confirm(this.$i18n.t('navbar.logoutTip'), this.$i18n.t('common.tips'), {
        confirmButtonText: this.$i18n.t('common.ok'),
        cancelButtonText: this.$i18n.t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.axios.get('/v1/user/logout').finally(() => {
          this.$store.commit('setUserInfo', {})
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
    this.currentUrl = this.$route.path
  },
  watch: {
    '$route'(newRoute) {
      this.currentUrl = newRoute.path
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
