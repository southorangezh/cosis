const fsUtils = require("nodejs-fs-utils");
const OSS = require("ali-oss");
const path = require("path");
const { consoleUpFilesLog, requestErrorLog } = require("./cosi.oss.log.js");
const oss = (config, files) => {
  let upFileLogs = [];
  let hex = config.basicParameters.hex ;
  let dir = config.basicParameters.staticResources;
  const client = new OSS(config.OSSBasic);

  async function put(cloudPath, localPath, stats) {
    try {
      return {
        result: (await client.put(cloudPath, path.normalize(localPath))) || [],
        localPath,
        stats,
      };
    } catch (error) {
      if (error.name == "RequestError") {
        requestErrorLog(error);
      } else {
        upFileLogs.push({
          localPath,
          state: "ERROR",
          error: error,
        });
        consoleUpFilesLog(upFileLogs, files, startTime, hex);
      }
    }
  }

  let startTime = new Date().getTime();
 
  fsUtils.walk(dir, function (err, path, stats, next, cache) {
    if (!stats.isDirectory()) {
      try {
        put(
          hex + path.substr(dir.length, path.length - 1),
          path,
          stats
        ).then((res) => {
          if (res) {
            let { result, localPath, stats } = res;
            if (result) {
              if (result.res.status !== 200) {
                upFileLogs.push({
                  item: result,
                  localPath,
                  state: "WARN",
                  size: (stats.size / 1024).toFixed(2),
                });
              } else {
                upFileLogs.push({
                  item: result,
                  localPath,
                  state: "SUCCESS",
                  size: (stats.size / 1024).toFixed(2),
                });
              }
              consoleUpFilesLog(upFileLogs, files, startTime, hex);
            }
          }
        }).catch((error)=>{
        console.log(error)
          
        })
      } catch (error) {
        console.log(error)
      }
    }
    next();
  });
};

module.exports.OSS = oss;
