const mapper = require('mybatis-mapper');
const path = require('path');
const fs = require('fs');
const mapperPath = path.join(__dirname, '../', "./mapper");
//const mapperFormat = { language: 'sql', indent: '  ' };

var files = fs.readdirSync(mapperPath);

files.forEach(file => {
    //console.log("createMapper: ", file);
    mapper.createMapper([path.join(mapperPath, file)]);
})


function get(mapperName, sqlId, param) {
    return mapper.getStatement(mapperName, sqlId, param, { language: 'sql', indent: '  ' });
}
module.exports = {
    get
}