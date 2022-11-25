import React from 'react';
import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, deleteFromCart } from '../../store/actions/cartActions';
import './index.less';

function CartGoodList(props) {
  const { onCloseShadow = () => {}, isOpen = false } = props;

  const cartReducer = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  /**
   * @desc 添加商品
   * @param { object } e
   * @param { number } id
   * @return { void }
   */
  const addGood = (e, id) => {
    e.stopPropagation();
    dispatch(addToCart(id));
  };

  /**
   * @desc 减少商品
   * @param { object } e
   * @param { number } id
   * @return { void }
   */
  const subtractNum = (e, id) => {
    e.stopPropagation();
    dispatch(deleteFromCart(id));

    if (Array.isArray(cartReducer?.cart) && cartReducer.cart.length < 1) {
      onCloseShadow();
    }
  };

  return (
    <View
      className="shadePanel"
      style={{ display: isOpen ? 'block' : 'none' }}
      onClick={() => onCloseShadow()}
    >
      <View className="buyingInfo" style={{ display: isOpen ? 'block' : 'none' }}>
        {Array.isArray(cartReducer?.cart) &&
          cartReducer?.cart.map((good) => {
            return (
              <View className="orderDom" key={good.id}>
                <Text className="buyingItemTxt">{good.title}</Text>
                <Text className="buyingItemTxt">￥{good.price * good.num}</Text>
                <View className="buyingItemOperate">
                  <View className="buyingItemIcon" onClick={(e) => subtractNum(e, good?.id)}>
                    <AtIcon value="subtract-circle" size="18" color="#2083e4" />
                  </View>
                  <Text className="buyingItemNum">{good.num}</Text>
                  <View className="buyingItemIcon" onClick={(e) => addGood(e, good?.id)}>
                    <AtIcon value="add-circle" size="18" color="#2083e4" />
                  </View>
                </View>
              </View>
            );
          })}
      </View>

      <View
        className="nullCartTxt"
        style={{ display: isOpen && cartReducer?.cart.length < 1 ? 'block' : 'none' }}
      >
        购物车是空的
      </View>
    </View>
  );
}

export default CartGoodList;
