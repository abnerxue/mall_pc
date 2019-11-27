import Vue from 'vue'
import Router from 'vue-router'
// 订单
import index from '@/components/index'
import orderDetail from '@/components/order/order_detail'
import orderGroup from '@/components/order/order_group'
import orderIntegral from '@/components/order/order_integral'
import orderSeckill from '@/components/order/order_seckill'
import orderEvaluate from '@/components/order/order_evaluate'
import orderLogistics from '@/components/order/order_logistics'
// 邀请中心
import inviteFriends from '@/components/invite/invite_friends'
import returnCeremony from '@/components/invite/return_ceremony'
import cashOut from '@/components/invite/cash_out'
// 会员服务
import myComments from '@/components/vipServices/my_comments'
// 账户中心
import packetRecords from '@/components/account/packet_records'
import myMessage from '@/components/account/my_message'

import addressManagement from '@/components/account/address_management'
import changePassword from '@/components/account/change_password'
import accountSafety from '@/components/account/account_safety'
import addressManage from '@/components/account/address_manage'
// 活动中心
import joinCompetition from '@/components/activity/join_competition'
import startCompetition from '@/components/activity/start_competition'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: {
        name: 'index'
      }
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    //团购订单
    {
      path: '/order_group',
      name: 'orderGroup',
      component: orderGroup
    },
    //秒杀订单
    {
      path: '/order_seckill',
      name: 'orderSeckill',
      component: orderSeckill
    },
    //积分换购订单
    {
      path: '/order_integral',
      name: 'orderIntegral',
      component: orderIntegral
    },
    //订单详情
    {
      path: '/order/order_detail',
      name: 'orderDetail',
      component: orderDetail
    },
    //查看物流
    {
      path: '/order/order_logistics',
      name: 'orderLogistics',
      component: orderLogistics
    },
    // 订单评价
    {
      path: '/order/order_evaluate',
      name: 'orderEvaluate',
      component: orderEvaluate
    },
    //邀请好友
    {
      path: '/invite/invite_friends',
      name: 'inviteFriends',
      component: inviteFriends
    },
    //返现豪礼
    {
      path: '/invite/return_ceremony',
      name: 'returnCeremony',
      component: returnCeremony,
    },
    //提现
    {
      path: '/invite/return_ceremony/cash_out',
      name: 'cashOut',
      component: cashOut
    },
    //我的评论
    {
      path: '/vipServices/my_comments',
      name: 'myComments',
      component: myComments
    },
    //红包记录
    {
      path: '/account/packet_records',
      name: 'packetRecords',
      component: packetRecords
    },
    //消息
    {
      path: '/account/my_message',
      name: 'myMessage',
      component: myMessage
    },
    //参与团购
    {
      path: '/activity/join_competition',
      name: 'joinCompetition',
      component: joinCompetition
    },
    //发起团购
    {
      path: '/activity/start_competition',
      name: 'startCompetition',
      component: startCompetition
    },
    //地址管理
    {
      path: '/account/address_management',
      name: 'addressManagement',
      component: addressManagement
    },

    //账户安全、修改密码
    {
      path: '/account/change_password',
      name: 'changePassword',
      component: changePassword
    },
    {
      path: '/account/address_manage',
      name: 'addressManage',
      component: addressManage
    },
    {
      path: '/account/account_safety',
      name: 'accountSafety',
      component: accountSafety
    },
  ]
})
