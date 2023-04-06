import {
    Grid, GridItem, Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableContainer,
    Flex,
} from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import OrderEntry from './OrderEntry';
import { OrderType, BidAskEnum } from './types';
import { getRecordPrice } from './utils';


type OrderBookDisplayType = {
    asks: OrderType[]
    bids: OrderType[]
}


const OrderBookDisplay = ({ asks, bids }: OrderBookDisplayType) => {
    const [highestBid, setHighestBid] = useState(BigNumber(0))
    const [highestAsk, setHighestAsk] = useState(BigNumber(0))

    useEffect(() => {
        setHighestAsk(BigNumber(0))
    }, [asks])

    useEffect(() => {
        setHighestBid(BigNumber(0))
    }, [bids])
 
    const shouldUpdateHighest = (price: BigNumber, priceType: BidAskEnum) => {
        if (priceType === BidAskEnum.ASK && price.isGreaterThan(highestAsk)) {
            setHighestAsk(price)
        } else if (priceType === BidAskEnum.BID && price.isGreaterThan(highestBid)) {
            setHighestBid(price)
        }
    }

    return (
        <Flex mt={8} pb={12} justifyContent="center" w="full" px={{ base: 4, md: 6, lg: 24, xl: 48 }} >
            <Grid mt={12}   w="full" templateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} columnGap={6}   >
                <GridItem mb={4} boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 1px" p={6} border={"1px solid #EAECEF"} borderRadius={6} >
                    <Heading size={"md"} px={3} pb={3} >Bids  </Heading>
                    <TableContainer pb={3}>
                        <Table variant='unstyled'>
                            {!!(bids.length) && (<Thead borderBottom={"1px solid #F0F0F0"}  >
                                <Tr>
                                    <Th isNumeric color="#848E9C" fontSize={"xs"} px={3}>Price</Th>
                                    <Th isNumeric color="#848E9C" fontSize={"xs"} px={3}>Quantity</Th>
                                    <Th isNumeric color="#848E9C" fontSize={"xs"} px={3}>Total</Th>
                                </Tr>
                            </Thead>)}
                            <Tbody>
                                {
                                    bids.map((bid: OrderType) => {
                                        const { price, quantity, totalPrice } = getRecordPrice(bid.order, BidAskEnum.BID)
                                        shouldUpdateHighest(price, BidAskEnum.BID)
                                        return (
                                            <OrderEntry highestPrice={highestBid} key={bid.metaData.orderHash} price={price} quantity={quantity} totalPrice={totalPrice} bidAskType={BidAskEnum.BID} />
                                        )
                                    })
                                }
                            </Tbody>
                        </Table>
                    </TableContainer>
                </GridItem>
                <GridItem mb={3} boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 1px" p={6} border={"1px solid #EAECEF"} borderRadius={6} >
                    <GridItem>
                        <Heading size={"md"} px={3} pb={3} >Asks  </Heading>
                        <TableContainer pb={3}>
                            <Table variant='unstyled'>
                                {!!(asks.length) && (<Thead borderBottom={"1px solid #F0F0F0"} >
                                    <Tr>
                                        <Th isNumeric color="#848E9C" fontSize={"xs"} px={3}>Price</Th>
                                        <Th isNumeric color="#848E9C" fontSize={"xs"} px={3}>Quantity</Th>
                                        <Th isNumeric color="#848E9C" fontSize={"xs"} px={3}>Total</Th>
                                    </Tr>
                                </Thead>)}
                                <Tbody>
                                    {
                                        asks.map((ask: OrderType) => {
                                            const { price, quantity, totalPrice } = getRecordPrice(ask.order, BidAskEnum.ASK)
                                            shouldUpdateHighest(price, BidAskEnum.ASK)
                                            return (
                                                <OrderEntry highestPrice={highestAsk} key={ask.metaData.orderHash} price={price} quantity={quantity} totalPrice={totalPrice} bidAskType={BidAskEnum.ASK} />
                                            )
                                        })
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </GridItem>
                </GridItem>
            </Grid>

        </Flex>
    );
}




export default OrderBookDisplay;