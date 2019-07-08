### delete

~~~

export function getProductItemDelete(params) {
  return request({
    url: '/productItem/delete',
    method: 'delete',
    params
  });
}
~~~

[axios常见传参方式get/post/put/patch/delete](https://blog.csdn.net/qq_31837621/article/details/80688854)