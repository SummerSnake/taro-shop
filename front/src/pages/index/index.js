import Taro from '@tarojs/taro';
import React, { useState, useEffect } from 'react';
import { View, Image, Swiper, SwiperItem } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import Single from './components/Single/index';
import Special from './components/Special/index';
import More from './components/More/index';
import Loading from '../../components/Loading/index';
import GlobalFooter from '../../components/GlobalFooter/index';
import { getRequest } from '../../utils/api';
import './index.less';

function Index() {
  const [fetchData, setFetchData] = useState({
    swipperList: [],
    iconList: [],
    singleList: [],
    goodsList: [],
    bannerUrl: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  /**
   * @desc 跳转商品列表
   * @param { number } index
   * @return { void }
   */
  const goGoodList = (index) => {
    Taro.navigateTo({
      url: `/pages/goodList/index?iconId=${index}`,
    });
  };

  /**
   * @desc 获取数据
   * @param { number } iconId
   * @return { void }
   */
  const handleFetchData = async () => {
    setIsLoading(true);
    const res = await getRequest('/home/data');

    if (res?.code === 200) {
      setFetchData(res?.data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <View className="homeWrap">
      <Swiper indicatorColor="#999" indicatorActiveColor="#fff" circular indicatorDots autoplay>
        {Array.isArray(fetchData?.swipperList) &&
          fetchData?.swipperList.map((img) => {
            return (
              <SwiperItem key={img.id}>
                <Image className="slideImg" src={img.imgUrl} />
              </SwiperItem>
            );
          })}
      </Swiper>

      <View className="iconList">
        {Array.isArray(fetchData?.iconList) &&
          fetchData?.iconList.map((icon, index) => {
            return (
              <View className="iconItem" key={icon.id} onClick={() => goGoodList(index)}>
                <View className="iconWrap">
                  <AtIcon value={icon.imgUrl} size="28" color="#fff" />
                </View>
                <View className="iconTitle">{icon.title}</View>
              </View>
            );
          })}
      </View>

      <View className="logoWrap">
        <Image className="logoImg" src={fetchData?.bannerUrl} />
      </View>

      <View className="titleDom">精选单品</View>
      <Single list={fetchData?.singleList} />

      <Special list={fetchData?.goodsList} />

      <More list={fetchData?.goodsList} />

      <Loading isLoading={isLoading} />

      <GlobalFooter isActive="01" />
    </View>
  );
}

export default Index;
