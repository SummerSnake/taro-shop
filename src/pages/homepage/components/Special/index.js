import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import specialList from './mock-data';
import './index.less';

export default class Special extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <View className='specialWrap'>
        <View className='specialH1'>专题推荐</View>
        {
          Array.isArray(specialList) && specialList.length > 0 && specialList.map((special) => {
            return (
              <View className='specialItemWrap' key={special.id}>
                <View className='specialImgWrap'>
                  <Image className='specialImg' src={special.imgUrl} />
                </View>
                <View className='specialTitle'>{special.title}</View>
                <View className='specialPrice'>￥{special.price}</View>
              </View>
            );
          })
        }
      </View>
    );
  }
}
