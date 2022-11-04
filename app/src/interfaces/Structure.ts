export interface Structure {
    rows: Array<Row>
}

export interface Row {
    cols: Array<Col>
}

export interface Col {
    elements: Array<Element>
}

export interface Element {
    name: string,
    type: string,
    slug: string,
    row_index: number | undefined,
    col_index: number | undefined
}

export interface ElementData {
    name: string,
    type: string,
    slug: string,
    datas: Array<Data>
}

export interface Data {
    id: number | undefined,
    value: any
}