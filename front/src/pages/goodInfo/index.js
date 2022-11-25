import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Swiper, SwiperItem, ScrollView } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../store/actions/cartActions';
import CartGoodList from '../../components/CartGoodList/index';
import Loading from '../../components/Loading/index';
import { getRequest, postRequest } from '../../utils/api';
import './index.less';

function GoodInfo() {
  const {
    router: { params = {} },
  } = getCurrentInstance() && getCurrentInstance();

  const cartReducer = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const [infoData, setInfoData] = useState({ swiper: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * @desc 添加商品
   * @return { void }
   */
  const addGood = () => {
    const { id, title, price } = infoData;
    dispatch(addToCart(id, title, price));
  };

  /**
   * @desc 创建订单 - 跳转购物车页面
   * @param { string } page
   * @return { void }
   */
  const handleRedirect = async (page) => {
    if (page === 'cart') {
      const { cart = [] } = cartReducer;
      const goodIdArr = cart.map((item) => item?.id);

      const res = await postRequest('/order/create', {
        orderAmount: cartReducer?.totalMoney,
        goodIds: goodIdArr.join(),
      });

      if (res?.code === 200) {
        Taro.navigateTo({
          url: `/pages/cart/index`,
        });
      }
    } else {
      Taro.redirectTo({
        url: `/pages/${page}/index`,
      });
    }
  };

  /**
   * @desc 获取数据
   * @param { number } iconId
   * @return { void }
   */
  const handleFetchData = async () => {
    setIsLoading(true);
    const res = await getRequest('/good/info', { id: params.id });

    if (res?.code === 200) {
      setInfoData({
        ...res.data,
        swiper: res?.data?.imgList.split('#'),
      });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <View className="goodInfoWrap">
      <ScrollView scroll-y="true" scrollWithAnimation className="scrollDom">
        <Swiper indicatorColor="#999" indicatorActiveColor="#333" circular indicatorDots autoplay>
          {Array.isArray(infoData?.swiper) &&
            infoData?.swiper.map((item) => {
              return (
                <SwiperItem className="swipImgWrap" key={item}>
                  <Image src={item} className="swipImg" />
                </SwiperItem>
              );
            })}
        </Swiper>
        <View className="briefWrap">
          <View className="briefTop">
            <Text>{infoData.title}</Text>
            <Text className="briefSalesVolume">销量：{infoData.salesVolume}</Text>
          </View>
          <View className="briefMid">{infoData.description}</View>
          <View className="briefBottom">￥{infoData.price}</View>
        </View>
        {Array.isArray(infoData?.swiper) &&
          infoData?.swiper.map((item) => {
            return (
              <View className="detailWrap" key={item}>
                <View className="detailTitle">{infoData.title}</View>
                <View className="detailTxt">{infoData.description}</View>
                <View className="detailImgWrap">
                  <Image src={item} className="detailImg" />
                </View>
              </View>
            );
          })}
      </ScrollView>
      <View className="goodInfoBottom">
        <View className="bottomIconWrap">
          <View className="bottomIcon">
            <AtIcon value="home" size="30" color="#fff" onClick={() => handleRedirect('index')} />
            <View className="iconTxt">首页</View>
          </View>
          <View className="bottomIcon" onClick={() => handleRedirect('goodList')}>
            <AtIcon value="bullet-list" size="30" color="#fff" />
            <View className="iconTxt">分类</View>
          </View>
          <View className="bottomIcon" onClick={() => setIsOpen(!isOpen)}>
            <View
              className="badgeDom"
              style={{ display: cartReducer?.badgeNum > 0 ? 'block' : 'none' }}
            >
              {cartReducer?.badgeNum}
            </View>
            <AtIcon value="shopping-cart" size="30" color="#fff" />
            <View className="iconTxt">购物车</View>
          </View>
        </View>
        <View className="addToCart" onClick={addGood}>
          加入购物车
        </View>
        <View className="goPay" onClick={() => handleRedirect('cart')}>
          去结算
        </View>
      </View>

      <CartGoodList isOpen={isOpen} onCloseShadow={() => setIsOpen(false)} />

      <Loading isLoading={isLoading} />
    </View>
  );
}

export default GoodInfo;
