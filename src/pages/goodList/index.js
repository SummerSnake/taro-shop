import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, ScrollView } from '@tarojs/components';
import { AtIcon, AtBadge } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { addToCart } from '../../store/actions/cartActions';
import CartGoodList from '../../components/CartGoodList/index';
import tabData from './mock-data';
import './index.less';

@connect(({ cartReducer }) => ({
  cartReducer
}))
export default class GoodList extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      anchorIndex: 'anchor0',
      anchorIndex2: 'anchor0',
      isOpen: false, // 订单详情开关
      totalMoney: 0, // 合计总价
      badgeNum: 0, // 购物车 Icon 数字
    };
  }

  config = {
    navigationBarTitleText: '商品列表',
    navigationBarBackgroundColor: '#000',
    navigationBarTextStyle: "white",
  };

  componentDidShow = () => {
    const { cartReducer } = this.props;
    this.setState({
      totalMoney: cartReducer.totalMoney,
      badgeNum: cartReducer.badgeNum,
    });
  };

  componentDidMount = () => {
    tabData.map((item, index) => {
      if (item.id === this.$router.preload.iconId) {
        this.setState({
          anchorIndex: `anchor${index}`,
          anchorIndex2: `anchor${index}`
        });
      }
    });
  };

  /**
   * 侧边栏按钮点击
   * @param index
   */
  handleClick = (index) => {
    this.setState({
      anchorIndex: `anchor${index}`,
      anchorIndex2: `anchor${index}`
    });
  };

  /**
   * 监听滚动条滚动
   * @param e
   */
  onScrollView(e) {
    if (e.currentTarget.id === 'panelRight' && Array.isArray(this.state.tabData)) {
      let tabDataArr = JSON.parse(JSON.stringify(this.state.tabData));
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
          }).exec();
      });
    }
  }

  /**
   * 添加商品
   * @param id
   * @param name
   * @param price
   * @param e
   */
  addGood = (id, name, price, e) => {
    e.stopPropagation();
    this.props.dispatch(addToCart(id, name, price));
    const { cartReducer } = this.props;

    this.setState({
      totalMoney: cartReducer.totalMoney,
      badgeNum: cartReducer.badgeNum,
    });
  };

  /**
   * 打开关闭购物车详情
   */
  buyingInfo() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  /**
   * 跳转购物车页面
   */
  goCart = () => {
    Taro.navigateTo({
      url: `/pages/cart/index`
    });
  };

  /**
   * 跳转商品详情
   * @param id
   * @param name
   * @param price
   */
  goGoodInfo = (id, name, price) => {
    this.$preload({ id, name, price });
    Taro.navigateTo({
      url: `/pages/goodInfo/index`
    });
  };

  /**
   * CartGoodList 子组件回调
   * @param type
   */
  callback(type) {
    if (type === '1') {
      this.setState({ isOpen: false });
    } else if (type === '2') {
      let badgeNum = this.state.badgeNum;
      badgeNum += 1;
      this.setState({
        badgeNum: badgeNum,
      });
    } else if (type === '3') {
      let badgeNum = this.state.badgeNum;
      badgeNum -= 1;
      this.setState({
        badgeNum: badgeNum,
      });
    }
  }

  render() {
    const { anchorIndex, anchorIndex2, isOpen, totalMoney, badgeNum } = this.state;
    return (
      <View className='cartWrap'>
        <ScrollView
          scroll-y='true'
          bindscrolltolower='onReachBottom'
          className='panelLeft'
        >
          {
            tabData.map((item, index) => {
              return (
                <View
                  key={item.id}
                  onClick={this.handleClick.bind(this, index)}
                  className={anchorIndex2 === `anchor${index}` ? 'titleActive' : 'titleDom'}
                >
                  {item.title}
                </View>
              );
            })
          }
        </ScrollView>

        <ScrollView
          scroll-y='true'
          scrollIntoView={anchorIndex}
          scrollWithAnimation
          onScroll={this.onScrollView}
          className='panelRight'
          id='panelRight'
        >
          {
            tabData.map((list, index) => {
              return (
                <View key={list.id}>
                  <View className='tabHead' id={`anchor${index}`}>
                    {list.title}
                  </View>
                  {
                    list.proList.map((item) => {
                      return (
                        <View
                          className='tabCon'
                          key={item.id}
                          onClick={this.goGoodInfo.bind(this, item.id, item.name, item.price)}
                        >
                          <View className='itemImgWrap'>
                            <Image className='itemImg' src={item.imageUrl} mode='widthFix' />
                          </View>
                          <View className='itemTxtWrap'>
                            <Text className='itemTxt'>{item.name}</Text>
                            <View className='itemCon'>{item.content}</View>
                            <View className='itemPrice'>￥{item.price}
                              <View
                                className='iconWrap'
                                onClick={this.addGood.bind(this, item.id, item.name, item.price)}
                              >
                                <AtIcon
                                  value='add-circle'
                                  size='20'
                                  color='#2083e4'
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                      );
                    })
                  }
                </View>
              );
            })
          }
        </ScrollView>

        <View className='buyingWrap'>
          <View className='buyingIcon' onClick={this.buyingInfo}>
            <AtBadge value={badgeNum > 0 ? badgeNum : ''}>
              <AtIcon value='shopping-cart' size='30' color='#fff' />
            </AtBadge>
          </View>
          <View className='moneyDom'>合计：<Text className='moneyTxt'>￥{totalMoney}</Text></View>
          <View className='goPay' onClick={this.goCart}>去结算</View>
        </View>
        <CartGoodList
          isOpen={isOpen}
          onIsOpen={this.callback}
        />
      </View>
    );
  }
}
