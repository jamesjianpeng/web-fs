import { excel } from './dist/index.js'
console.log(excel)

document.querySelector('#root').innerHTML = 'core()'
const downloadExcelEl = document.querySelector('#downloadExcel')
console.log(downloadExcelEl)
downloadExcelEl.addEventListener('click', () => {
  console.log('--')
  excel.download(`time-${new Date().getTime()}`, source)
})

const source = [
  {
    sheetName: '122',
    columns: [
      { property: 'name', title: '名字' },
      { property: 'age', title: '年龄' },
      { property: 'weight', title: '体重' },
      { property: 'height', title: '身高' }
    ],
    data: [
      { name: 'lucy', age: '15', weight: '40kg', height: '140cm' }
    ]
  }
]
