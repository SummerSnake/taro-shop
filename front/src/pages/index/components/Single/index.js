import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Image } from '@tarojs/components';
import './index.less';

class Single extends Component {
  constructor() {
    super(...arguments);
  }

  /**
   * @desc 跳转商品详情
   * @param { number } id
   * @param { string } name
   * @param { number } price
   */
  goGoodInfo = (id, name, price) => {
    Taro.navigateTo({
      url: `/pages/goodInfo/index?id=${id}&name=${name}&price=${price}`,
    });
  };

  render() {
    const { singleList } = this.props;
    return (
      <View className="singleWrap">
        {Array.isArray(singleList) &&
          singleList.length > 0 &&
          singleList.map((single) => {
            return (
              <View
                className="singleItemWrap"
                key={single.id}
                onClick={this.goGoodInfo.bind(this, single.id, single.name, single.price)}
              >
                <View className="singleTitle">{single.name}</View>
                <View className="singleCon">{single.desc}</View>
                <View className="singleImgWrap">
                  <Image className="singleImg" src={single.imgUrl} />
                </View>
              </View>
            );
          })}
      </View>
    );
  }
}

export default Single;
