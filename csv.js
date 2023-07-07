const fs = require('fs');
const path = require('path');
const json2csv = require('json2csv').parse;

// slackからexportしたJSONファイルたちを1つのcsvにする。
// 以下の定数で操作を制御できる。
const inputFolderPath = './json'; // 入力フォルダのパス
const outputFilePath = './file.csv'; // 出力CSVファイルのパス
const fields = ['text', 'ts']; // CSVのカラムに対応するキー

// JSONファイルを読み込み、CSV形式に変換する関数
function convertToCSV(jsonData) {
  return json2csv(jsonData, { fields });
}

// フォルダ内のJSONファイルを読み込んで連結する関数
function readJSONFilesInFolder(folderPath) {
  const jsonFiles = fs.readdirSync(folderPath).filter(file => path.extname(file) === '.json');
  const jsonData = [];

  // console.log(jsonFiles);

  for (const file of jsonFiles) {
    const filePath = path.join(folderPath, file);
    const fileData = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(fileData);
    for (const row of parsedData) {
      jsonData.push(row);
    }
  }

  return jsonData;
}

// メインの処理
function main() {
  const jsonData = readJSONFilesInFolder(inputFolderPath);
  const csvData = convertToCSV(jsonData);
  fs.writeFileSync(outputFilePath, csvData, 'utf8');
  console.log('CSVファイルに連結して出力しました。');
}

main();