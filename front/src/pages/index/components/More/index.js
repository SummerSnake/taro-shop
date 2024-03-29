import Taro from '@tarojs/taro';
import React from 'react';
import { View, Image } from '@tarojs/components';
import './index.less';

function More(props) {
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
    <View className="moreWrap">
      <View className="moreH1">更多推荐</View>
      {Array.isArray(list) &&
        list.map((item) => {
          return (
            <View className="moreItemWrap" key={item.id} onClick={() => goGoodInfo(item?.id)}>
              <View className="moreImgWrap">
                <Image className="moreImg" src={item.imgUrl} />
              </View>
              <View className="moreTitle">{item.title}</View>
              <View className="morePrice">￥{item.price}</View>
            </View>
          );
        })}
    </View>
  );
}

export default More;
