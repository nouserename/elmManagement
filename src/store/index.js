import Vue from 'vue'
import Vuex from 'vuex' //引入 vuex 初始化项目已经安装了这个包
import {getAdminInfo} from '@/api/getData'

Vue.use(Vuex) //注册 vuex

const state = {
    //后台登录的管理员信息
    adminInfo: {
        avatar: 'default.jpg'
    },
}

const mutations = {
    //保存管理员信息的 mutation
    saveAdminInfo(state, adminInfo){
        state.adminInfo = adminInfo;
    }
}

const actions = {
    async getAdminData({commit}){
        try{
            //异步请求管理员信息 ，成功后 提交一个 mutation 将信息保存到 vuex 
            const res = await getAdminInfo()
            if (res.status == 1) {
                commit('saveAdminInfo', res.data);
            }else{
                throw new Error(res.type) //如果没有获取到管理员信息 就抛出具体错误提示
            }
        }catch(err){
            // console.log(err.message)
        }
    }
}

// 对外暴露一个 vuex store
export default new Vuex.Store({
    state,
    actions,
    mutations,
})