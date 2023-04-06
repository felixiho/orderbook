import { OrderBookResponseType } from "../order-book/types"


export const fetchOrderBook = async (baseToken: string, quoteToken: string):Promise<OrderBookResponseType> => {
    const response =  await fetch(`https://api.0x.org/orderbook/v1?baseToken=${baseToken}&quoteToken=${quoteToken}`)
    return await response.json()
}