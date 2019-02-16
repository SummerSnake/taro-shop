import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './index.less';

export default class More extends Component {
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
    const { moreList } = this.props;
    return (
      <View className='moreWrap'>
        <View className='moreH1'>更多推荐</View>
        {
          Array.isArray(moreList) && moreList.length > 0 && moreList.map((more) => {
            return (
              <View
                className='moreItemWrap'
                key={more.id}
                onClick={this.goGoodInfo.bind(this, more.id, more.name, more.price)}
              >
                <View className='moreImgWrap'>
                  <Image className='moreImg' src={more.imgUrl} />
                </View>
                <View className='moreTitle'>{more.name}</View>
                <View className='morePrice'>￥{more.price}</View>
              </View>
            );
          })
        }
      </View>
    );
  }
}
