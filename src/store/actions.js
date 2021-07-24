import Axios from 'axios';
import Helper from "../helpers/functions";

export default {
    logout: function({ commit }){
        commit('LOGOUT');
    },
    setUserData: ({ commit }, payload) => {
        commit({
            type: 'SET_USER_DATA',
            data: payload
        });
        commit('SET_WALLET_BALANCE');
    },
    getUserData: async ({ commit }) => {
        commit('DATA_LOADING', true);
        try {
            let auth = Helper.auth();
    
            let { data, status } = await Axios.get(
              "school/student-details",
              auth
            );
            commit('DATA_LOADING', false);
            
            if (status == 200) {
                commit({
                    type: 'SET_USER_DATA',
                    data: data.data
                })
                commit('SET_WALLET_BALANCE')
            }
        } catch (error) {
            commit('DATA_LOADING', false);

            console.log(error);
            console.table(error);
        } 
    },


}