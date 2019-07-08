
import ajax from './ajax.js'

const BASE = '/api'
//1、根据经纬度获取位置详情
export const reqAddress = (longitude,latitude) => ajax.get(BASE + `/position/${latitude},${longitude}`)

//2、获取食品分类列表
export const reqCategorys = () => ajax({
    methods : "get",
    url:BASE+`/index_category`
})

//3、根据经纬度获取商铺列表
export const reqShops = ({latitude,longitude}) => ajax({
    methods:"get",
    params:{latitude,longitude},
    url:BASE+`/shops`
})