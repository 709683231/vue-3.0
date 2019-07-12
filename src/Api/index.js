
import ajax from './ajax.js'

const BASE = '/api'
//1、根据经纬度获取位置详情
export const reqAddress = (longitude,latitude) => ajax.get(BASE + `/position/${latitude},${longitude}`)

//2、获取食品分类列表
export const reqCategorys = () => ajax({
    method: "get",
    url:BASE+`/index_category`,
    headers:{needToken:true}
})

//3、根据经纬度获取商铺列表
export const reqShops = ({latitude,longitude}) => ajax({
    method:"get",
    params:{latitude,longitude},
    url:BASE+`/shops`,
    headers:{needToken:true}
})

// 6、用户名密码登陆
export const reqPwdLogin = ({ name, pwd, captcha }) => ajax({
    method: 'POST',
    url: BASE + '/login_pwd',
    data: {
      name,
      pwd,
      captcha
    }
})

//8、手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax({
    method: 'POST',
    url: BASE + '/login_sms',
    data: {
      phone,
      code
    }
})
//7、发送短信验证码
export const reqsendCode = (phone) => ajax({
    method:"get",
    data:{phone},
    url:BASE+`/sendcode`
})

//9,自动登陆的请求
export const reqAutoLogin = () => ajax({
    url:BASE + '/auto_login',
    headers:{needToken:true}
})

export const reqGoods = () => ajax('/shopgoods')
export const reqRatings = () => ajax('/shopratings')
export const reqInfo = () => ajax('/shopinfo')
