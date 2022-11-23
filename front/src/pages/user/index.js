import Taro from '@tarojs/taro';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Image, ScrollView } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import GlobalFooter from '../../components/GlobalFooter/index';
import './index.less';

function User() {
  const userReducer = useSelector((state) => state.userReducer);
  const [userInfo, setUserInfo] = useState({
    nickName: 'SummerSnake',
    avatar: 'https://s1.ax1x.com/2020/06/03/tdShb8.png',
    phone: '',
    address: '',
    consignee: '',
  });

  /**
   * @desc 跳转订单列表
   * @param { number } status
   * @return { void }
   */
  const handleGoOrder = (status) => {
    Taro.navigateTo({
      url: `/pages/order/index?orderStatus=${status}`,
    });
  };

  /**
   * @desc 跳转编辑个人信息
   * @return { void }
   */
  const handleGoUserEdit = () => {
    Taro.navigateTo({
      url: '/pages/userEdit/index',
    });
  };

  /**
   * @desc 更新数据
   */
  useEffect(() => {
    setUserInfo({
      ...userInfo,
      phone: userReducer.phone,
      address: userReducer.address,
      consignee: userReducer.consignee,
    });
  }, [userReducer]);

  return (
    <View className="homeWrap">
      <ScrollView scroll-y="true" scrollWithAnimation className="scrollDom">
        <View className="headWrap">
          <View className="userInfoWrap">
            <View className="avatarWrap">
              <Image className="avatarImg" src={userInfo?.avatar} />
            </View>
            <View className="nickName">{userInfo?.nickName}</View>
          </View>
          <Image className="backImg" src={userInfo?.avatar} />
        </View>

        <View className="iconListWrap">
          <View className="iconList">
            <View className="iconItem" onClick={() => handleGoOrder(1)}>
              <AtIcon value="lightning-bolt" size="30" color="#999" />
              <View className="iconItemTxt">未支付</View>
            </View>
            <View className="iconItem" onClick={() => handleGoOrder(2)}>
              <AtIcon value="heart" size="30" color="#999" />
              <View className="iconItemTxt">待发货</View>
            </View>
            <View className="iconItem" onClick={() => handleGoOrder(3)}>
              <AtIcon value="heart-2" size="30" color="#999" />
              <View className="iconItemTxt">已发货</View>
            </View>
          </View>
        </View>

        <View className="gridListWrap">
          <View className="gridList">
            <View className="gridItem" onClick={handleGoUserEdit}>
              <View className="gridItemIcon">
                <AtIcon value="lightning-bolt" size="30" color="#999" />
              </View>
              <View className="gridItemTxt">
                <View className="gridItemTitle">收货人</View>
                <View className="gridItemCon">{userInfo?.consignee}</View>
              </View>
            </View>
            <View className="gridItem" onClick={handleGoUserEdit}>
              <View className="gridItemIcon">
                <AtIcon value="lightning-bolt" size="30" color="#999" />
              </View>
              <View className="gridItemTxt">
                <View className="gridItemTitle">收货地址</View>
                <View className="gridItemCon">{userInfo?.address}</View>
              </View>
            </View>
          </View>

          <View className="gridList">
            <View className="gridItem" onClick={handleGoUserEdit}>
              <View className="gridItemIcon">
                <AtIcon value="lightning-bolt" size="30" color="#999" />
              </View>
              <View className="gridItemTxt">
                <View className="gridItemTitle">联系电话</View>
                <View className="gridItemCon">{userInfo?.phone}</View>
              </View>
            </View>
            <View className="gridItem">
              <View className="gridItemIcon">
                <AtIcon value="lightning-bolt" size="30" color="#999" />
              </View>
              <View className="gridItemTxt">
                <View className="gridItemTitle">我的收藏</View>
                <View className="gridItemCon">...</View>
              </View>
            </View>
          </View>
        </View>

        <View className="sysList">
          <View className="sysItem">用户反馈</View>
          <View className="sysItem">关于我们</View>
        </View>
      </ScrollView>

      <GlobalFooter isActive="04" />
    </View>
  );
}

export default User;
