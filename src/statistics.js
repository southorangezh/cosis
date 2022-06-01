const fsUtils = require("nodejs-fs-utils");
// Number of statistical files
const statistics = (dir) => {
    let files = [];
    fsUtils.walkSync(dir, function (err, path, stats, next, cache) {
        if (!stats.isDirectory()) {
            files.push(path)
        }
        next();
    });
    return files;
}
module.exports.statistics = statistics