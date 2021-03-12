import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Image, Text, ScrollView } from '@tarojs/components';
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
class GoodList extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      anchorIndex: 'anchor0',
      anchorIndex2: 'anchor0',
      isOpen: false, // 订单详情开关
      totalMoney: 0, // 合计总价
      badgeNum: 0, // 购物车 Icon 数字
      goodList: [],
    };
  }

  componentDidShow = () => {
    const { cartReducer = {} } = this.props;

    this.setState({
      totalMoney: cartReducer.totalMoney,
      badgeNum: cartReducer.badgeNum,
    });
  };

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    const res = await getRequest('/goodsList');
    if (res.status === 200) {
      const {
        data: { tabData = [] },
      } = res;

      this.setState({ goodList: tabData });

      const {
        router: { params = {} },
      } = getCurrentInstance() && getCurrentInstance();

      tabData.map((item, index) => {
        if (item.id === params.iconId) {
          this.setState({
            anchorIndex: `anchor${index}`,
            anchorIndex2: `anchor${index}`,
          });
        }
      });
    }

    this.setState({ isLoading: false });
  };

  /**
   * @desc 侧边栏按钮点击
   * @param { number } index
   */
  handleClick = (index) => {
    this.setState({
      anchorIndex: `anchor${index}`,
      anchorIndex2: `anchor${index}`,
    });
  };

  /**
   * @desc 监听滚动条滚动
   * @param { object } e
   */
  onScrollView = (e) => {
    if (e.currentTarget.id === 'panelRight' && Array.isArray(this.state.goodList)) {
      let tabDataArr = JSON.parse(JSON.stringify(this.state.goodList));
      let curTopArr = [];

      tabDataArr.map((item, index) => {
        // 获取右边栏每个title的当前所在高度
        Taro.createSelectorQuery()
          .select(`#anchor${index}`)
          .boundingClientRect((rect) => {
            curTopArr.push({ [`anchor${index}`]: rect.top });
            // 根据右边栏每个title的当前所在高度距离页面顶部的距离设置左边栏按钮样式
            curTopArr.map((offsetTop) => {
              if (offsetTop[`anchor${index}`] >= 0 && offsetTop[`anchor${index}`] < 200) {
                this.setState({ anchorIndex2: `anchor${index}` });
              }
            });
          })
          .exec();
      });
    }
  };

  /**
   * @desc 添加商品
   * @param { number } id
   * @param { string } name
   * @param { number } price
   * @param { object } e
   */
  addGood = async (id, name, price, e) => {
    e.stopPropagation();
    await this.props.dispatch(addToCart(id, name, price));
    const { cartReducer = {} } = this.props;

    this.setState({
      totalMoney: cartReducer.totalMoney,
      badgeNum: cartReducer.badgeNum,
    });
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
   * @desc 跳转购物车页面
   */
  goCart = () => {
    Taro.navigateTo({
      url: `/pages/cart/index`,
    });
  };

  /**
   * @desc 跳转商品详情
   * @param { number } id
   * @param { string } name
   * @param { number } price
   */
  goGoodInfo = (id, name, price) => {
    Taro.navigateTo({
      url: `/pages/goodInfo/index?id=${id}&name=${name}&price=${price}`,
    });
  };

  /**
   * @desc CartGoodList 子组件回调
   * @param { string }  type
   */
  callback = (type) => {
    if (type === '1') {
      this.setState({
        isOpen: false,
      });
    } else if (type === '2') {
      const { badgeNum = 0 } = this.state;

      this.setState({
        badgeNum: badgeNum + 1,
        totalMoney: this.props.cartReducer.totalMoney,
      });
    } else if (type === '3') {
      const { badgeNum = 0 } = this.state;

      this.setState({
        badgeNum: badgeNum - 1,
        totalMoney: this.props.cartReducer.totalMoney,
      });
    }
  };

  render() {
    const { anchorIndex, anchorIndex2, isOpen, totalMoney, badgeNum, goodList } = this.state;

    return (
      <View className="cartWrap">
        <ScrollView scroll-y="true" bindscrolltolower="onReachBottom" className="panelLeft">
          {goodList.map((item, index) => {
            return (
              <View
                key={item.id}
                onClick={this.handleClick.bind(this, index)}
                className={anchorIndex2 === `anchor${index}` ? 'titleActive' : 'titleDom'}
              >
                {item.title}
              </View>
            );
          })}
        </ScrollView>

        <ScrollView
          scroll-y="true"
          scrollIntoView={anchorIndex}
          scrollWithAnimation
          onScroll={this.onScrollView}
          className="panelRight"
          id="panelRight"
        >
          {goodList.map((list, index) => {
            return (
              <View key={list.id}>
                <View className="tabHead" id={`anchor${index}`}>
                  {list.title}
                </View>
                {list.proList.map((item) => {
                  return (
                    <View className="tabCon" key={item.id}>
                      <View
                        className="itemImgWrap"
                        onClick={this.goGoodInfo.bind(this, item.id, item.name, item.price)}
                      >
                        <Image className="itemImg" src={item.imageUrl} mode="widthFix" />
                      </View>
                      <View className="itemTxtWrap">
                        <View onClick={this.goGoodInfo.bind(this, item.id, item.name, item.price)}>
                          <Text className="itemTxt">{item.name}</Text>
                          <View className="itemCon">{item.desc}</View>
                        </View>

                        <View className="itemPrice">
                          ￥{item.price}
                          <View
                            className="iconWrap"
                            onClick={this.addGood.bind(this, item.id, item.name, item.price)}
                          >
                            <AtIcon value="add-circle" size="20" color="#2083e4" />
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>

        <View className="buyingWrap">
          <View className="buyingIcon" onClick={this.buyingInfo.bind(this)}>
            <View className="badgeDom" style={{ display: badgeNum > 0 ? 'block' : 'none' }}>
              {badgeNum}
            </View>
            <AtIcon value="shopping-cart" size="30" color="#fff" />
          </View>
          <View className="moneyDom">
            合计：<Text className="moneyTxt">￥{totalMoney}</Text>
          </View>
          <View className="goPay" onClick={this.goCart.bind(this)}>
            去结算
          </View>
        </View>

        <CartGoodList isOpen={isOpen} onIsOpen={this.callback} />

        <Loading isLoading={this.state.isLoading} />
      </View>
    );
  }
}

export default GoodList;
