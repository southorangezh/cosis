

const config = require('../cosi.config.json');
const {cos} = require('./cosi.cos.js');
const {obs} = require('./cosi.obs.js');
const {oss} = require('./cosi.oss.js');
const version = require("../package.json").version;

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
}

module.exports = {
    version,
    cosiRun
};
