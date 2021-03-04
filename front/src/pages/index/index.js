import Taro, { Component } from "@tarojs/taro";
import { View, Image, Swiper, SwiperItem } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import Single from "./components/Single/index";
import Special from "./components/Special/index";
import More from "./components/More/index";
import Loading from "../../components/Loading/index";
import GlobalFooter from "../../components/GlobalFooter/index";
import { getRequest } from "../../utils/api";
import "./index.less";

class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      fetchData: {
        imgList: [],
        iconList: [],
        singleList: [],
        moreList: [],
        isLoading: false
      }
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const data = await getRequest("/home");

    if (data.code === 200) {
      this.setState({ fetchData: data.data });
    }

    this.setState({ isLoading: false });
  };

  config = {
    navigationBarTitleText: "首页",
    navigationBarBackgroundColor: "#000",
    navigationBarTextStyle: "white"
  };

  /**
   * @desc 跳转商品列表
   * @param iconId
   */
  goGoodList = iconId => {
    this.$preload({ iconId });
    Taro.navigateTo({
      url: `/pages/goodList/index`
    });
  };

  render() {
    const {
      fetchData: { imgList, iconList, singleList, moreList, logoImgUrl }
    } = this.state;

    return (
      <View className="homeWrap">
        <Swiper
          indicatorColor="#999"
          indicatorActiveColor="#fff"
          circular
          indicatorDots
          autoplay
        >
          {Array.isArray(imgList) &&
            imgList.length > 0 &&
            imgList.map(img => {
              return (
                <SwiperItem key={img.id}>
                  <Image className="slideImg" src={img.imgUrl} />
                </SwiperItem>
              );
            })}
        </Swiper>

        <View className="iconList">
          {Array.isArray(iconList) &&
            iconList.length > 0 &&
            iconList.map(icon => {
              return (
                <View
                  className="iconItem"
                  key={icon.id}
                  onClick={this.goGoodList.bind(this, icon.id)}
                >
                  <View className="iconWrap">
                    <AtIcon value={icon.iconType} size="28" color="#fff" />
                  </View>
                  <View className="iconTitle">{icon.title}</View>
                </View>
              );
            })}
        </View>

        <View className="logoWrap">
          <Image className="logoImg" src={logoImgUrl} />
        </View>

        <View className="titleDom">精选单品</View>
        <Single singleList={singleList} />

        <Special moreList={moreList} />

        <More moreList={moreList} />

        <Loading isLoading={this.state.isLoading} />

        <GlobalFooter isActive="01" />
      </View>
    );
  }
}

export default Index;
