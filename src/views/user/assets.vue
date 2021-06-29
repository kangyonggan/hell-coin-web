<template>
  <el-row style="margin-top: 20px;">
    <el-col
      :xl="6"
      :lg="4"
      :md="2"
      class="hidden-sm-and-down"
    />
    <el-col
      :xl="3"
      :lg="4"
      :md="5"
      :sm="6"
      style="margin-right: 10px;"
    >
      <el-card>
        <template #header>
          <div style="position: relative">
            <span>资产中心</span>
            <el-button
              class="header-action"
              type="text"
            >
              <i
                v-if="hideHeader"
                class="el-icon-arrow-up"
                @click="hideHeader = false"
              />
              <i
                v-else
                class="el-icon-arrow-down"
                @click="hideHeader = true"
              />
            </el-button>
          </div>
        </template>
        <ul
          class="account-list"
          v-if="!hideHeader"
        >
          <li
            v-for="accountItem in accountList"
            :key="accountItem.accountType"
          >
            {{ accountItem.accountName }}
          </li>
        </ul>
      </el-card>
    </el-col>
    <el-col
      :xl="9"
      :lg="12"
      :md="15"
      :sm="17"
    >
      <el-card>
        <template #header>
          <div style="position: relative">
            <span>资金列表</span>
            <el-switch
              style="margin-left: 20px"
              v-model="hideSmallCoin"
            />
            <span style="font-size: 12px;color: #6a6e77;margin-left: 5px;">隐藏小额币种</span>
            <el-form-item
              class="header-action"
              prop="key"
            >
              <el-input
                style="margin-top: 3px;width: 180px;"
                size="small"
                placeholder="搜索币种"
                v-model="key"
                @keyup.enter.native="search"
                autocomplete="off"
              >
                <template #prepend>
                  <i class="el-icon-search"/>
                </template>
              </el-input>
            </el-form-item>
          </div>
        </template>
        <el-table
          class="currency-list"
          :data="currencyList"
        >
          <el-table-column
            prop="currency"
            label="币种"
          />
          <el-table-column
            prop="totalAmount"
            label="总金额"
          />
          <el-table-column
            prop="availableAmount"
            label="可用金额"
          />
          <el-table-column
            prop="frozenAmount"
            label="冻结金额"
          />
          <el-table-column
            label="操作"
          />
        </el-table>
      </el-card>
    </el-col>
    <el-col
      :xl="6"
      :lg="4"
      :md="2"
      class="hidden-sm-and-down"
    />
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      hideHeader: false,
      hideSmallCoin: false,
      key: '',
      accountList: [{
        accountType: 'all',
        accountName: '全部资产',
        balance: 123.45
      }, {
        accountType: 'bb',
        accountName: '币币账户',
        balance: 123.45
      }, {
        accountType: 'hy',
        accountName: '合约账户',
        balance: 36.00
      }, {
        accountType: 'fb',
        accountName: '法币账户',
        balance: 568.59
      }],
      currencyList: [{
        currency: 'USDT',
        totalAmount: 123.45,
        availableAmount: 123.45,
        frozenAmount: 123.45
      }, {
        currency: 'BTC',
        totalAmount: 123.45,
        availableAmount: 123.45,
        frozenAmount: 123.45
      }, {
        currency: 'ETH',
        totalAmount: 123.45,
        availableAmount: 123.45,
        frozenAmount: 123.45
      }]
    }
  },
  methods: {
    search() {
      console.log(this.key)
    }
  }
}
</script>

<style scoped lang="scss">
$--color-primary: #D8BE33;

::v-deep(.el-card) {
  background: rgba(30, 36, 50, .7);
  border: 0;
  color: #828ea1;
  margin-top: 8px;

  .el-card__header {
    color: #d5d5d5;
    border-bottom: 1px solid #828ea1;
  }

  .el-input {
    .el-input-group__prepend {
      background: none;
      padding: 0 12px;
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

  .currency-list {
    .cell {
      color: #828ea1;
    }

    * {
      background: rgba(30, 36, 50, .7);
      border-color: rgba(30, 36, 50, .7);
    }
  }

  .el-table::before {
    background-color: #6a6e77;
  }

  .el-table td {
    border-bottom: 1px solid #171a21;
  }

  .el-table th.is-leaf {
    border-bottom: 1px solid #171a21;
  }

  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background: #171a21;
  }

  .el-table__body tr:hover {
    background: #171a21;
  }

  .el-table__body tr:hover .cell {
    color: $--color-primary;
    background: #171a21;
  }
}

.header-action {
  position: absolute;
  right: 0;
  top: -7px;
}

.account-list {
  list-style: none;
  margin-top: 0;
  padding-left: 0;

  li {
    line-height: 35px;
    cursor: pointer;
    padding-left: 20px;
  }

  li:hover {
    color: $--color-primary;
    background: #171a21;
  }
}
</style>