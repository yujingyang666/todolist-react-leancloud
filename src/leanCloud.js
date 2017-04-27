import AV from 'leancloud-storage'

var APP_ID = 'e4bR8OpuSmEPvPdSNe6LR9Ur-gzGzoHsz';
var APP_KEY = 'mDm37dHvuITwPDTSvxpTiH7s';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
export default AV 

export function signUpApi(username, password, successFn, errorFn){  //注册
  var user = new AV.User();
  // 设置用户名
  user.setUsername(username);
  // 设置密码
  user.setPassword(password);
  
  user.signUp().then(function (loginedUser) { //注册成功返回当前用户信息
      let user = getUserFromAVUser(loginedUser)
      console.log('注册成功')
      successFn(user)
  }, function (error) {
      errorFn(error)
  });
}

export function signInApi(username, password, successFn, errorFn){
  AV.User.logIn(username, password).then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    console.log('登录成功')
      successFn(user)
  }, function (error) {
    errorFn(error)
  });
}

function getUserFromAVUser(AVUser){  //
   return {
     id: AVUser.id,
     username: AVUser.attributes.username
     //...AVUser.attributes
   }
}

export function getCurrentUser(){   //从缓存里读取上次登录信息
   let user = AV.User.current()
   if(user){
     return getUserFromAVUser(user)
   }else{
     return null
   }
}

export function signOut(){
   AV.User.logOut()
   return undefined
}