/*
 * @Description: vue
 * @Version: 2.0.1.003
 * @Author: 薛松田
 * @Date: 2019-11-28 16:43:34
 * @LastEditors: 薛松田
 * @LastEditTime: 2019-11-28 17:34:56
 */
export default{
    getCookie: function(token){
        console.log('cookie')
        var strcookie = document.cookie;//获取cookie字符串
        var arrcookie = strcookie.split("; ");//分割
        //遍历匹配
        for ( var i = 0; i < arrcookie.length; i++) {
            var arr = arrcookie[i].split("=");
            if (arr[0] == 'token'){
                return arr[1];
            }
        }
        return "";
    },
}
