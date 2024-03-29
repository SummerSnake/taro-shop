import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Image, Text, ScrollView } from '@tarojs/components';
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
class GoodList extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      anchorIndex: 'anchor0',
      anchorIndex2: 'anchor0',
      isOpen: false, // 订单详情开关
      goodList: [],
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    const res = await getRequest('/good/list');
    if (res?.code === 200) {
      const arr = [
        { id: 1, title: '鱼类', list: [] },
        { id: 2, title: '节肢类', list: [] },
        { id: 3, title: '甲壳类', list: [] },
      ];
      const {
        data: { list = [] },
      } = res;

      if (Array.isArray(list)) {
        list.forEach((item) => {
          if (item.type === 1) {
            arr[0]?.list.push(item);
          }
          if (item.type === 2) {
            arr[1]?.list.push(item);
          }
          if (item.type === 3) {
            arr[2]?.list.push(item);
          }
        });
      }

      this.setState({ goodList: arr });

      const {
        router: { params = {} },
      } = getCurrentInstance() && getCurrentInstance();

      if (Array.isArray(list)) {
        list.forEach((item, index) => {
          if (item.id === parseInt(params.iconId)) {
            this.setState({
              anchorIndex: `anchor${index}`,
              anchorIndex2: `anchor${index}`,
            });
          }
        });
      }
    }

    this.setState({ isLoading: false });
  };

  /**
   * @desc 侧边栏按钮点击
   * @param { number } index
   * @return { void }
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
   * @return { void }
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
   * @param { string } title
   * @param { number } price
   * @param { object } e
   * @return { void }
   */
  addGood = async (id, title, price, e) => {
    e.stopPropagation();
    await this.props.dispatch(addToCart(id, title, price));
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
   * @return { void }
   */
  goCart = async () => {
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
  };

  /**
   * @desc 跳转商品详情
   * @param { number } id
   * @return { void }
   */
  goGoodInfo = (id) => {
    Taro.navigateTo({
      url: `/pages/goodInfo/index?id=${id}`,
    });
  };

  render() {
    const { cartReducer = {} } = this.props;
    const { anchorIndex, anchorIndex2, isOpen, goodList } = this.state;

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
          {goodList.map((child, index) => {
            return (
              <View key={child.id}>
                <View className="tabHead" id={`anchor${index}`}>
                  {child.title}
                </View>
                {child?.list.map((item) => {
                  return (
                    <View className="tabCon" key={item.id}>
                      <View className="itemImgWrap" onClick={this.goGoodInfo.bind(this, item.id)}>
                        <Image className="itemImg" src={item.imgUrl} mode="widthFix" />
                      </View>
                      <View className="itemTxtWrap">
                        <View onClick={this.goGoodInfo.bind(this, item.id)}>
                          <Text className="itemTxt">{item.title}</Text>
                          <View className="itemCon">{item.description}</View>
                        </View>

                        <View className="itemPrice">
                          ￥{item.price}
                          <View
                            className="iconWrap"
                            onClick={this.addGood.bind(this, item.id, item.title, item.price)}
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
            <View
              className="badgeDom"
              style={{ display: cartReducer?.badgeNum > 0 ? 'block' : 'none' }}
            >
              {cartReducer?.badgeNum}
            </View>
            <AtIcon value="shopping-cart" size="30" color="#fff" />
          </View>
          <View className="moneyDom">
            合计：<Text className="moneyTxt">￥{cartReducer?.totalMoney}</Text>
          </View>
          <View className="goPay" onClick={this.goCart.bind(this)}>
            去结算
          </View>
        </View>

        <CartGoodList isOpen={isOpen} onCloseShadow={() => this.setState({ isOpen: false })} />

        <Loading isLoading={this.state.isLoading} />
      </View>
    );
  }
}

export default GoodList;
