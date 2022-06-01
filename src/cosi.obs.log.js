const colors = require("colors");

module.exports = {
  consoleUpFilesLog: (upFileLogs, files, startTime, hex, obsClient) => {
    //Print the number of files currently uploaded and processed
    if (upFileLogs.length == files.length) {
      //Output current upload status upFileLogs Array[{error,item,}] files Array[] startTime
      let ERRORNum = 0;
      let WARNNum = 0;
      let SUCCESSNum = 0;
      let SUCCESSSize = 0;
      for (let index = 0; index < upFileLogs.length; index++) {
        let code = upFileLogs[index].item.CommonMsg.Status;
        if (code > 200) {
          ERRORNum += 1;
          console.log(
            colors.bgRed(
              " ERROR " + upFileLogs[index].item.CommonMsg.Status + " "
            ),
            colors.red(" " + upFileLogs[index].localPath)
          );
          console.log(
            colors.red(
              upFileLogs[index].item.CommonMsg.Code +
                " " +
                upFileLogs[index].item.CommonMsg.Message
            )
          );
        } else if (code == "WARN") {
          WARNNum += 1;
        } else if (code == "200") {
          SUCCESSSize += Number(upFileLogs[index].size);
          SUCCESSNum += 1;
          console.log(
            colors.bgGreen.bold(" SUCCESS " + code + " ") +
              colors.green.bold(" " + upFileLogs[index].localPath) +
              " " +
              colors.grey(upFileLogs[index].size + "kb")
          );
        }
      }
      entTime = new Date().getTime();
      let time = (entTime - startTime) / 1000;
      console.log(
        colors.bgBlue.bold(" Upload Statistics "),
        colors.brightWhite.bold(upFileLogs.length + "/" + files.length),
        ERRORNum != 0 ? colors.bgRed.bold(" ERROR ", ERRORNum + " ") : "",
        WARNNum != 0 ? colors.bgYellow.bold(" WARN ", WARNNum + " ") : "",
        SUCCESSNum != 0 ? colors.bgGreen.bold(" File ", SUCCESSNum + " ") : "",
        colors.green.bold(" " + SUCCESSSize.toFixed(2) + "kb"),
        colors.green.bold(" " + time + "s")
      );
      console.log(colors.bgGreen.bold(" Upload Completed  "), hex);
      console.log(colors.green.bold("HuaweiCloud OBS Mission Over 🔆"));
      obsClient.close();
    }
  },
  requestErrorLog: (error, obsClient) => {
    console.log(
      colors.bgRed(" HuaweiCloud OSS ERROR " + error.code + " "),
      colors.red(" CODE " + error.errno)
    );
    console.log(colors.grey(error.stack));
    obsClient.close();
  },
};
