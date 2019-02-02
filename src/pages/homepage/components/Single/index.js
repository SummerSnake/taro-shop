import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import singleList from './mock-data';
import './index.less';

export default class Single extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <View className='singleWrap'>
        <Text className='singleH1'>精选单品</Text>
        {
          Array.isArray(singleList) && singleList.length > 0 && singleList.map((single) => {
            return (
              <View className='singleItemWrap' key={single.id}>
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
