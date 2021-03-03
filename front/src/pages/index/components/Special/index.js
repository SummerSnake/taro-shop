import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './index.less';

class Special extends Component {
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
      <View className='specialWrap'>
        <View className='specialH1'>专题推荐</View>
        {
          Array.isArray(moreList) && moreList.length > 0 && moreList.map((special) => {
            return (
              <View
                className='specialItemWrap'
                key={special.id}
                onClick={this.goGoodInfo.bind(this, special.id, special.name, special.price)}
              >
                <View className='specialImgWrap'>
                  <Image className='specialImg' src={special.imgUrl} />
                </View>
                <View className='specialTitle'>{special.name}</View>
                <View className='specialPrice'>￥{special.price}</View>
              </View>
            );
          })
        }
      </View>
    );
  }
}

export default Special;
