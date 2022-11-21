import Taro from '@tarojs/taro';

// export const apiUrl = 'http://rap2api.taobao.org/app/mock/257275/shop';
export const apiUrl = 'http://127.0.0.1:8088/api';

export function getRequest(url, params) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: apiUrl + url,
      data: {
        ...params,
      },
      method: 'GET',
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function postRequest(url, params) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: apiUrl + url,
      data: {
        ...params,
      },
      method: 'POST',
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
