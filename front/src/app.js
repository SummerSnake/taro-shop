import Taro, { Component } from "@tarojs/taro";
import { Provider } from "@tarojs/redux";
import configStore from "./store";
import Index from "./pages/index";

const store = configStore();

class App extends Component {
  config = {
    pages: [
      "pages/index/index",
      "pages/cart/index",
      "pages/goodList/index",
      "pages/goodInfo/index",
      "pages/user/index",
      "pages/order/index",
      "pages/userEdit/index"
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black"
    }
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
