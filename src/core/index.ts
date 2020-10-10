import Excel from './Excel'
const excel = new Excel()

const downloadExcel =  () => {
  excel.structureExcelData()
  excel.combineExcelData()
  excel.downloadExcel()
}

const extractExcel = () => {
  excel.extractExcel()
}

export {
  Excel,
  downloadExcel,
  extractExcel
}
