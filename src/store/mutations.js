
import router from '../router/index'
export default{
    LOGOUT(state){
        state.student_token = null;
        localStorage.removeItem('auth');
        router.push({ name: 'login' })
    },
    SET_USER_DATA(state, payload){
        state.userData = payload.data;
    },
    DATA_LOADING(state, payload){
        state.dataLoading = payload;
    },
    SET_WALLET_BALANCE(state){      
        let debit = state.userData.wallet.filter(item => item.credit !== true )   
        let credit = state.userData.wallet.filter(item => item.credit === true )   

        let debitBalance = debit.reduce((acc, curr) => {
          return parseInt(acc) + parseInt(curr.amount)
        }, 0);

        let creditBalance = credit.reduce((acc, curr) => {
          return parseInt(acc) + parseInt(curr.amount)
        }, 0);
        state.walletBalance = creditBalance - debitBalance;
    },
}