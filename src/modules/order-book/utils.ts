import { tokens } from "@/constants"
import BigNumber from "bignumber.js"
import { BidAskEnum, OrderRecordType, OrderType } from "./types"

export const getRecordPrice = (record: OrderRecordType, type: BidAskEnum) => {
    const { makerAmount, takerAmount, makerToken, takerToken } = record
    const makerUnit = getTokenUnit(makerToken)
    const takerUnit = getTokenUnit(takerToken)

    const makerDecimalPrice = BigNumber(makerAmount).dividedBy(makerUnit)

    const takerDecimalPrice = BigNumber(takerAmount).dividedBy(takerUnit)


    const price = type === BidAskEnum.BID ? makerDecimalPrice.dividedBy(takerDecimalPrice) : takerDecimalPrice.dividedBy(makerDecimalPrice)
    const totalPrice = BidAskEnum.BID ? takerDecimalPrice : makerDecimalPrice
    const quantity = BidAskEnum.BID ? takerDecimalPrice.dividedBy(price) : makerDecimalPrice.dividedBy(price)

    return { price, quantity: Math.ceil(quantity.toNumber()), totalPrice }
}


export const getTokenUnit = (contract: string) => {
    const token = tokens.find(token => token.contract.toLowerCase() === contract.toLowerCase())
    if (!token) {
        throw new Error("invalid token contract")
    }
    return BigNumber(10).exponentiatedBy(token.decimal)
}

export const sortOrderEntry = (order: OrderType[], type: BidAskEnum) => {
    return order.sort((askA, askB) => {
        const { price: priceA } = getRecordPrice(askA.order, type)
        const { price: priceB } = getRecordPrice(askB.order, type)
        return type == BidAskEnum.ASK ? (priceB.minus(priceA)).toNumber() :  (priceA.minus(priceB)).toNumber()
    })
}