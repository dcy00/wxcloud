// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {

  // 这里操作数据库 插入新数据 返回成功 失败信息
  const db = cloud.database()
  // return await db.collection('counters').add({
  //   data: {
  //     author: event.author,
  //     desc: event.desc,
  //     isIn: event.isIn,
  //     tags: event.tags,
  //     title: event.title,
  //     type: event.type
  //   }
  // })
  return new Promise((resolve, reject) => {
    db.collection('books').add({
      data: event
    }).then(res=>{
      /**
       * res内容
       * errMsg: "cloud.callFunction:ok"
        requestID: "49841543-e804-11ea-b300-525400a8c4bb"
        result: {_id: "ac5f38825f470bb2006aca0828a70719", errMsg: "collection.add:ok", status: 200}
       */
      res.status = 200;
      resolve(res)
    }).catch(res =>{
      res.status = 400;
      reject(res)
    })
  })
}