const xl = require('excel4node');

const wb = new xl.Workbook();

const ws = wb.addWorksheet('Sheet 1');

ws.cell(2, 1).string('string');

wb.write('Excel.xlsx');