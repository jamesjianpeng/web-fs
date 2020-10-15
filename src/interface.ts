// export declare class C {
//     public structureData<U extends Record<string, any>, T, K>(sourceList: U, columns: T): K
//     public combineData<U, T>(sourceList: U): T

//     public download(name: string): void

//     public extract<U extends File, T>(file: U): T
// }
export namespace IWebFs {
    export interface Column {
        property: string;
        title: string;
    }

    export declare class FS<T, H, N, B, F, R> {
        public structureData(sources: T): H;

        public download(name: N, sources: T): B;

        public extract(file: F): Promise<R>;
    }

    export type Columns = Column[];

    export type Source = Record<string, any>;

    export type Sources = Source[];

    export interface SourceMultiple {
        sheetName: string;
        columns?: Columns;
        data: Sources;
    }
    export type SourceMultiples =  SourceMultiple[];

    export interface ITem {
        h: string | number;
        r: string | number;
        t: string | number;
        v: string | number;
        w: string | number;
    }
    export type WorkData = {
        "!ref": string;
        [key: string]: ITem[] | string;
    };

    export type WorkBook = {
        SheetNames: string[];
        Sheets: Record<string, WorkData>;
    };

    export type SheetNames = string[];

    export type ExtractData  = Record<
        string,
        Record<string, string | number>[]
    >;

    export type WorkSheet = Record<string, WorkData>;
}
