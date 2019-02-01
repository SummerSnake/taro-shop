import Taro, { Component } from '@tarojs/taro';
import { View, Image, Swiper, SwiperItem } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import GlobalFooter from '../../components/GlobalFooter/index';
import { imgList, iconList } from './mock-data';
import './index.less';

export default class Index extends Component {
  constructor() {
    super(...arguments);
  }

  config = {
    navigationBarTitleText: '首页',
    navigationBarBackgroundColor: '#000',
    navigationBarTextStyle: "white",
  };

  render() {
    return (
      <View className='homeWrap'>
        <Swiper
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
        >
          {
            Array.isArray(imgList) && imgList.length > 0 && imgList.map((img) => {
              return (
                <SwiperItem key={img.id}>
                  <Image className='slideImg' src={img.imgUrl} />
                </SwiperItem>
              );
            })
          }
        </Swiper>

        <View className='iconList'>
          {
            Array.isArray(iconList) && iconList.length > 0 && iconList.map((icon) => {
              return (
                <View className='iconItem'>
                  <View className='iconWrap' key={icon.id}>
                    <AtIcon value={icon.iconType} size='28' color='#fff' />
                  </View>
                  <View className='iconTitle'>{icon.title}</View>
                </View>
              );
            })
          }
        </View>

        <GlobalFooter isActive='01' />
      </View>
    );
  }
}
