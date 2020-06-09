import Taro from "@tarojs/taro";

export const apiUrl = "http://rap2.taobao.org:38080/app/mock/257275/shop";

export function postRequest(url, date) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: apiUrl + url,
      data: {
        ...date
      },
      method: "POST",
      header: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
