import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Input, ScrollView, Image } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import Loading from '../../components/Loading/index';
import { getRequest } from '../../utils/api';
import './index.less';

class Order extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      orderType: 0,
      searchVal: '',
      orderList: [],
    };
  }

  componentDidMount = () => {
    const { orderType = 0 } = this.$router.preload && this.$router.preload;
    this.fetchApi(orderType);
    this.setState({ orderType });
  };

  /**
   * @desc 搜索事件
   * @param { object }  e
   */
  handleSearch = (e) => {
    this.setState({ isLoading: true });

    const { value } = e && e.detail && e.detail;

    if (value) {
      let { orderList = [] } = this.state;
      orderList = orderList.filter((item) => value === item.goodName);
      this.setState({ orderList });
    } else {
      const { orderType = 0 } = this.state;
      this.fetchApi(orderType);
    }

    this.setState({
      searchVal: value,
      isLoading: false,
    });
  };

  /**
   * @desc 清空搜索框内容
   */
  handleClearSearchVal = () => {
    this.setState({ searchVal: '' });

    const { orderType = 0 } = this.state;
    this.fetchApi(orderType);
  };

  /**
   * @desc 获取数据
   * @param { number } orderType
   */
  fetchApi = async (orderType) => {
    this.setState({ isLoading: true });

    const res = await getRequest('/order', { orderType });
    if (res && res.status === 200) {
      const { data = [] } = res;

      this.setState({ orderList: data });
    }

    this.setState({ isLoading: false });
  };

  render() {
    const { orderList = [], searchVal = '', isLoading = false } = this.state;

    return (
      <View className="orderContainer">
        <View className="searchWrap">
          <Input
            className="searchInput"
            type="text"
            placeholder="请输入商品名称"
            value={searchVal}
            onInput={this.handleSearch.bind(this)}
          />
          <View className="removeIcon" onClick={this.handleClearSearchVal}>
            <AtIcon value="close-circle" size="20" color="#ccc" />
          </View>
        </View>

        <ScrollView className="scrollView" scrollY scrollWithAnimation>
          {Array.isArray(orderList) &&
            orderList.length > 0 &&
            orderList.map((order) => {
              return (
                <View className="cardWrap" key={order.id}>
                  <View className="cardDom">
                    <View className="cardImgWrap">
                      <Image className="cardImg" src={order.imgUrl} />
                    </View>
                    <View className="cardCon">
                      <View className="cardTitle">{order.goodName}</View>
                      <View className="cardType">
                        {order.orderType === 1 ? '待收货' : '已收货'}
                      </View>
                      <View className="cardTxt">{order.goodDesc}</View>
                    </View>
                  </View>
                </View>
              );
            })}
        </ScrollView>

        <Loading isLoading={isLoading} />
      </View>
    );
  }
}

export default Order;
