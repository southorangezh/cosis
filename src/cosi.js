const { COS } = require("./cosi.cos.js");
const { OBS } = require("./cosi.obs.js");
const { OSS } = require("./cosi.oss.js");
const { statistics } = require("./statistics.js");
const version = require("../package.json").version;
const colors = require("colors");
const q = require("qiao-console");
const crypto = require("crypto");
const { readConfigJSON } = require("./read.config.js");
const runLog = (type) => {
  console.log(colors.yellow.bold(
    type +
    " " +
    'Running...'
  ))
}

//run upload method
const startOperations = async (hex) => {
  q.clear();
  let config = await readConfigJSON();
  try {
    if (config.basicParameters.runs) {
      const files = statistics(
        config.basicParameters.staticResources
          ? config.basicParameters.staticResources
          : "/"
      );
      if (files.length > 0) {
        config.basicParameters.hex = hex ? hex : config.basicParameters.hex && config.basicParameters.hex != '' ? config.basicParameters.hex : crypto.randomBytes(4).toString("hex");

        for (let index = 0; index < config.basicParameters.runs.length; index++) {
          let val = config.basicParameters.runs[index]
          if (val === "OBS" && config.OBSBasic) {
            runLog(val);
            OBS(config, files);
          }
          if (val === "OSS" && config.OSSBasic) {
            runLog(val);
            OSS(config, files);
          }
          if (val === "COS" && config.COSBasic) {
            runLog(val);
            COS(config, files);
          }

        }


      }
    }
  } catch (error) { }
};

//Get the source storage file address
const sourceUrls = async(hex) => {
  hex = hex ? hex : "";
  let config = await readConfigJSON();
  return {
    OSS: config.basicParameters.runs.indexOf('OSS') != -1 ? ("https://" + config.OSSBasic.bucket + "." + config.OSSBasic.region + "." + "aliyuncs.com/" + hex ) : null,
    OBS: config.basicParameters.runs.indexOf('OBS') != -1 ? ("https://" + config.OBSBasic.bucket + "." + config.OBSBasic.region + ".myhuaweicloud.com/" + hex ) : null,
    COS: config.basicParameters.runs.indexOf('COS') != -1 ? ("https://" + config.COSBasic.bucket + ".cos." + config.COSBasic.region + ".myqcloud.com/" + hex ) : null
  }
}
//hash maker
const hexGenerator = (number) => {
  return crypto.randomBytes(number).toString("hex");
}
module.exports = {
  version,
  startOperations,
  sourceUrls,
  hexGenerator
};
