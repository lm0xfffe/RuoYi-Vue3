import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';
import defAva from '@/assets/images/profile.jpg';

const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
  }),
  actions: {
    // 登录
    login(userInfo) {
      const username = userInfo.username.trim();
      const password = userInfo.password;
      const code = userInfo.code;
      const uuid = userInfo.uuid;
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid)
          .then(res => {
            setToken(res.data.token);
            this.token = res.data.token;
            this.accountId = res.data.accountId;
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 获取用户信息
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(res => {
            // console.log('getInfo st.........', res);
            const data = res.data;
            const avatar = data.avatarUrl == '' || data.avatarUrl == null ? defAva : import.meta.env.VITE_APP_BASE_API + data.avatarUrl;
            const roles = [data.roleId];
            // console.log('getInfo st2.........', res);
            if (roles && roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              this.roles = res.roles;
              this.permissions = [];
            } else {
              this.roles = ['ROLE_DEFAULT'];
            }
            this.name = data.userName;
            this.avatar = avatar;
            this.orgId = data.orgId;
            // console.log('getInfo ed.........');

            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 退出系统
    logOut() {
      return new Promise((resolve, reject) => {
        logout(this.token)
          .then(() => {
            this.token = '';
            this.roles = [];
            this.permissions = [];

            this.avatar = '';
            this.orgId = undefined;

            removeToken();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  },
});

export default useUserStore;
