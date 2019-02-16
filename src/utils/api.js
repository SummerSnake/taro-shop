import Taro from '@tarojs/taro';

export const apiUrl = 'https://www.easy-mock.com';
// export const apiUrl = 'http://192.168.2.144:8083';

export function postRequest(url, date) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: apiUrl + url,
      data: {
        ...date
      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
      }
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
