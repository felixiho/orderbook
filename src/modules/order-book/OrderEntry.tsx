import {
    Tr,
    Td, Box
} from '@chakra-ui/react'
import BigNumber from 'bignumber.js';
import { BidAskEnum } from './types'; 

type OrderEntryType = {
    price: BigNumber
    quantity: number
    totalPrice: BigNumber
    bidAskType: BidAskEnum
    highestPrice: BigNumber
}

const OrderEntry = ({
    price, quantity, totalPrice, bidAskType, highestPrice
}: OrderEntryType) => {
    
    return (
        <Tr>
            <Td isNumeric px={3} w="full" fontSize="sm" >
                <Box
                 as="div" p={2} 
                 w={price.isGreaterThanOrEqualTo(highestPrice) ? "100%" : `${price.dividedBy(highestPrice).multipliedBy(100).toNumber()}%`} 
                 
                 bg={bidAskType === BidAskEnum.ASK ? "#FFE0EA" : "#DAEDE5"}>
                    {price.toFixed(3)}
                </Box>
            </Td>
            <Td isNumeric px={3} fontSize="sm" >{quantity}</Td>
            <Td isNumeric px={3} fontSize="sm">{totalPrice.toFixed(2)}</Td>
        </Tr>

    );
}



export default OrderEntry;