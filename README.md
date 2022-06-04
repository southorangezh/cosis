# COSIS
---

Cloud object storage integrate


* Integrate Alibaba Cloud\Huawei Cloud\Tencent Cloud Object Storage to upload static files

# Install

```

npm install cosis --save

//Create a file
cosis.config.json

```
# API

```js
//Get hash value 
hexGenerator()
//Get the cloud object storage access path asynchronous
sourceUrls(hex)
//start operation asynchronous
startOperations()


```

## Test case
```js
let hex = hexGenerator(4)
startOperations(hex);
let srcs = sourceUrls()
```

## Test case Web Pack
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
# Command

```
npm run cosi:test
```



# Use environment

Node.js

# Acknowledgments to open source people and companies

* [Huawei Cloud OBS](https://github.com/huaweicloud/huaweicloud-sdk-nodejs-obs)


* [Aliyun OSS](https://github.com/ali-sdk/ali-oss)

* [Tencent Cloud COS](https://github.com/tencentyun/cos-nodejs-sdk-v5)

* [Colors](https://github.com/Marak/colors.js)

* [Node-fs-extra](https://github.com/jprichardson/node-fs-extra)

* [Qiao-console](https://github.com/uikoo9/qiao-monorepo/tree/master/packages/qiao-console#readme)

# Doc

```
./doc
```

# License
---

COSI is available under the MIT license. COSI also includes external libraries that are available under a variety of licenses. See LICENSE for the full license text.