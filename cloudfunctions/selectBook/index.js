// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {

  // 这里查询数据库 返回成功 失败信息
  const db = cloud.database();
  const _ = db.command;
  // return await db.collection('books').where(_.or([{
  //     title: event.query
  //   },
  //   {
  //     author: event.query
  //   }
  // ])).get()
  return new Promise((resolve, reject) => {
    db.collection('books').where(_.or([{
        title: event.query
      },
      {
        author: event.query
      }
    ])).get().then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
}