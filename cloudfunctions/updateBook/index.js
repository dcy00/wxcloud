// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  // 这里查询数据库 返回成功 失败信息
  const db = cloud.database()
  return await db.collection('books').doc(event.id).update({
    data: event.value
  })
}