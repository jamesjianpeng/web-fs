import xlsx from 'xlsx'
import { saveAs } from 'file-saver'

import { IWebFs, C } from '../interface'

export const structureExcelData = (list: IWebFs.Sources, columns: IWebFs.Columns, sheetName: string) => {
  const { startChart } = {
    startChart: 'A'
  }
  if (!list.length) {
    return
  }
  list = [...list]
  const columnsRes = {}

  /** start 插入表头行 */
  columns.map((item) => {
    columnsRes[item.property] = item.title
  })
  list.unshift(columnsRes)
  /** end 插入表头行 */

  const len = list.length
  const keys = columns.map((it) => it.property)
  const colNum = keys.length
  const startIndex = startChart.codePointAt(0)!
  const endIndex = startIndex + colNum
  const endChart = String.fromCodePoint(endIndex - 1)
  const ref = `${startChart}1:${endChart}${len}`

  const res = {}
  for (let outIndex = 1; outIndex <= len; outIndex++) {
    const item = list[outIndex - 1]
    for (let i = 0; i < colNum; i++) {
      const innerItem = item[keys[i]]
      res[`${String.fromCodePoint(startIndex + i)}${outIndex}`] = {
        h: innerItem,
        r: `<t>${innerItem}</t><phoneticPr fontId="1" type="noConversion"/>`,
        t: 's',
        v: innerItem,
        w: innerItem
      }
    }
  }
  const worksheet = {
    '!ref': ref,
    ...res
  }
  const wb = {
    SheetNames: [ sheetName ],
    Sheets: {
      [sheetName]: worksheet
    }
  }
  return wb
}

export const downLoadNewExcel = async (data, fileName) => {
  const wopts: any = { bookType: 'xlsx', bookSST: false, type: 'binary' }
  const wbout = xlsx.write(data, wopts)

  function s2ab (s) {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf
  }

  const blob = new Blob([s2ab(wbout)], {type: ''})
  saveAs(blob, fileName)
}

// <IWebFs.SourceMultiple, IWebFs.Columns, IWebFs.WorkData>
export default class Excel implements C {
  structureData(sourceList: IWebFs.SourceMultiple, columns: IWebFs.Columns): IWebFs.WorkData {

  }
  // combineData: <U, T>(sourceList: U) => T
  // download: (name: string) => void
  // extract: <U extends File, T>(file: U) => T

  // structurData () {

  // }

  // combineData <IWebFs.SourceMultiple, Columns, >() {

  // }

  // download () {

  // }

  // extract () {

  // }
}

