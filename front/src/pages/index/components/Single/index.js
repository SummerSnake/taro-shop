import Taro from '@tarojs/taro';
import React from 'react';
import { View, Image } from '@tarojs/components';
import './index.less';

function Single(props) {
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
    <View className="singleWrap">
      {Array.isArray(list) &&
        list.map((item) => {
          return (
            <View className="singleItemWrap" key={item.id} onClick={() => goGoodInfo(item?.id)}>
              <View className="singleTitle">{item.title}</View>
              <View className="singleCon">{item.title}</View>
              <View className="singleImgWrap">
                <Image className="singleImg" src={item.imgUrl} />
              </View>
            </View>
          );
        })}
    </View>
  );
}

export default Single;
