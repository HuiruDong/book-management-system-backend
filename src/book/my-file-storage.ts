import * as multer from 'multer'; // 一个用于上传文件的库
import * as fs from 'fs';

// 配置文件存储方式
// multer.diskStorage 指定上传文件的存储位置和文件名
const storage = multer.diskStorage({
  // 定义每个上传的文件应该存在哪
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync('uploads');
    } catch (e) {}

    // cb 的第一个参数是 error，第二个参数是路径
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      '-' +
      file.originalname;
    cb(null, uniqueSuffix);
  },
});

export { storage };
