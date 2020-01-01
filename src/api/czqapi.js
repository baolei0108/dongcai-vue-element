import request2 from '@/utils/request2'
// import service from '../utils/request2'

export function fetchList(query) {
  return request2({
    url: '/downlog/getlist',
    method: 'get',
    params: query
  })
}


//获取市场信息
export function fetchMarket(query) {
  return request2({
    url: '/market/getlist',
    method: 'get',
    params: query
  })
}



//保存市场信息
export function saveMarket(query) {
  return request2({
    url: '/market/submit',
    method: 'get',
    params: query
  })
}
