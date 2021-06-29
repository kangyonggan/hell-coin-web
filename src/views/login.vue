<template>
  <el-row>
    <el-col
      :xl="17"
      :lg="16"
      :md="0"
      :sm="0"
      :xs="0"
    >
      <div class="login-bg">
        HELL COIN
      </div>
    </el-col>
    <el-col
      :xl="5"
      :lg="6"
      :md="24"
      :sm="24"
      :xs="24"
    >
      <div class="register-container">
        <el-card v-loading="loading">
          <template #header>
            <a
              :class="'register-type ' + (params.loginType === 'BY_PWD' ? 'active' : '')"
              @click="changeLoginType('BY_PWD')"
            >
              {{ $t("login.byPwd") }}
            </a>
            |
            <a
              :class="'register-type ' + (params.loginType === 'BY_CODE' ? 'active' : '')"
              @click="changeLoginType('BY_CODE')"
            >
              {{ $t("login.byCode") }}
            </a>
          </template>
          <el-form
            ref="form"
            :model="params"
            :rules="rules"
          >
            <el-form-item
              prop="email"
            >
              <el-input
                :placeholder="$i18n.t('login.emailPlacehold')"
                v-model="params.email"
                @keyup.enter.native="submit"
                autocomplete="off"
              >
                <template #prepend>
                  <i class="el-icon-message" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item
              class="form-item"
              prop="loginPwd"
              v-if="params.loginType === 'BY_PWD'"
            >
              <el-input
                :placeholder="$i18n.t('login.pwdPlacehold')"
                type="password"
                v-model="params.loginPwd"
                @keyup.enter.native="submit"
                autocomplete="off"
              >
                <template #prepend>
                  <i class="el-icon-lock" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item
              class="form-item"
              prop="verifyCode"
              v-else
            >
              <el-input
                :placeholder="$i18n.t('login.codePlacehold')"
                v-model="params.verifyCode"
                @keyup.enter.native="submit"
                autocomplete="off"
              >
                <template #prepend>
                  <i class="el-icon-circle-check" />
                </template>
                <template #append>
                  <a
                    @click="sendCode"
                  >
                    {{ codeText }}
                  </a>
                </template>
              </el-input>
            </el-form-item>
            <el-button
              type="primary"
              size="medium"
              @click="submit"
            >
              {{ $t("login.login") }}
            </el-button>
            <div class="bottom-info">
              <el-form-item
                prop="agree"
                class="agree-item"
              >
                <el-checkbox v-model="params.agree" />
              </el-form-item>
              {{ $t("login.iAgree") }}
              <router-link to="/page/provisions">
                《{{ $t("login.policy") }}》
              </router-link>
              {{ $t("login.agreeAnd") }}
              <router-link to="/page/privacy">
                《{{ $t("login.privacy") }}》
              </router-link>
            </div>
          </el-form>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      codeText: this.$i18n.t('login.getCode'),
      second: 60,
      params: {
        loginType: 'BY_PWD',
        email: 'java@kangyonggan.com',
        loginPwd: 'd53810dd679d4a69',
        verifyCode: '',
        agree: true
      },
      rules: {
        email: [
          {required: true, message: this.$i18n.t('login.emailText')}
        ],
        agree: [
          {validator: this.validateAgree}
        ],
        loginPwd: [
          {required: true, message: this.$i18n.t('login.agreeText')}
        ],
        verifyCode: [
          {required: true, message: this.$i18n.t('login.codeText')}
        ]
      }
    }
  },
  methods: {
    validateAgree: function (rule, value, callback) {
      if (value) {
        callback()
      } else {
        callback(new Error(this.$i18n.t('login.agreeText')))
      }
    },
    changeLoginType(loginType) {
      this.params.loginType = loginType
    },
    sendCode() {
      if (this.second !== 60 || this.loading || this.codeText !== this.$i18n.t('login.getCode')) {
        return
      }
      let that = this;
      this.$refs.form.validateField('email', function (errMsg) {
        if (errMsg) {
          return;
        }
        that.loading = true
        that.codeText = that.$i18n.t('login.sending') + '...'
        that.axios.post('/v1/email/sendCode', {
          type: 'LOGIN',
          email: that.params.email
        }).then(() => {
          that.startTimer()
          that.$success(that.$i18n.t('login.sendSuccess'))
        }).catch(res => {
          that.codeText = that.$i18n.t('login.getCode')
          that.$error(res.msg)
        }).finally(() => {
          that.loading = false
        })
      });
    },
    startTimer(sec) {
      if (sec) {
        this.second = sec
      }
      const timer = setInterval(() => {
        this.codeText = this.second + 's'
        this.second--
        if (this.second === 0) {
          this.second = 60
          this.codeText = this.$i18n.t('login.getCode')
          clearInterval(timer)
        }
      }, 1000)
    },
    submit: function () {
      if (this.loading) {
        return;
      }
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }
        this.loading = true;
        let params = Object.assign({}, this.params)
        params.agree = undefined
        if (this.params.loginType === 'BY_PWD') {
          params.verifyCode = undefined
        } else {
          params.loginPwd = undefined
        }
        this.axios.post('/v1/user/login', params).then((data) => {
          this.$store.commit('setUserInfo', data)
          let redirectUrl = this.$route.query.redirectUrl || '/'
          let path = decodeURIComponent(redirectUrl)
          let query = {}
          if (path.includes('?')) {
            let index = path.indexOf('?')
            let queryStr = path.substring(index + 1)
            path = path.substring(0, index)
            let queryArr = queryStr.split('&')
            for (let i = 0; i < queryArr.length; i++) {
              let param = queryArr[i].split('=')
              query[param[0]] = param[1]
            }
          }
          this.$router.push({
            path: path,
            query: query
          })
        }).catch(res => {
          this.$error(res.msg)
        }).finally(() => {
          this.loading = false
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
$--color-primary: #D8BE33;

.login-bg {
  font-size: 150px;
  font-weight: bold;
  font-style: italic;
  color: $--color-primary;
  text-align: center;
  padding-top: 250px;
}

.register-container {
  height: 100%;
  background-size: cover;
  margin-top: 200px;

  ::v-deep(.el-card) {
    background: rgba(30, 36, 50, .7);
    border: 0;
    max-width: 360px;
    margin: 0 auto;
    color: #828ea1;

    .register-type {
      font-size: 18px;
      margin: 0 10px;
      cursor: pointer;
    }

    .active {
      color: #fff;
    }

    .el-card__header {
      border-bottom: 1px solid #828ea1;
    }

    .form-item {
      margin-top: 30px;
    }

    .el-input {
      .el-input-group__prepend {
        background: none;
      }

      .el-input-group__append {
        background: none;
        cursor: pointer;
      }

      .el-input__inner {
        background: none;
        color: #fff;
      }

      .el-input__inner::placeholder {
        color: #6a6e77;
      }
    }

    .agree-item {
      display: inline-block;

      .el-form-item__error {
        width: 100px;
        padding-top: 0;
      }
    }

    .el-button {
      margin-top: 5px;
      width: 100%;
      font-size: 16px;
      border-radius: 20px;
      background: $--color-primary;

      span {
        color: #fff;
      }
    }

    .bottom-info {
      margin-top: 10px;
      font-size: 12px;
      height: 40px;
      color: #828ea1;

      .el-checkbox__inner {
        background: $--color-primary;
        border: 0;
        margin-right: 10px;
      }

      a {
        text-decoration: none;
        color: $--color-primary;
      }
    }
  }
}
</style>
