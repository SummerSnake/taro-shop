import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import moreList from './mock-data';
import './index.less';

export default class More extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <View className='moreWrap'>
        <View className='moreH1'>更多推荐</View>
        {
          Array.isArray(moreList) && moreList.length > 0 && moreList.map((more) => {
            return (
              <View className='moreItemWrap' key={more.id}>
                <View className='moreImgWrap'>
                  <Image className='moreImg' src={more.imgUrl} />
                </View>
                <View className='moreTitle'>{more.title}</View>
                <View className='morePrice'>￥{more.price}</View>
              </View>
            );
          })
        }
      </View>
    );
  }
}
