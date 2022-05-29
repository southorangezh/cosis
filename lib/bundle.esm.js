var basicParameters = {
	runs: [
		"OSS"
	],
	staticResources: "",
	hex: ""
};
var OSSBasic = {
	region: "",
	accessKeyId: "",
	accessKeySecret: "",
	bucket: ""
};
var OBSBasic = {
	access_key_id: "",
	secret_access_key: "",
	server: "",
	bucket: ""
};
var COSBasic = {
	region: "",
	SecretId: "",
	SecretKey: "",
	bucket: ""
};
var mapFilePath = "";
var whiteListFileName = [
];
var cosi_config = {
	basicParameters: basicParameters,
	OSSBasic: OSSBasic,
	OBSBasic: OBSBasic,
	COSBasic: COSBasic,
	mapFilePath: mapFilePath,
	whiteListFileName: whiteListFileName
};

var cosi_config$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    basicParameters: basicParameters,
    OSSBasic: OSSBasic,
    OBSBasic: OBSBasic,
    COSBasic: COSBasic,
    mapFilePath: mapFilePath,
    whiteListFileName: whiteListFileName,
    'default': cosi_config
});

const cos$1 = (config)=>{
    console.log('cos');
};

var cos_1 = cos$1;

var cosi_cos = {
	cos: cos_1
};

const obs$1 = (config)=>{
    console.log('obs');
};
var obs_1 = obs$1;

var cosi_obs = {
	obs: obs_1
};

const oss$1 = (config)=>{
    console.log('oss',config);
};

var oss_1 = oss$1;

var cosi_oss = {
	oss: oss_1
};

var name = "object_storage";
var version$1 = "1.0.0";
var description = "";
var main = "main.js";
var scripts = {
	"cosi:test": "node ./cosi-test",
	"cosi:build": "rollup --config"
};
var author = "";
var type = "commonjs";
var license = "MIT";
var dependencies = {
	"ali-oss": "^6.17.1",
	colors: "^1.4.0",
	"cos-nodejs-sdk-v5": "^2.11.9",
	"esdk-obs-nodejs": "^3.21.6",
	"nodejs-fs-utils": "^1.2.6",
	"qiao-console": "^0.1.0",
	"rollup-plugin-json": "^4.0.0"
};
var devDependencies = {
	rollup: "^2.75.1",
	"rollup-plugin-commonjs": "^10.1.0",
	"rollup-plugin-node-resolve": "^5.2.0"
};
var _package = {
	name: name,
	version: version$1,
	description: description,
	main: main,
	scripts: scripts,
	author: author,
	type: type,
	license: license,
	dependencies: dependencies,
	devDependencies: devDependencies
};

var _package$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name,
    version: version$1,
    description: description,
    main: main,
    scripts: scripts,
    author: author,
    type: type,
    license: license,
    dependencies: dependencies,
    devDependencies: devDependencies,
    'default': _package
});

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

var config = getCjsExportFromNamespace(cosi_config$1);

var require$$3 = getCjsExportFromNamespace(_package$1);

const {cos} = cosi_cos;
const {obs} = cosi_obs;
const {oss} = cosi_oss;
const version = require$$3.version;

//run upload method
const cosiRun = (hex)=>{
    config.basicParameters.hex = hex ? hex : config.basicParameters.hex;
    if(config.basicParameters.runs.indexOf('COS') != -1){
        cos(config);
    }
    if(config.basicParameters.runs.indexOf('OBS') != -1){
        obs(config);
    }
    if(config.basicParameters.runs.indexOf('OSS') != -1){
        oss(config);
    }
};

var cosi = {
    version,
    cosiRun
};
var cosi_1 = cosi.version;
var cosi_2 = cosi.cosiRun;

export { cosi_2 as cosiRun, cosi as default, cosi_1 as version };
//# sourceMappingURL=bundle.esm.js.map
