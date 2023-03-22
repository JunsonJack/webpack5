function add (a,b){
  console.log(a+b)
  return a+b
}
let name = 'zhangsan'
const person = {
  name:'lisi',
}
// promise实现ajax
function ajax (url){
  return new Promise((resolve,reject)=>{
    const xhr = new XMLHttpRequest()
    xhr.open('GET',url)
    xhr.send()
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4 && xhr.status === 200){
        resolve(xhr.responseText)
      }
    }
  })
}

export {add}