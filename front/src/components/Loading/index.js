import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View } from '@tarojs/components';
import './index.less';

class Loading extends Component {
  constructor() {
    super(...arguments);
    this.state = {};
  }

  render() {
    const { isLoading } = this.props;
    return (
      <View className="loadingWrap" style={{ display: isLoading ? 'block' : 'none' }}>
        <View className="sk-circle">
          <View className="sk-circle1" />
          <View className="sk-circle2" />
          <View className="sk-circle3" />
          <View className="sk-circle4" />
          <View className="sk-circle5" />
          <View className="sk-circle6" />
          <View className="sk-circle7" />
          <View className="sk-circle8" />
          <View className="sk-circle9" />
          <View className="sk-circle10" />
          <View className="sk-circle11" />
          <View className="sk-circle12" />
        </View>
      </View>
    );
  }
}

export default Loading;
