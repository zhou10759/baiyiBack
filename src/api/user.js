import request from '@/utils/request'
import qs from 'qs'

export function adminLogin(data) {
  return request({
    url: '/admin/adminLogin',
    method: 'post',
    data: qs.stringify( data )
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
