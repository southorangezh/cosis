const colors = require("colors");

module.exports = {
  consoleUpFilesLog: (upFileLogs, files, startTime, hex) => {
    //Output current upload status upFileLogs Array[{error,item,}] files Array[] startTime
    let ERRORNum = 0;
    let WARNNum = 0;
    let SUCCESSNum = 0;
    let SUCCESSSize = 0;
   
    //Print the number of files currently uploaded and processed
    if (upFileLogs.length == files.length) {
      for (let index = 0; index < upFileLogs.length; index++) {
        if (upFileLogs[index].state == "ERROR") {
          ERRORNum += 1;
          console.log(
            colors.bgRed(
              " Aliyun OSS ERROR " + upFileLogs[index].error.status + " "
            ),
            colors.red(" " + upFileLogs[index].localPath)
          );
          console.log(
            colors.grey(
              upFileLogs[index].error.message +
                " " +
                upFileLogs[index].error.stack
            )
          );
        } else if (upFileLogs[index].state == "WARN") {
          WARNNum += 1;
          console.log(
            colors.bgYellow(
              " WARN " +
                upFileLogs[index].item.res.status +
                " " +
                result.res.statusMessage +
                " "
            ) + colors.yellow(" " + upFileLogs[index].localPath)
          );
        } else if (upFileLogs[index].state == "SUCCESS") {
          SUCCESSSize += Number(upFileLogs[index].size);
          SUCCESSNum += 1;
          console.log(
            colors.bgGreen.bold(
              " SUCCESS " +
                upFileLogs[index].item.res.status +
                " " +
                upFileLogs[index].item.res.statusMessage +
                " "
            ) +
              colors.green.bold(" " + upFileLogs[index].localPath) +
              " " +
              colors.grey(upFileLogs[index].size + "kb")
          );
        }
      }
      let entTime = new Date().getTime();
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
      console.log(colors.green.bold("Aliyun OSS Mission Over 🔆"));
      
    }
  },
  requestErrorLog: (error) => {
    console.log(
      colors.bgRed(" Aliyun OSS ERROR " + error.code + " "),
      colors.red(" CODE " + error.status)
    );
    console.log(colors.grey(error.stack));
  },
};
