import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { addToCart, deleteFromCart } from '../../store/actions/cartActions';
import './index.less';

@connect(({ cartReducer }) => ({
  cartReducer
}))
export default class Index extends Component {
  constructor() {
    super(...arguments);
  }

  /**
   * 添加商品
   * @param id
   * @param e
   */
  addGood = (id, e) => {
    e.stopPropagation();
    this.props.dispatch(addToCart(id));
    this.props.onIsOpen('2');
  };

  /**
   * 减少商品
   * @param id
   * @param e
   */
  subtractNum = (id, e) => {
    e.stopPropagation();
    this.props.dispatch(deleteFromCart(id));
    this.props.onIsOpen('3');
    if (this.props.cartReducer.cart.length < 1) {
      this.props.onIsOpen('1');
    }
  };

  /**
   * 关闭蒙层
   */
  shadeNone = () => {
    this.props.onIsOpen('1');
  };

  render() {
    const { isOpen } = this.props;
    const { cart } = this.props.cartReducer;
    return (
      <View
        className='shadePanel'
        style={{ display: isOpen ? 'block' : 'none' }}
        onClick={this.shadeNone}
      >
        <View className='buyingInfo' style={{ display: isOpen ? 'block' : 'none' }}>
          {
            Array.isArray(cart) && cart.length > 0 && cart.map((good) => {
              return (
                <View className='orderDom' key={good.id}>
                  <Text className='buyingItemTxt'>{good.name}</Text>
                  <Text className='buyingItemTxt'>￥{good.price * good.num}</Text>
                  <View className='buyingItemOperate'>
                    <View className='buyingItemIcon' onClick={this.subtractNum.bind(this, good.id)}>
                      <AtIcon value='subtract-circle' size='18' color='#2083e4' />
                    </View>
                    <Text className='buyingItemNum'>{good.num}</Text>
                    <View className='buyingItemIcon' onClick={this.addGood.bind(this, good.id)}>
                      <AtIcon value='add-circle' size='18' color='#2083e4' />
                    </View>
                  </View>
                </View>
              );
            })
          }
        </View>
        <View
          className='nullCartTxt'
          style={{ display: (isOpen && cart.length < 1) ? 'block' : 'none' }}
        >
          购物车是空的
        </View>
      </View>
    );
  }
}
