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
    page_slug: string
}