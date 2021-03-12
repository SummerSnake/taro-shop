import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Text, Image, Swiper, SwiperItem, ScrollView } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { connect } from 'react-redux';
import { addToCart } from '../../store/actions/cartActions';
import CartGoodList from '../../components/CartGoodList/index';
import Loading from '../../components/Loading/index';
import { getRequest } from '../../utils/api';
import './index.less';

@connect(({ cartReducer }) => ({
  cartReducer,
}))
class GoodInfo extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      isOpen: false,
      badgeNum: 0,
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

    const res = await getRequest('/goodInfo', { id: params.id });
    if (res && res.status === 200) {
      this.setState({
        fetchData: res.data,
      });
    }

    this.setState({
      isLoading: false,
      id: params.id,
      name: params.name,
      price: params.price,
    });
  };

  componentDidShow = () => {
    const { cartReducer = {} } = this.props;

    this.setState({
      badgeNum: cartReducer.badgeNum,
    });
  };

  /**
   * @desc 添加商品
   * @param { number } id
   * @param { string } name
   * @param { number } price
   */
  addGood = (id, name, price) => {
    const { badgeNum = 0 } = this.state;
    this.setState({ badgeNum: badgeNum + 1 });

    this.props.dispatch(addToCart(id, name, price));
  };

  /**
   * @desc 打开关闭购物车详情
   */
  buyingInfo = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  /**
   * @desc 跳转
   * @param { string } page
   */
  handleLinkTo = (page) => {
    Taro.redirectTo({
      url: `/pages/${page}/index`,
    });
  };

  /**
   * @desc CartGoodList 子组件回调
   * @param { string } type
   */
  callback = (type) => {
    if (type === '1') {
      this.setState({ isOpen: false });
    } else if (type === '2') {
      const { badgeNum = 0 } = this.state;

      this.setState({ badgeNum: badgeNum + 1 });
    } else if (type === '3') {
      const { badgeNum = 0 } = this.state;

      this.setState({ badgeNum: badgeNum - 1 });
    }
  };

  render() {
    const {
      fetchData = {},
      id = 0,
      name = '',
      price = '',
      isOpen = false,
      badgeNum = '',
    } = this.state;
    const { swiper } = fetchData;

    return (
      <View className="goodInfoWrap">
        <ScrollView scroll-y="true" scrollWithAnimation className="scrollDom">
          <Swiper indicatorColor="#999" indicatorActiveColor="#333" circular indicatorDots autoplay>
            {Array.isArray(swiper) &&
              swiper.length > 0 &&
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
              <Text>{fetchData.name}</Text>
              <Text className="briefSalesVolume">销量：{fetchData.salesVolume}</Text>
            </View>
            <View className="briefMid">{fetchData.desc}</View>
            <View className="briefBottom">￥{fetchData.price}</View>
          </View>
          {Array.isArray(swiper) &&
            swiper.length > 0 &&
            swiper.map((item) => {
              return (
                <View className="detailWrap" key={item}>
                  <View className="detailTitle">{fetchData.name}</View>
                  <View className="detailTxt">{fetchData.desc}</View>
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
              <View className="badgeDom" style={{ display: badgeNum > 0 ? 'block' : 'none' }}>
                {badgeNum}
              </View>
              <AtIcon value="shopping-cart" size="30" color="#fff" />
              <View className="iconTxt">购物车</View>
            </View>
          </View>
          <View className="addToCart" onClick={this.addGood.bind(this, id, name, price)}>
            加入购物车
          </View>
          <View className="goPay" onClick={this.handleLinkTo.bind(this, 'cart')}>
            去结算
          </View>
        </View>

        <CartGoodList isOpen={isOpen} onIsOpen={this.callback} />

        <Loading isLoading={this.state.isLoading} />
      </View>
    );
  }
}

export default GoodInfo;
