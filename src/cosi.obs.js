const OBS = require("esdk-obs-nodejs");
const fsUtils = require("nodejs-fs-utils");
const path = require("path");
const { consoleUpFilesLog, requestErrorLog } = require("./cosi.obs.log.js");

const obs = (config, files) => {
  let upFileLogs = []; //上传日志
  let hex = config.basicParameters.hex ;
  let dir = config.basicParameters.staticResources;

  const obs = new OBS(config.OBSBasic);
  async function put(cloudPath, localPath, stats) {
    try {
      return {
        result:  new Promise((resolve, reject) => {
          obs.putObject(
            {
              Bucket: config.OBSBasic.bucket,
              Key: cloudPath,
              SourceFile: path.normalize(localPath),
            },
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
        }),
        localPath,
        stats,
      };
    } catch (error) {
      if (error.code == "ENOTFOUND") {
        requestErrorLog(error, obs);
      } else {
        upFileLogs.push({
          localPath,
          state: "ERROR",
          error: error,
        });
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
        ).then(({ result, localPath, stats }) => {

          result.then((res) => {
              upFileLogs.push({
                item: res,
                localPath,
                size: (stats.size / 1024).toFixed(2),
              });
              consoleUpFilesLog(upFileLogs, files, startTime, hex, obs);
            })
            .catch((error) => {
              if (error.code == "ENOTFOUND") {
                requestErrorLog(error, obs);
              } else {
                upFileLogs.push({
                  localPath,
                  state: "ERROR",
                  error: error,
                });
                consoleUpFilesLog(upFileLogs, files, startTime, hex, obs);
              }
            });

        
        });
      } catch (error) {
        console.log(error);
      }
        
    }
    next();
  });
};
module.exports.OBS = obs;
