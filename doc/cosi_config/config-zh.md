# COSI 配置文件说明
---

## 目录
```
cosi.config.js
```
## 配置项

### basicParameters

#### `osdTypes`
* 数组字符类型:
   * OSS 
   * OBS
* 使用的对象存储类型 OSS Aliyun | OBS Huaweicloud 同时上传开启的上传的服务


#### `staticResources`
* 字符类型:
   * 相对路径字符串默认 dist
* 待上传静态文件目录位置


#### `hex`
* 字符类型:
   * 字符串 默认hex生成值
* 上传的动态目录哈希值


### OSSBasic
* [相关配置详见阿里云OSS文档](https://help.aliyun.com/document_detail/64097.html)

### OBSBasic

#### `bucket`
* 操作桶名称
   * 字符串 
* 上传桶名称
* 该值是COSI配置OBS客户端初始化不存在该API
* [华为云OBS客户端初始化文档](https://support.huaweicloud.com/api-obs_nodejs_sdk_api_zh/obs_39_0101.html)
