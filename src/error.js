export function error(error){
    switch(error.code){
          case 210:
          alert('用户名与密码不匹配')
          break
          case 211:
          alert('用户名不存在')
          break
          case 202:
          alert('用户名已存在')
          break
          case 203:
          alert('电子邮箱已经被占用')
          break
          case 205:
          alert('找不到电子邮箱地址对应的用户')
          break
          case 201:
          alert('密码不能为空')
          break
          case 200:
          alert('用户名不能为空')
          break
          case 217:
          alert('无效的用户名，不允许空白用户名')
          break
          case 218:
          alert('无效的密码，不允许空白密码')
          break
          case 502:
          alert('服务器维护中')
          break
          default:
          alert(error)
          break
}
}

