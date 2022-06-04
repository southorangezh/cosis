const fs = require('fs');

 const readConfigJSON = async ()=>{
    try {
        const data = await fs.readFileSync('cosis.config.json', 'utf8');
        return JSON.parse(data)
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
}

module.exports.readConfigJSON = readConfigJSON;