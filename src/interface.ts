export declare class C {
    public structureData<U, T, K>(sourceList: U, columns: T): K
    public combineData<U, T>(sourceList: U): T
  
    public download(name: string): void
    
    public extract<U extends File, T>(file: U): T
}
export namespace IWebFs {
    export interface Column {
        property: string
        title: string
    }
    
    export type Columns = Array<Column>
    
    export type Source = Record<string, any>

    export type Sources = Array<Source>
    
    export type SourceMultiple = Record<string, Sources>

    export interface ITem {
            h: string | number
            r: string | number
            t: string | number
            v: string | number
            w: string | number
    }
    export interface WorkData  {
        '!ref': string
        [key: string]: ITem | string
    }

    export type WorkSheet = Record<string, Sources>
}
