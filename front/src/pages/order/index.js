import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { useState, useEffect } from 'react';
import { View, Input, ScrollView, Image } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import Loading from '../../components/Loading/index';
import { getRequest } from '../../utils/api';
import './index.less';

function Order() {
  const {
    router: { params = {} },
  } = getCurrentInstance() && getCurrentInstance();

  const [searchVal, setSearchVal] = useState('');
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * @desc 搜索事件
   * @param { object }  e
   * @return { void }
   */
  const handleSearch = (e) => {
    setIsLoading(true);

    const { value } = e?.detail;

    if (value) {
      let arr = orderList.filter((item) => value === item.goodName);
      setOrderList({ orderList: arr });
    } else {
      handleFetchData();
    }

    setSearchVal(value);
    setIsLoading(true);
  };

  /**
   * @desc 清空搜索框内容
   * @return { void }
   */
  const handleClearSearchVal = () => {
    setSearchVal('');
    handleFetchData();
  };

  /**
   * @desc 跳转商品详情
   * @param { number } id
   * @return { void }
   */
  const goGoodInfo = (id) => {
    Taro.navigateTo({
      url: `/pages/goodInfo/index?id=${id}`,
    });
  };

  /**
   * @desc 获取数据
   * @return { void }
   */
  const handleFetchData = async () => {
    setIsLoading(true);
    const res = await getRequest('/order/list', { orderStatus: params?.orderStatus });

    if (res?.code === 200) {
      setOrderList(res?.data?.list);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <View className="orderContainer">
      <View className="searchWrap">
        <Input
          className="searchInput"
          type="text"
          placeholder="请输入商品名称"
          value={searchVal}
          onInput={handleSearch}
        />
        <View className="removeIcon" onClick={handleClearSearchVal}>
          <AtIcon value="close-circle" size="20" color="#ccc" />
        </View>
      </View>

      <ScrollView className="scrollView" scrollY scrollWithAnimation>
        {Array.isArray(orderList) &&
          orderList.map((order) => {
            return (
              <View className="cardWrap" key={order.id}>
                <View className="cardTitle">
                  {order.orderStatus === 1
                    ? '未支付'
                    : order.orderStatus === 2
                    ? '待发货'
                    : order.orderStatus === 3
                    ? '已发货'
                    : order.orderStatus === 4
                    ? '待评价'
                    : '已完成'}
                </View>

                <View className="cardTxt">订单编号：{order.orderNumber}</View>

                {order?.goodsList.map((item) => (
                  <View className="cardDom" onClick={() => goGoodInfo(item?.id)}>
                    <View className="cardImgWrap">
                      <Image className="cardImg" src={item.imgUrl} />
                    </View>
                    <View className="cardCon">
                      <View className="cardTitle">{item.title}</View>
                      <View className="cardTxt">{item.description}</View>
                    </View>
                  </View>
                ))}
              </View>
            );
          })}
      </ScrollView>

      <Loading isLoading={isLoading} />
    </View>
  );
}

export default Order;
