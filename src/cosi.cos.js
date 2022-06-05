const COS = require("cos-nodejs-sdk-v5");
const fsUtils = require("nodejs-fs-utils");
const fs = require('fs');
const Path = require("path");

const {
    consoleUpFilesLog,
    requestErrorLog
} = require("./cosi.cos.log.js");

const cos = (config, files) => {
    let upFileLogs = [];
    let hex = config.basicParameters.hex;
    let dir = config.basicParameters.staticResources;
    const cos = new COS(config.COSBasic);
    async function put(cloudPath, localPath, stats) {
        try {
            return {
                result: new Promise((resolve, reject) => {
                    cos.putObject({
                        Bucket: config.COSBasic.bucket,
                        Region: config.COSBasic.region,
                        Key: cloudPath.split(Path.sep).join('/'),
                        StorageClass: 'STANDARD',
                        Body: fs.createReadStream(localPath),
                        ContentLength: fs.statSync(localPath).size,

                    }, (err, result) => {
                        if (err) {
                            reject(err);

                        } else {
                            resolve(result);

                        }
                    });
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
                ).then(({
                    result,
                    localPath,
                    stats
                }) => {

                    result.then((res) => {
                            upFileLogs.push({
                                item: res,
                                localPath,
                                size: (stats.size / 1024).toFixed(2),
                            });
                            consoleUpFilesLog(upFileLogs, files, startTime, hex);
                        })
                        .catch((error) => {

                            if (error.code == "ENOTFOUND") {
                                requestErrorLog(error, obs);
                            } else {
                                upFileLogs.push({
                                    localPath,
                                    item: error,
                                    size: (stats.size / 1024).toFixed(2)
                                });
                                consoleUpFilesLog(upFileLogs, files, startTime, hex);
                            }
                        });


                });
            } catch (error) {

                console.log(123)
                console.log(error);
            }

        }
        next();
    });
};
module.exports.COS = cos;