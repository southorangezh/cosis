# COSI configuration file description
---

## Table of contents
````
cosi.config.js
````
## Configuration items

### basicParameters

#### `osdTypes`
* Array character type:
    * OSS
    *OBS
* The object storage type used is OSS Aliyun | OBS Huaweicloud simultaneous upload and enabled upload service


#### `staticResources`
* Character type:
    * relative path string default dist
* The location of the static file directory to be uploaded


#### `hex`
* Character type:
    * string default hex generated value
* Uploaded dynamic directory hash value


### OSSBasic
* [For related configuration, see Alibaba Cloud OSS documentation](https://help.aliyun.com/document_detail/64097.html)

### OBBSBasic

#### `bucket`
* Operation bucket name
    * string
* Upload bucket name
* The value is COSI configuration OBS client initialization does not exist this API
* [HUAWEI CLOUD OBS Client Initialization Document](https://support.huaweicloud.com/api-obs_nodejs_sdk_api_zh/obs_39_0101.html)