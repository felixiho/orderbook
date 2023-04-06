import SelectOption from "@/components/token-selector/SelectOption";
import { colors } from "@/config/chakra"; 
import {
    Flex, Heading,
    FormControl,
    FormLabel,
    Button,
} from "@chakra-ui/react";

import { Select, SingleValue } from "chakra-react-select";
import {  useState } from "react";
import { TokenOptionType, TokenTypes } from "./types";
import { generateTokenOptions } from "./utils";

export type SelectorCardType = {
    handleSubmit: () => void
    setBaseToken: (e: TokenOptionType) => void
    setQuoteToken: (e: TokenOptionType) => void
    loading: boolean
}

const SelectorCard = ({ handleSubmit, setBaseToken, setQuoteToken, loading }: SelectorCardType) => {
    const options = generateTokenOptions()
    const [baseOptions, setBaseOptions] = useState(options)
    const [quoteOptions, setQuoteOptions] = useState(options)
 

    const handleTokenChange = (e: SingleValue<TokenOptionType>, type: TokenTypes) => {
        if (e === null) return
        if (type === TokenTypes.BASE) {
            setBaseToken(e)
            setQuoteOptions(options.filter(option => option.value !== e.value))
        } else {
            setQuoteToken(e)
            setBaseOptions(options.filter(option => option.value !== e.value))
        }
    }

    return (
        <Flex mt={8} mb={4} justifyContent="center" w="full" >
            <Flex maxW={"500px"} w="full" flexDirection={"column"} bg="white" p={[4, 8]} borderRadius={"lg"} boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 1px, rgba(42, 43, 58, 0.05) 0px 20px 98px, rgba(42, 43, 58, 0.06) 0px 2px 12px;" >
                <Heading w="full" textAlign={"center"} >The Risk Protocol</Heading>
                <FormControl p={4} mt={3}>
                    <FormLabel>
                        Base Token
                    </FormLabel>
                    <Select
                        id="base-token-select"
                        name="baseToken"
                        options={baseOptions}
                        size="lg"
                        useBasicStyles
                        placeholder="Select base token"
                        closeMenuOnSelect={true}
                        formatOptionLabel={option => <SelectOption option={option} />}
                        onChange={e => handleTokenChange(e, TokenTypes.BASE)}
                        chakraStyles={{
                            menu: (provided, state) => ({
                                ...provided,
                                border: 0
                            }),
                        }}
                    />
                </FormControl>
                <FormControl p={4}  >
                    <FormLabel>
                        Quote Token
                    </FormLabel>
                    <Select
                        id="base-token-select"
                        name="baseToken"
                        options={quoteOptions}
                        size="lg"
                        useBasicStyles
                        placeholder="Select base token"
                        closeMenuOnSelect={true}
                        formatOptionLabel={option => <SelectOption option={option} />}
                        onChange={e => handleTokenChange(e, TokenTypes.QUOTE)}
                    />
                </FormControl>
                <FormControl p={4} mt={4} >
                    <Button type="button" isLoading={loading} onClick={handleSubmit} bg={colors.primary} w="full" py={8} fontSize="lg" >Get Order</Button>
                </FormControl>
            </Flex>
        </Flex>
    );
}


export default SelectorCard;