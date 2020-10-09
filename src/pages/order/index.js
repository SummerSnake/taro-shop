import Taro, { Component } from "@tarojs/taro";
import { View, Input, ScrollView, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import Loading from "../../components/Loading/index";
import { getRequest } from "../../utils/api";
import "./index.less";

class Order extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      searchVal: "",
      orderList: []
    };
  }

  config = {
    navigationBarTitleText: "我的订单",
    navigationBarBackgroundColor: "#000",
    navigationBarTextStyle: "white"
  };

  componentDidMount = () => {
    const type = this.$router.preload.type;
    this.fetchApi(type);
  };

  /**
   * 搜索框值改变
   * @param e
   */
  handleSearchValChange = async e => {
    this.setState({ isLoading: true });
    this.setState({ searchVal: e.detail.value });
    const data = await getRequest("/orderList");
    const orderList = [...data.data.dataList];
    let list = orderList.filter(cur => {
      return e.detail.value === cur.title;
    });
    this.setState({
      orderList: list
    });
    if (e.detail.value === "") {
      this.fetchApi("01");
    }
    this.setState({ isLoading: false });
  };

  /**
   * 清空搜索框内容
   */
  removeSearchVal = () => {
    this.setState({
      searchVal: ""
    });
    this.fetchApi("01");
  };

  /**
   * 获取数据
   * @param type
   */
  fetchApi = async type => {
    this.setState({ isLoading: true });
    let list = [];
    const data = await getRequest("/orderList");
    if (type === "01") {
      list = data.data.dataList;
    } else {
      list = data.data.dataList.filter(cur => {
        return type === cur.type;
      });
    }
    if (data.code === 0) {
      this.setState({
        orderList: list
      });
    }
    this.setState({ isLoading: false });
  };

  render() {
    const { orderList, searchVal, isLoading } = this.state;
    return (
      <View className="orderContainer">
        <View className="searchWrap">
          <Input
            className="searchInput"
            type="text"
            placeholder="请输入商品名称"
            value={searchVal}
            onInput={this.handleSearchValChange.bind(this)}
          />
          <View className="removeIcon" onClick={this.removeSearchVal}>
            <AtIcon value="close-circle" size="20" color="#ccc" />
          </View>
        </View>

        <ScrollView className="scrollView" scrollY scrollWithAnimation>
          {Array.isArray(orderList) &&
            orderList.length > 0 &&
            orderList.map(order => {
              return (
                <View className="cardWrap" key={order.id}>
                  <View className="cardDom">
                    <View className="cardImgWrap">
                      <Image className="cardImg" src={order.img} />
                    </View>
                    <View className="cardCon">
                      <View className="cardTitle">{order.title}</View>
                      <View className="cardType">
                        {order.type === "02" ? "待收货" : "待支付"}
                      </View>
                      <View className="cardTxt">{order.txt}</View>
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
