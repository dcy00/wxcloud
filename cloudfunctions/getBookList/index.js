// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const db = cloud.database()
  const {
    page
  } = event;
  const MAX_LIMIT = 10;
  return await db.collection("books").skip((page - 1) * MAX_LIMIT).limit(MAX_LIMIT).get()
}