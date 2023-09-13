/* eslint-disable no-tabs */
/* eslint-disable no-multi-spaces */

export enum E_CODE_KEY {
  'DEP_ADD_TRANSACTION_CHANGE'        = 'DEP_ADD_TRANSACTION_CHANGE', //  'Kembalian Jadi deposit'
  'DEP_ADD_CASH_DEPOSIT'              = 'DEP_ADD_CASH_DEPOSIT', // 'Titip tunai'
  'DEP_ADD_CASH_DEPOSIT_TRANSFER'     = 'DEP_ADD_CASH_DEPOSIT_TRANSFER', // 'Titip tunai Transfer'
  'DEP_ADD_RETURN_GOODS_CASH'         = 'DEP_ADD_RETURN_GOODS_CASH', // 'retur bayar tunai'
  'DEP_ADD_RETURN_GOODS_DEPOSIT'      = 'DEP_ADD_RETURN_GOODS_DEPOSIT', // 'retur Bayar deposit'
  'DEP_SUB_PAID_WITH_DEPOSIT'         = 'DEP_SUB_PAID_WITH_DEPOSIT', // 'Bayar transaksi menggunakan deposit'
  'DEP_SUB_PAID_DEBT_WITH_DEPOSIT'    = 'DEP_SUB_PAID_DEBT_WITH_DEPOSIT', // 'Bayar Hutang menggunakan deposit'
  'DEBT_ADD_INSUFFICIENT_FUND'        = 'DEBT_ADD_INSUFFICIENT_FUND', // 'Transaksi kurang bayar'
  'DEBT_SUB_PAY_WITH_DEPOSIT'         = 'DEBT_SUB_PAY_WITH_DEPOSIT', // 'Bayar Hutang Dengan deposit'
  'DEBT_SUB_PAY_WITH_CASH'            = 'DEBT_SUB_PAY_WITH_CASH', // 'Bayar hutang dengan tunai'
  'DEBT_SUB_PAY_WITH_TRANSFER'        = 'DEBT_SUB_PAY_WITH_TRANSFER', // 'Bayar hutang dengan transfer'
  'DEBT_SUB_RETURN_GOODS'             = 'DEBT_SUB_RETURN_GOODS', // 'Dari retur barang',
  'DEBT_SUB_PAY_WITH_CHANGE'          = 'DEBT_SUB_PAY_WITH_CHANGE' // 'Bayar hutang dengan tunai'
}

type AccountCode = {
  [ key in E_CODE_KEY]: {
    code: string
    type: 'DEP' | 'DEBT'
    action: 'ADD' | 'SUB'
  };
}

export const accountCode: AccountCode = {
  DEBT_ADD_INSUFFICIENT_FUND: {
    action: 'ADD',
    code  : 'DEBT_ADD_INSUFFICIENT_FUND',
    type  : 'DEBT'
  },
  DEBT_SUB_PAY_WITH_TRANSFER: {
    action: 'SUB',
    code  : 'DEBT_SUB_PAY_WITH_TRANSFER',
    type  : 'DEBT'
  },
  DEBT_SUB_PAY_WITH_CASH: {
    action: 'SUB',
    code  : 'DEBT_SUB_PAY_WITH_CASH',
    type  : 'DEBT'
  },
  DEBT_SUB_PAY_WITH_DEPOSIT: {
    action: 'SUB',
    code  : 'DEBT_SUB_PAY_WITH_DEPOSIT',
    type  : 'DEBT'
  },
  DEBT_SUB_RETURN_GOODS: {
    action: 'SUB',
    code  : 'DEBT_SUB_RETURN_GOODS',
    type  : 'DEBT'
  },
  DEP_ADD_CASH_DEPOSIT: {
    action: 'ADD',
    code  : 'DEP_ADD_CASH_DEPOSIT',
    type  : 'DEP'
  },
  DEP_ADD_RETURN_GOODS_CASH: {
    action: 'ADD',
    code  : 'DEP_ADD_RETURN_GOODS_CASH',
    type  : 'DEP'
  },
  DEP_ADD_RETURN_GOODS_DEPOSIT: {
    action: 'ADD',
    code  : 'DEP_ADD_RETURN_GOODS_DEPOSIT',
    type  : 'DEP'
  },
  DEP_ADD_TRANSACTION_CHANGE: {
    action: 'ADD',
    code  : 'DEP_ADD_TRANSACTION_CHANGE',
    type  : 'DEP'
  },
  DEP_SUB_PAID_DEBT_WITH_DEPOSIT: {
    action: 'SUB',
    code  : 'DEP_SUB_PAID_DEBT_WITH_DEPOSIT',
    type  : 'DEP'
  },
  DEP_SUB_PAID_WITH_DEPOSIT: {
    action: 'SUB',
    code  : 'DEP_SUB_PAID_WITH_DEPOSIT',
    type  : 'DEP'
  },
  DEP_ADD_CASH_DEPOSIT_TRANSFER: {
    action: 'ADD',
    code  : 'DEP_ADD_CASH_DEPOSIT_TRANSFER',
    type  : 'DEP'
  },
  DEBT_SUB_PAY_WITH_CHANGE: {
    action: 'SUB',
    code  : 'DEBT_SUB_PAY_WITH_CHANGE',
    type  : 'DEBT'
  }
}
