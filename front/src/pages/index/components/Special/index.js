import Taro from '@tarojs/taro';
import React from 'react';
import { View, Image } from '@tarojs/components';
import './index.less';

function Special(props) {
  const { list = [] } = props;

  /**
   * @desc 跳转商品详情
   * @param { number } id
   * @return { void }
   */
  const goGoodInfo = (id) => {
    Taro.navigateTo({
      url: `/pages/goodInfo/index?id=${id}`,
    });
  };

  return (
    <View className="specialWrap">
      <View className="specialH1">专题推荐</View>
      {Array.isArray(list) &&
        list.map((item) => {
          return (
            <View className="specialItemWrap" key={item.id} onClick={() => goGoodInfo(item?.id)}>
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
