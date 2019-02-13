import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import singleList from './mock-data';
import './index.less';

export default class Single extends Component {
  constructor() {
    super(...arguments);
  }

  /**
   * 跳转商品详情
   * @param id
   * @param name
   * @param price
   */
  goGoodInfo = (id, name, price) => {
    this.$preload({
      id,
      name,
      price,
    });
    Taro.navigateTo({
      url: `/pages/goodInfo/index`
    });
  };

  render() {
    return (
      <View className='singleWrap'>
        {
          Array.isArray(singleList) && singleList.length > 0 && singleList.map((single) => {
            return (
              <View
                className='singleItemWrap'
                key={single.id}
                onClick={this.goGoodInfo.bind(this, single.id, single.name, single.price)}
              >
                <View className='singleTitle'>{single.title}</View>
                <View className='singleCon'>{single.content}</View>
                <View className='singleImgWrap'>
                  <Image className='singleImg' src={single.imgUrl} />
                </View>
              </View>
            );
          })
        }
      </View>
    );
  }
}
