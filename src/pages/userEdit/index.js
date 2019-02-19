import Taro, { Component } from '@tarojs/taro';
import { View, Input } from '@tarojs/components';
import { AtToast } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { editUserInfo } from '../../store/actions/userActions';
import './index.less';

@connect(({ userReducer }) => ({
  userReducer
}))
export default class Order extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      consignee: '',
      address: '',
      phone: '',
      isOpen: false,
    };
  }

  config = {
    navigationBarTitleText: '我的订单',
    navigationBarBackgroundColor: '#000',
    navigationBarTextStyle: "white",
  };

  componentDidMount = () => {
    const { userReducer } = this.props;
    this.setState({
      consignee: userReducer.consignee,
      address: userReducer.address,
      phone: userReducer.phone,
    });
  };

  /**
   * 收货人搜索框
   * @param e
   */
  onConsigneeChange = async (e) => {
    this.setState({ consignee: e.detail.value });
  };

  /**
   * 收货地址搜索框
   * @param e
   */
  onAddressChange = async (e) => {
    this.setState({ address: e.detail.value });
  };

  /**
   * 联系电话搜索框
   * @param e
   */
  onPhoneChange = async (e) => {
    this.setState({ phone: e.detail.value });
  };

  /**
   * 提交
   */
  submitEdit = async () => {
    this.setState({ isOpen: true });
    this.props.dispatch(editUserInfo(
      this.state.consignee,
      this.state.address,
      this.state.phone
    ));
    setTimeout(() => {
      this.setState({ isOpen: false });
      Taro.navigateTo({
        url: '/pages/user/index'
      });
    }, 2000);
  };

  render() {
    const { consignee, address, phone, isOpen } = this.state;
    return (
      <View className='userEditWrap'>
        <View className='infoItem'>
          <View className='prefixDom'>收货人：</View>
          <View className='inputDom'>
            <Input
              type='text'
              value={consignee}
              onChange={this.onConsigneeChange.bind(this)}
              className='inputNode'
            />
          </View>
        </View>

        <View className='infoItem'>
          <View className='prefixDom'>收货地址：</View>
          <View className='inputDom'>
            <Input
              type='text'
              value={address}
              onChange={this.onAddressChange.bind(this)}
              className='inputNode'
            />
          </View>
        </View>

        <View className='infoItem'>
          <View className='prefixDom'>联系电话：</View>
          <View className='inputDom'>
            <Input
              type='text'
              value={phone}
              onChange={this.onPhoneChange.bind(this)}
              className='inputNode'
            />
          </View>
        </View>

        <View className='submitBtn' onClick={this.submitEdit.bind(this)}>
          提交
        </View>

        <AtToast isOpened={isOpen} text='修改成功' icon='heart-2' />
      </View>
    );
  }
}
