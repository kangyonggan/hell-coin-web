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
      <li style="border-left: 1px solid #293448;">
        <el-dropdown
          trigger="click"
          @command="handleCommand"
        >
          <span
            class="el-dropdown-link"
            style="color: #828ea1;cursor: pointer;display: inline-block;height: 60px;line-height: 60px;width: 80px;"
          >
            {{ getLang() }}<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="lang in languages"
                :key="lang"
                :command="lang"
              >
                {{ lang.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
    </ul>
    
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
            v-if="$store.getters.getUserInfo.nickName.length <= 4"
          >
            {{ $store.getters.getUserInfo.nickName }}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <span
            class="el-dropdown-link"
            style="margin-left: 20px;color: #d5d5d5;cursor: pointer;height: 60px;line-height: 60px;display: inline-block"
            v-else
          >
            {{ $store.getters.getUserInfo.nickName.substring(0, 4) }}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                command="/user/assets"
                style="line-height: normal"
              >
                {{ $t("navbar.assets") }}
              </el-dropdown-item>
              <el-dropdown-item
                command="/user/preference"
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
      currentUrl: '/',
      languages: [{
        lang: 'zh-CN',
        name: '中 文'
      }, {
        lang: 'zh-TW',
        name: '繁 體'
      }, {
        lang: 'en-US',
        name: 'English'
      }]
    }
  },
  methods: {
    getLang() {
      let lang = this.$i18n.locale
      for (let i = 0; i < this.languages.length; i++) {
        if (lang === this.languages[i].lang) {
          return this.languages[i].name.replace(' ', '')
        }
      }
    },
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
      } else if (command.lang) {
        localStorage.setItem('language', command.lang)
        window.location.reload()
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
    margin: 0;
    padding: 0;

    li {
      height: 60px;
      line-height: 60px;
      text-align: center;
      float: right;

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
