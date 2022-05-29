import colors from 'colors'
import q from 'qiao-console'


export function consoleUpFilesLog(upFileLogs,files,startTime,hex){  //Output current upload status upFileLogs Array[{error,item,}] files Array[] startTime
  q.clear();
  let ERRORNum = 0
  let WARNNum = 0
  let SUCCESSNum = 0
  let SUCCESSSize = 0
  for (let index = 0; index < upFileLogs.length; index++) {
      
      if(upFileLogs[index].state == "ERROR"){
          ERRORNum+=1;
          console.log(colors.bgRed(' ERROR ' + upFileLogs[index].error+' '), colors.red(' ' +upFileLogs[index].localPath));
      }else if(upFileLogs[index].state == "WARN"){
          WARNNum+=1;
          console.log( colors.bgYellow(' WARN ' + upFileLogs[index].item.res.status +' '+ result.res.statusMessage+' ')+  colors.yellow(' ' +upFileLogs[index].localPath))
      }else if(upFileLogs[index].state == "SUCCESS"){
          SUCCESSSize += Number(upFileLogs[index].size)
          SUCCESSNum+=1;
          console.log( colors.bgGreen.bold(' SUCCESS ' +  upFileLogs[index].item.res.status +' '+  upFileLogs[index].item.res.statusMessage+' ') +  colors.green.bold(' ' +upFileLogs[index].localPath) +' '+ colors.grey(upFileLogs[index].size+ 'kb'))
      }
  }
  //Print the number of files currently uploaded and processed
  if(upFileLogs.length == files.length){
      entTime = new Date().getTime();
      let time = (entTime - startTime) / 1000 
      console.log(colors.bgBlue.bold('    Upload Statistics    '),colors.brightWhite.bold(upFileLogs.length+'\\'+files.length),ERRORNum != 0 ?colors.bgRed.bold(' ERROR ',ERRORNum + ' ') : '',WARNNum!=0 ? colors.bgYellow.bold(' WARN ',WARNNum + ' '):'',SUCCESSNum != 0 ? colors.bgGreen.bold(' SUCCESS ',SUCCESSNum+' ' ):'',colors.green.bold(' ' +SUCCESSSize.toFixed(2)+'kb') ,colors.green.bold(' ' + time +'s') )
      console.log(colors.bgGreen.bold('   Upload Completed  '),hex)
  }
  
}