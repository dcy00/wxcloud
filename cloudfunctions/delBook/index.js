// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  // 这里操作数据库 插入新数据 返回成功 失败信息
  const db = cloud.database()
  return await db.collection('books').doc(event.id).remove();
}