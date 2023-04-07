 
import { fetchOrderBook } from '@/modules/api'
import SelectorCard from '@/modules/token-selector/SelectorCard'
import { useEffect, useState } from "react";
import { Flex } from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid';
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'
import OrderBookDisplay from '@/modules/order-book/OrderBookDisplay';
import { BidAskEnum, MetaDataStateType, OrderType } from '@/modules/order-book/types';
import {   sortOrderEntry } from '@/modules/order-book/utils';
import Layout from '@/layouts/Layout';




const Home: NextPageWithLayout = () => {
  const [baseToken, setBaseToken] = useState<any>()
  const [quoteToken, setQuoteToken] = useState<any>()
  const [orderFetched, setOrderFetched] = useState(false)
  const [loading, setLoading] = useState(false)

  const [asks, setAsks] = useState<OrderType[]>([])
  const [bids, setBids] = useState<OrderType[]>([])


  const getOrderBook = () => {
    if (!baseToken || !quoteToken) return
    setLoading(true)
    fetchOrderBook(baseToken.value, quoteToken.value)
      .then(response => {
        setAsks(response.asks.records)
        setBids(response.bids.records)
        setOrderFetched(true)
        setLoading(false)
      })
  }

  const handleSocketData = (updateData: any) => {
    if ('data' in updateData) {
      const parsedUpdate = JSON.parse(updateData.data)
      const payload: OrderType[] = parsedUpdate.payload

      payload.forEach((_payload) => {
        const updateState = _payload.metaData.state
        const { makerToken, takerToken, makerAmount, takerAmount } = _payload.order
        if (makerToken.toLowerCase() === baseToken.value.toLowerCase() && takerToken.toLowerCase() === quoteToken.value.toLowerCase()) {
          const updatedAsks = [...asks];
          switch (updateState) {
            case MetaDataStateType.ADDED:
              const sortedUpdatedAsks = sortOrderEntry([...updatedAsks, _payload], BidAskEnum.ASK)
              setAsks(sortedUpdatedAsks)
              break;
            case MetaDataStateType.EXPIRED:
            case MetaDataStateType.FULLY_FILLED:
              const indexToRemove = updatedAsks.findIndex(ask => (ask.order.makerAmount === makerAmount && ask.order.takerAmount === takerAmount))
              if (indexToRemove > -1) {
                updatedAsks.splice(indexToRemove, 1)
                setAsks(updatedAsks)
              }
              break;
            default:
              break;
          }
        } else if (makerToken.toLowerCase() === quoteToken.value.toLowerCase() && takerToken.toLowerCase() === baseToken.value.toLowerCase()) {
          const updatedBids = [...bids];
          switch (updateState) {
            case MetaDataStateType.ADDED:
              const sortedUpdatedBids = sortOrderEntry([...updatedBids, _payload], BidAskEnum.BID)
              setBids(sortedUpdatedBids)
              break;
            case MetaDataStateType.EXPIRED:
            case MetaDataStateType.FULLY_FILLED:
              const indexToRemove = updatedBids.findIndex(bid => (bid.order.makerAmount === makerAmount && bid.order.takerAmount === takerAmount))
              if (indexToRemove > -1) {
                updatedBids.splice(indexToRemove, 1)
                setBids(updatedBids)
              }
              break;
            default:
              break;
          }
        }
      })
    }
  }

  useEffect(() => {
    const socket = new WebSocket("wss://api.0x.org/orderbook/v1") 
    socket.addEventListener('message', handleSocketData)

    socket.addEventListener('open', () => {
      console.log("socket opened")
      if (!orderFetched) return
      socket.send(JSON.stringify({
        type: 'subscribe',
        channel: 'orders',
        requestId: uuidv4(),
      }))
    })

    socket.addEventListener('close', () => {
      console.info('WebSocket disconnected.')
    })

    return () => {
      socket.close()
    }
  }, [orderFetched])


  return (
    <Flex p={6} flexDirection="column">
      <SelectorCard handleSubmit={getOrderBook} setBaseToken={setBaseToken} setQuoteToken={setQuoteToken} loading={loading} />
      <OrderBookDisplay asks={asks} bids={bids} />
    </Flex>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>

  )
}

export default Home