import Taro from '@tarojs/taro';
import React from 'react';
import { View, Image } from '@tarojs/components';
import './index.less';

function Special(props) {
  const { list = [] } = props;

  /**
   * @desc 跳转商品详情
   * @param { object } item
   * @return { void }
   */
  const goGoodInfo = (item) => {
    Taro.navigateTo({
      url: `/pages/goodInfo/index?id=${item?.id}&name=${item?.title}&price=${item?.price}`,
    });
  };

  return (
    <View className="specialWrap">
      <View className="specialH1">专题推荐</View>
      {Array.isArray(list) &&
        list.map((item) => {
          return (
            <View className="specialItemWrap" key={item.id} onClick={() => goGoodInfo(item)}>
              <View className="specialImgWrap">
                <Image className="specialImg" src={item.imgUrl} />
              </View>
              <View className="specialTitle">{item.title}</View>
              <View className="specialPrice">￥{item.price}</View>
            </View>
          );
        })}
    </View>
  );
}

export default Special;
