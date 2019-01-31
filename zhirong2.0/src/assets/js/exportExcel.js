// 更具json数据， 导出excel
// let datas = [
//   ['一行一列', '一行二列'],
//   ['二行一列', '二行二列']
// ]
// let headers = ['第一列', '第二列']
// this.$exportExcel('excel', datas, headers)
import ExportJsonExcel from 'js-export-excel'
const exportExcel = (filename, sheetData, sheetHeader, sheetName) => {
  const toExcel = new ExportJsonExcel({
    fileName: filename,
    datas: [
      {
        sheetData: sheetData,
        sheetName: sheetName || 'sheet',
        sheetHeader: sheetHeader
      }
    ]
  })
  toExcel.saveExcel()
}
export default exportExcel
