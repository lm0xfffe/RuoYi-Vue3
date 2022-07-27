import request from '@/utils/request';

// 获取路由
export const getRouters = () => {
  // return request({
  //   url: '/getRouters',
  //   method: 'get'
  // })
  //console.log(menus);
  let tmpMenu = [];
  menus.data.forEach(item => {
    let firstPath = item.path;
    if (item.meta) {
      let firstTitle = item.meta.title;
      ///console.log(firstTitle + ":" + firstPath);
    }

    item.children.forEach(j => {
      let subPath = j.path;
      let subTitle = j.meta.title;
      //console.log(subTitle + ":" + firstPath + "/" + subPath);
    });
  });
  return new Promise(function (reslove, reject) {
    reslove(menus);
  });
};

let menus = {
  msg: '操作成功',
  code: 200,
  data: [
    // {
    //   "path": '',
    //   "component": "Layout",
    //   "redirect": 'index',
    //   "children": [
    //     {
    //       "path": 'index',
    //       "component": 'index',
    //       "name": '首页',
    //       "meta": { title: '首页', icon: 'dashboard', noCache: false, affix: true }
    //     }
    //   ]
    // },

    {
      name: 'Person',
      path: '/person',
      hidden: false,
      redirect: 'noRedirect',
      component: 'Layout',
      alwaysShow: true,
      meta: {
        title: '人员管理',
        icon: 'people',
      },
      children: [
        {
          name: 'info',
          path: 'info',
          hidden: false,
          component: 'ledger/person/index',
          meta: {
            title: '人员信息',
            icon: 'user',
          },
        },
      ],
    },

    {
      name: 'System',
      path: '/system',
      hidden: false,
      redirect: 'noRedirect',
      component: 'Layout',
      alwaysShow: true,
      meta: {
        title: '系统管理',
        icon: 'system',
      },
      children: [
        {
          name: 'User',
          path: 'user',
          hidden: false,
          component: 'system/user/index',
          meta: {
            title: '用户管理',
            icon: 'user',
          },
        },
        {
          name: 'Role',
          path: 'role',
          hidden: false,
          component: 'system/role/role',
          meta: {
            title: '角色管理',
            icon: 'peoples',
          },
        },
        {
          name: 'Dept',
          path: 'dept',
          hidden: false,
          component: 'system/dept/index',
          meta: {
            title: '单位管理',
            icon: 'tree',
          },
        },
        {
          name: 'Operlog',
          path: 'operlog',
          hidden: false,
          component: 'monitor/operlog/index',
          meta: {
            title: '操作日志',
            icon: 'form',
          },
        },
      ],
    },
    {
      name: 'Data',
      path: '',
      component: 'Layout',
      redirect: 'noRedirect',
      meta: {
        title: '大屏展示',
        icon: 'tree',
      },
      children: [
        {
          path: 'data',
          component: 'data',
          name: '大屏展示',
          meta: { title: '大屏展示', icon: 'tree' },
        },
      ],
    },
  ],
};
