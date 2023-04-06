
export type OrderRecordType = {
    makerAmount: string
    takerAmount: string
    makerToken: string
    takerToken: string
}

export type OrderType = {
    metaData: {
        orderHash: string
        state: MetaDataStateType
    }
    order: OrderRecordType
}

export type OrderBookType = {
    total: number, 
    page: number,
    perPage: number,
    records: OrderType[]
}

export type OrderBookResponseType = {
    bids: OrderBookType
    asks: OrderBookType
}

export enum BidAskEnum {
    ASK = 'ASK',
    BID = 'BID'
}

export enum MetaDataStateType{
    ADDED = 'ADDED',
    FILLABLE = 'FILLABLE',
    FULLY_FILLED = 'FULLY_FILLED',
    EXPIRED = 'EXPIRED'
}