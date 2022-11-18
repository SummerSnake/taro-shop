import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Picker, Text } from '@tarojs/components';
import { AtInput, AtIcon, AtToast } from 'taro-ui';
import { connect } from 'react-redux';
import { addToCart, deleteFromCart } from '../../store/actions/cartActions';
import { getRequest } from '../../utils/api';
import './index.less';

@connect(({ cartReducer, userReducer }) => ({
  cartReducer,
  userReducer,
}))
class Cart extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      selector: [
        { id: 1, value: 5, name: '5元' },
        { id: 2, value: 10, name: '10元' },
        { id: 3, value: 15, name: '15元' },
        { id: 4, value: 20, name: '20元' },
      ],
      selectorChecked: '请选择优惠券',
      discountMoney: 0, // 优惠券金额
      inputVal: '',
      isOpen: false,
    };
  }

  /**
   * @desc 添加商品
   * @param { number } id
   * @return { void }
   */
  addGood = (id) => {
    this.props.dispatch(addToCart(id));
  };

  /**
   * @desc 减少商品
   * @param { number } id
   * @return { void }
   */
  subtractNum = (id) => {
    this.props.dispatch(deleteFromCart(id));
  };

  /**
   * @desc 选择优惠券
   * @param { object } e
   * @return { void }
   */
  onSelectChange = (e) => {
    const totalMoney = this.props.cartReducer.totalMoney;
    const selected = this.state.selector[e.detail.value];
    let discountMoney = selected.value;

    this.setState({
      selectorChecked: selected.value <= totalMoney ? selected.name : this.state.selectorChecked,
      discountMoney,
    });
  };

  /**
   * @desc 填写备注
   * @param { string } inputVal
   * @return { void }
   */
  inputValChange = (inputVal) => {
    this.setState({
      inputVal,
    });
  };

  /**
   * @desc 支付
   * @return { void }
   */
  confirmPay = async () => {
    const res = await getRequest('/mock/payApi');
    if (res?.code === 200) {
      Taro.requestPayment({
        timeStamp: 1,
        nonceStr: 1,
        package: 1,
        signType: 1,
        paySign: 1,
      });
    }
  };

  render() {
    const { userReducer = {}, cartReducer = {} } = this.props;
    const { consignee, address, phone } = userReducer;
    const { cart, totalMoney } = cartReducer;
    const { selector, discountMoney, isOpen } = this.state;

    return (
      <View className="orderWrap">
        <View className="userInfo">
          <Text className="userInfoTxt">收货人：{consignee}</Text>
          <Text className="userInfoTxt">联系方式：{phone}</Text>
          <View className="userInfoAddr">收货地址：{address}</View>
        </View>

        <View className="goodsWrap">
          <View className="goodsTitle">已购商品</View>
          {Array.isArray(cart) &&
            cart.map((item) => {
              return (
                <View className="goodsList" key={item.id}>
                  <Text className="goodName">{item.title}</Text>
                  <View className="goodOperate">
                    <View className="goodIcon" onClick={this.subtractNum.bind(this, item.id)}>
                      <AtIcon value="subtract-circle" size="18" color="#2083e4" />
                    </View>
                    <Text className="goodNum">x{item.num}</Text>
                    <View
                      className="goodIcon"
                      onClick={this.addGood.bind(this, item.id, null, null)}
                    >
                      <AtIcon value="add-circle" size="18" color="#2083e4" />
                    </View>
                  </View>
                  <Text className="goodPrice">￥{item.price * item.num}</Text>
                </View>
              );
            })}

          <Picker mode="selector" range={selector} rangeKey="name" onChange={this.onSelectChange}>
            <View className="couponPicker">
              红包<Text className="couponTxt">{this.state.selectorChecked}</Text>
            </View>
          </Picker>

          <View className="totalMoney">
            合计：
            <Text className="totalMoneyNum">￥{totalMoney - discountMoney}</Text>
          </View>

          <View>
            <AtInput
              name="value"
              title="备注："
              type="text"
              placeholder="请输入备注"
              value={this.state.inputVal}
              onChange={this.inputValChange.bind(this)}
            />
          </View>
        </View>

        <View className="orderBottom">
          <View className="bottomTotal">待支付：￥{totalMoney - discountMoney}</View>
          <View className="bottomCoupon">已优惠：￥{discountMoney}</View>
          <View className="confirmPay" onClick={this.confirmPay}>
            确认支付
          </View>
        </View>

        <AtToast isOpened={isOpen} text="优惠券金额不可以大于总金额" icon="close-circle" />
      </View>
    );
  }
}

export default Cart;
