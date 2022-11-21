import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Text, Image, Swiper, SwiperItem, ScrollView } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { connect } from 'react-redux';
import { addToCart } from '../../store/actions/cartActions';
import CartGoodList from '../../components/CartGoodList/index';
import Loading from '../../components/Loading/index';
import { getRequest, postRequest } from '../../utils/api';
import './index.less';

@connect(({ cartReducer }) => ({
  cartReducer,
}))
class GoodInfo extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      isOpen: false,
      fetchData: {
        swiper: [],
      },
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const {
      router: { params = {} },
    } = getCurrentInstance() && getCurrentInstance();

    const res = await getRequest('/good/info', { id: params.id });
    if (res?.code === 200) {
      this.setState({
        fetchData: {
          ...res.data,
          swiper: res?.data?.imgList.split('#'),
        },
      });
    }

    this.setState({
      isLoading: false,
    });
  };

  /**
   * @desc 添加商品
   * @return { void }
   */
  addGood = () => {
    const { id, title, price } = this.state.fetchData;
    this.props.dispatch(addToCart(id, title, price));
  };

  /**
   * @desc 打开关闭购物车详情
   * @return { void }
   */
  buyingInfo = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  /**
   * @desc 创建订单 - 跳转购物车页面
   * @param { string } page
   * @return { void }
   */
  handleLinkTo = async (page) => {
    if (page === 'cart') {
      const { cartReducer = {} } = this.props;
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

  render() {
    const { cartReducer = {} } = this.props;
    const { fetchData = {}, isOpen = false } = this.state;
    const { swiper = [] } = fetchData;

    return (
      <View className="goodInfoWrap">
        <ScrollView scroll-y="true" scrollWithAnimation className="scrollDom">
          <Swiper indicatorColor="#999" indicatorActiveColor="#333" circular indicatorDots autoplay>
            {Array.isArray(swiper) &&
              swiper.map((item) => {
                return (
                  <SwiperItem className="swipImgWrap" key={item}>
                    <Image src={item} className="swipImg" />
                  </SwiperItem>
                );
              })}
          </Swiper>
          <View className="briefWrap">
            <View className="briefTop">
              <Text>{fetchData.title}</Text>
              <Text className="briefSalesVolume">销量：{fetchData.salesVolume}</Text>
            </View>
            <View className="briefMid">{fetchData.description}</View>
            <View className="briefBottom">￥{fetchData.price}</View>
          </View>
          {Array.isArray(swiper) &&
            swiper.map((item) => {
              return (
                <View className="detailWrap" key={item}>
                  <View className="detailTitle">{fetchData.title}</View>
                  <View className="detailTxt">{fetchData.description}</View>
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
              <AtIcon
                value="home"
                size="30"
                color="#fff"
                onClick={this.handleLinkTo.bind(this, 'index')}
              />
              <View className="iconTxt">首页</View>
            </View>
            <View className="bottomIcon" onClick={this.handleLinkTo.bind(this, 'goodList')}>
              <AtIcon value="bullet-list" size="30" color="#fff" />
              <View className="iconTxt">分类</View>
            </View>
            <View className="bottomIcon" onClick={this.buyingInfo.bind(this)}>
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
          <View className="addToCart" onClick={this.addGood.bind(this)}>
            加入购物车
          </View>
          <View className="goPay" onClick={this.handleLinkTo.bind(this, 'cart')}>
            去结算
          </View>
        </View>

        <CartGoodList isOpen={isOpen} onCloseShadow={() => this.setState({ isOpen: false })} />

        <Loading isLoading={this.state.isLoading} />
      </View>
    );
  }
}

export default GoodInfo;
