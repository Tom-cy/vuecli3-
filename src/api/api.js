import Http from './http'
/**
 * 请求接口封装
 *
 * @param {get} params
 * @data {post} data
 * @data {put} data
 * @data {delete} data
 */

// login
export function login(data) {
  return Http({
    url: 'admin/login',
    method: 'post',
    data
  })
}
