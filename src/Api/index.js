
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

// 6、用户名密码登陆
export const pwdLogin = ({name,pwd,captcha}) => ajax({
    methods:"POST",
    data:{name,pwd,captcha},
    url:BASE+`/login_pwd`
})

//8、手机号验证码登陆
export const phoneLogin = (phone,code) => ajax({
    methods:"POST",
    data:{phone,code},
    url:BASE+`/login_sms`
})
//7、发送短信验证码
export const sendCode = (phone) => ajax({
    methods:"get",
    data:{phone},
    url:BASE+`/sendcode`
})
