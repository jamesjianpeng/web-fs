import xlsx, { WorkBook } from "xlsx";
import { saveAs } from "file-saver";

import { IWebFs } from "../interface";

export class Excel
    implements
        IWebFs.FS<
            IWebFs.SourceMultiples,
            IWebFs.WorkBook,
            string,
            void,
            File,
            IWebFs.ExtractData
        > {
    public structureData(sources: IWebFs.SourceMultiples) {
        const sheetNames: IWebFs.SheetNames = [];
        const WorkSheets: IWebFs.WorkSheet = {};
        sources.map((source: IWebFs.SourceMultiple) => {
            const workData = this._structureData(source);
            const sheetName = source.sheetName;
            sheetNames.push(sheetName);
            Object.assign(WorkSheets, {
                [sheetName]: workData
            });
        });
        const workBook: IWebFs.WorkBook = {
            SheetNames: sheetNames,
            Sheets: WorkSheets,
        };
        return workBook;
    }

    /**
     * @private 构造 excel 数据结构
     * @param {IWebFs.SourceMultiple} sources
     * @returns {IWebFs.WorkData | undefined}
     */
    private _structureData(sources: IWebFs.SourceMultiple): IWebFs.WorkData | undefined {
        let { data: list, columns } = sources;
        columns = columns || [];
        if (!columns.length) {
            return;
        }
        const { startChart } = {
            startChart: "A",
        };
        if (!list.length) {
            return;
        }
        list = [...list];
        const columnsRes = {};

        /** start 插入表头行 */
        columns.map((item) => {
            columnsRes[item.property] = item.title;
        });
        list.unshift(columnsRes);
        /** end 插入表头行 */

        const len = list.length;
        const keys = columns.map((it) => it.property);
        const colNum = keys.length;
        const startIndex = startChart.codePointAt(0)!;
        const endIndex = startIndex + colNum;
        const endChart = String.fromCodePoint(endIndex - 1);
        const ref = `${startChart}1:${endChart}${len}`;

        const res = {};
        for (let outIndex = 1; outIndex <= len; outIndex++) {
            const item = list[outIndex - 1];
            for (let i = 0; i < colNum; i++) {
                const innerItem = item[keys[i]];
                res[`${String.fromCodePoint(startIndex + i)}${outIndex}`] = {
                    h: innerItem,
                    r: `<t>${innerItem}</t><phoneticPr fontId="1" type="noConversion"/>`,
                    t: "s",
                    v: innerItem,
                    w: innerItem,
                };
            }
        }
        const workData: IWebFs.WorkData = {
            "!ref": ref,
            ...res,
        };
        return workData;
    }

    /**
     * @private 下载 excel 方法
     * @param {string} fileName
     * @param {IWebFs.WorkBook} data
     */
    private _downLoad = async (fileName: string, data: IWebFs.WorkBook) => {
        const wopts: any = { bookType: "xlsx", bookSST: false, type: "binary" };
        const wbout = xlsx.write(data, wopts);

        function s2ab(s) {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i !== s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xff;
            }
            return buf;
        }

        const blob = new Blob([s2ab(wbout)], { type: "" });
        saveAs(blob, fileName);
    }

    /**
     * @public 暴露到外部的下载 excel 方法
     * @param {string} fileName
     * @param {IWebFs.SourceMultiples} sources
     */
    public download(fileName: string, sources: IWebFs.SourceMultiples) {
        const workBook: IWebFs.WorkBook = this.structureData(sources);
        this._downLoad(fileName, workBook);
    }

    /**
     * @description 接受一个 file 对象，生成二进制的字符串
     * @param {file} file
     * @return {promise} promise
     */
    private _readAsDataBinaryString(file) { // 处理图片的显示
        const render = new FileReader();
        if (!render) {
        return '';
        }
        return new Promise((resolve, reject) => {
        render.onload = (res: ProgressEvent<FileReader>) => { // 在onload 可以获得上传文件
            resolve(res.target?.result);
        };
        render.readAsBinaryString(file);
        });
    }

    private _extract (data: WorkBook) {
        // const sheets = data.Sheets;
        const res = {};

        // for (const key in sheets) {
        //   const item = sheets[key];
        //   res[key] = [];
        //   for (const k in item) {
        //     const innerIt: any = item[k];
        //     if (innerIt.h || innerIt.w) {
        //       // fix 100% 数值类型无法获取，excel 是 数字类型
        //       res[key].push((innerIt.h || innerIt.w).trim());
        //     }
        //   }
        //   res[key] = Array.from(new Set(res[key]));
        // }
        return res;
    }
    /**
     * @public 暴露到外部的提取 excel 方法
     * @param {string} fileName
     * @param {IWebFs.SourceMultiples} sources
     */
     public async extract(file) {
        const binaryString = await this._readAsDataBinaryString(file);

        const workbook: WorkBook = xlsx.read(binaryString, {
          type: 'binary'
        });
        this._extract(workbook);
        return {
            sheetName: [{ key: 'value' }]
        };
    }
}
