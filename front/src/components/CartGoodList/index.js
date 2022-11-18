import React, { Component } from 'react';
import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { connect } from 'react-redux';
import { addToCart, deleteFromCart } from '../../store/actions/cartActions';
import './index.less';

@connect(({ cartReducer }) => ({
  cartReducer,
}))
class CartGoodList extends Component {
  constructor() {
    super(...arguments);
  }

  /**
   * @desc 添加商品
   * @param { number } id
   * @param { object } e
   * @return { void }
   */
  addGood = (id, e) => {
    e.stopPropagation();
    this.props.dispatch(addToCart(id));
  };

  /**
   * @desc 减少商品
   * @param { number } id
   * @param { object } e
   * @return { void }
   */
  subtractNum = (id, e) => {
    e.stopPropagation();
    this.props.dispatch(deleteFromCart(id));

    if (this.props.cartReducer.cart.length < 1) {
      this.props.onCloseShadow();
    }
  };

  render() {
    const { isOpen } = this.props;
    const { cart } = this.props.cartReducer;
    return (
      <View
        className="shadePanel"
        style={{ display: isOpen ? 'block' : 'none' }}
        onClick={() => this.props.onCloseShadow()}
      >
        <View className="buyingInfo" style={{ display: isOpen ? 'block' : 'none' }}>
          {Array.isArray(cart) &&
            cart.map((good) => {
              return (
                <View className="orderDom" key={good.id}>
                  <Text className="buyingItemTxt">{good.title}</Text>
                  <Text className="buyingItemTxt">￥{good.price * good.num}</Text>
                  <View className="buyingItemOperate">
                    <View className="buyingItemIcon" onClick={this.subtractNum.bind(this, good.id)}>
                      <AtIcon value="subtract-circle" size="18" color="#2083e4" />
                    </View>
                    <Text className="buyingItemNum">{good.num}</Text>
                    <View className="buyingItemIcon" onClick={this.addGood.bind(this, good.id)}>
                      <AtIcon value="add-circle" size="18" color="#2083e4" />
                    </View>
                  </View>
                </View>
              );
            })}
        </View>

        <View
          className="nullCartTxt"
          style={{ display: isOpen && cart.length < 1 ? 'block' : 'none' }}
        >
          购物车是空的
        </View>
      </View>
    );
  }
}

export default CartGoodList;
