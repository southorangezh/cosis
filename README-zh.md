# COSIS  [![release candidate](https://img.shields.io/npm/v/cosis.svg)](https://www.npmjs.com/package/cosis)
---

云对象存储集成


* 集成阿里云\华为云\腾讯云对象存储上传静态文件

# 安装

```

npm install cosi --save

//Create a file
cosis.config.json

```

# 方法

```js
//Get hash value 
hexGenerator()
//Get the cloud object storage access path asynchronous
sourceUrls(hex)
//start operation asynchronous
startOperations()


```
## 示例
```js
let hex = hexGenerator(4)
startOperations(hex);
let srcs = sourceUrls()
```

## 示例 Web Pack
``` js
const fs = require('fs');

const cosis = require('cosis');
let hex = cosis.hexGenerator(4)
cosis.sourceUrls(hex).then((res)=>{
    console.log(res)
})
class myPlugin {
    apply(compiler) {
        
        compiler.hooks.afterEmit.tapAsync(
            {
              name: 'MyPlugin',
              context: true,
            },
            (context, compiler, callback) => {
             
             cosis.startOperations(hex)
             
             callback()

            }   
          );
    }
}

configureWebpack = {
    plugins: [
            new myPlugin()
        ]
}
 
```
# 命令

```

npm run cosi:test

```

# 使用环境

* node

# 致谢开源人员和公司

* [华为云OBS](https://github.com/huaweicloud/huaweicloud-sdk-nodejs-obs)


* [阿里云OSS](https://github.com/ali-sdk/ali-oss)

* [腾讯云COS](https://github.com/tencentyun/cos-nodejs-sdk-v5)

* [colors](https://github.com/Marak/colors.js)

* [Node-fs-extra](https://github.com/jprichardson/node-fs-extra)

* [Qiao-console](https://github.com/uikoo9/qiao-monorepo/tree/master/packages/qiao-console#readme)

# 文档

```
./doc
```

# 执照
---

COSI 在 MIT 许可下可用。 COSI 还包括在各种许可下可用的外部库。 有关完整的许可证文本，请参阅许可证。