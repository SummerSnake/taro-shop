import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import singleList from './mock-data';
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
          Array.isArray(singleList) && singleList.length > 0 && singleList.map((special) => {
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
