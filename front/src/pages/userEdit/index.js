import Taro from '@tarojs/taro';
import React, { useState } from 'react';
import { View, Input } from '@tarojs/components';
import { AtToast } from 'taro-ui';
import { useSelector, useDispatch } from 'react-redux';
import { editUserInfo } from '../../store/actions/userActions';
import './index.less';

function UserEdit() {
  const userReducer = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    phone: userReducer.phone,
    address: userReducer.address,
    consignee: userReducer.consignee,
  });
  const [isOpen, setIsOpen] = useState(false);

  /**
   * @desc input change 事件
   * @param { sign } string
   * @param { object } e
   * @return { void }
   */
  const handleInputChange = (sign, e) => {
    setUserInfo({
      ...userInfo,
      [sign]: e?.target.value,
    });
  };

  /**
   * @desc 提交
   * @return { void }
   */
  const handleSubmit = () => {
    setIsOpen(true);
    dispatch(editUserInfo(userInfo?.consignee, userInfo?.address, userInfo?.phone));

    setTimeout(() => {
      setIsOpen(false);
      Taro.navigateBack();
    }, 2000);
  };

  return (
    <View className="userEditWrap">
      <View className="infoItem">
        <View className="prefixDom">收货人：</View>
        <View className="inputDom">
          <Input
            type="text"
            value={userInfo?.consignee}
            onInput={(e) => handleInputChange('consignee', e)}
            className="inputNode"
          />
        </View>
      </View>

      <View className="infoItem">
        <View className="prefixDom">收货地址：</View>
        <View className="inputDom">
          <Input
            type="text"
            value={userInfo?.address}
            onInput={(e) => handleInputChange('address', e)}
            className="inputNode"
          />
        </View>
      </View>

      <View className="infoItem">
        <View className="prefixDom">联系电话：</View>
        <View className="inputDom">
          <Input
            type="text"
            value={userInfo?.phone}
            onInput={(e) => handleInputChange('phone', e)}
            className="inputNode"
          />
        </View>
      </View>

      <View className="submitBtn" onClick={handleSubmit}>
        提交
      </View>

      <AtToast isOpened={isOpen} text="修改成功" icon="check-circle" />
    </View>
  );
}

export default UserEdit;
