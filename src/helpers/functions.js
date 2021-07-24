import Vue from "vue";
import router from "../router";
import moment from 'moment';

export default class Helper {

    static auth(param) {
      let token = localStorage.getItem("auth");
      let auth = {
        auth: `Bearer ${token}`,
      };
      let headerobject = { ...auth, ...param };
      return {
        headers: headerobject,
      };
    }

    static async logout() {
      localStorage.removeItem("auth");
      router.push({ path: "/login" });
    }

    static async post(param) {
        let mainUrl = this.url;
        for (let i = 0; i <= param.length - 2; i++) {
          mainUrl = `${mainUrl}/${param[i]}`;
        }
        let data = Axios.post(mainUrl, param[param.length - 1]);
        let result = await data;
        if (result.statusText == "OK") {
          return result.data.message;
        } else {
          throw new Error(result.data.error);
        }
    }

    static async get(param) {
        let mainUrl = this.url;
        for (let i = 0; i <= param.length - 1; i++) {
            mainUrl = `${mainUrl}/${param[i]}`;
        }
        let data = await Axios.get(mainUrl);

        let result = await data;
        if (result.statusText == "OK") {
            return result.data.message;
        } else {
            throw new Error(result.data.error);
        }
    }

    static formatDate(date){
      return moment(date).format('LL')
    }

    static toast(title, text, type, duration, group) {
      Vue.notify({
        group: group,
        title: title,
        text: `<span font-size='16px' class="text-capitalize">${text}</span>`,
        type: type,
        duration: duration,
        class: "text-capitalize",
      });
    }
}
