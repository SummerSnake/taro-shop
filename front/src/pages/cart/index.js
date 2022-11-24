import Taro from '@tarojs/taro';
import React, { useState } from 'react';
import { View, Picker, Text } from '@tarojs/components';
import { AtInput, AtIcon, AtToast } from 'taro-ui';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, deleteFromCart } from '../../store/actions/cartActions';
import { getRequest } from '../../utils/api';
import './index.less';

function Cart() {
  const couponList = [
    { id: 1, value: 5, name: '5元' },
    { id: 2, value: 10, name: '10元' },
    { id: 3, value: 15, name: '15元' },
    { id: 4, value: 20, name: '20元' },
  ];

  const userReducer = useSelector((state) => state.userReducer);
  const cartReducer = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const [checkedVal, setCheckedVal] = useState('请选择优惠券');
  const [couponAmount, setCouponAmount] = useState('请选择优惠券');
  const [inputVal, setInputVal] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  /**
   * @desc 选择优惠券
   * @param { object } e
   * @return { void }
   */
  const onSelectChange = (e) => {
    const selected = couponList[e?.target.value];

    setCouponAmount(selected?.value);

    if (selected?.value <= cartReducer?.totalMoney) {
      setCheckedVal(selected?.name);
      return;
    }

    setIsOpen(true);
  };

  /**
   * @desc 支付
   * @return { void }
   */
  const handlePayment = async () => {
    const res = await getRequest('/mock/payApi', { inputVal });

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

  return (
    <View className="orderWrap">
      <View className="userInfo">
        <Text className="userInfoTxt">收货人：{userReducer?.consignee}</Text>
        <Text className="userInfoTxt">联系方式：{userReducer?.phone}</Text>
        <View className="userInfoAddr">收货地址：{userReducer?.address}</View>
      </View>

      <View className="goodsWrap">
        <View className="goodsTitle">已购商品</View>
        {Array.isArray(cartReducer?.cart) &&
          cartReducer?.cart.map((item) => {
            return (
              <View className="goodsList" key={item.id}>
                <Text className="goodName">{item.title}</Text>
                <View className="goodOperate">
                  <View className="goodIcon" onClick={() => dispatch(deleteFromCart(item?.id))}>
                    <AtIcon value="subtract-circle" size="18" color="#2083e4" />
                  </View>
                  <Text className="goodNum">x{item.num}</Text>
                  <View className="goodIcon" onClick={() => dispatch(addToCart(item?.id))}>
                    <AtIcon value="add-circle" size="18" color="#2083e4" />
                  </View>
                </View>
                <Text className="goodPrice">￥{item.price * item.num}</Text>
              </View>
            );
          })}

        <Picker mode="selector" range={couponList} rangeKey="name" onChange={onSelectChange}>
          <View className="couponPicker">
            红包<Text className="couponTxt">{checkedVal}</Text>
          </View>
        </Picker>

        <View className="totalMoney">
          合计：
          <Text className="totalMoneyNum">
            ￥
            {typeof couponAmount === 'string'
              ? cartReducer?.totalMoney
              : cartReducer?.totalMoney - couponAmount}
          </Text>
        </View>

        <View>
          <AtInput
            name="value"
            title="备注："
            type="text"
            placeholder="请输入备注"
            onChange={(value) => setInputVal(value)}
          />
        </View>
      </View>

      <View className="orderBottom">
        <View className="bottomTotal">待支付：￥{cartReducer?.totalMoney - couponAmount}</View>
        <View className="bottomCoupon">已优惠：￥{couponAmount}</View>
        <View className="confirmPay" onClick={handlePayment}>
          确认支付
        </View>
      </View>

      <AtToast isOpened={isOpen} text="优惠券金额不可以大于总金额" icon="close-circle" />
    </View>
  );
}

export default Cart;
