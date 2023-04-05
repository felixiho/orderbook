import SelectOption from "@/components/token-selector/SelectOption";
import { colors } from "@/config/chakra";
import { tokens } from "@/constants";
import {
    Flex, Heading,
    FormControl,
    FormLabel,
    Button,
} from "@chakra-ui/react";

import { Select, CreatableSelect, AsyncSelect, SingleValue } from "chakra-react-select";
import { useEffect, useState } from "react";
import { TokenOptionType, TokenTypes } from "./types";
import { generateTokenOptions } from "./utils";

const SelectorCard = () => {
    const [baseToken, setBaseToken] = useState<any>()
    const [quoteToken, setQuoteToken] = useState<any>()
    const [options, setOptions] = useState(generateTokenOptions())

    const handleFormSubmit = () => {
        if(!baseToken || !quoteToken) return
        
    }
    // useEffect(() => {
    //     const filteredOptions = options.filter(option => option.value !== )
    // }, [baseToken, quoteToken])


    const handleTokenChange = (e: SingleValue<TokenOptionType>, type: TokenTypes) => {
        if (type === TokenTypes.BASE) {
            setBaseToken({
                label: e?.label,
                value: e?.value
            })
        } else {
            setQuoteToken({
                label: e?.label,
                value: e?.value
            })
        }
    }

    return (
        <Flex mt={8} justifyContent="center" w="full" >
            <Flex maxW={"500px"} w="full" flexDirection={"column"} p={[4, 8]} borderRadius={"lg"} boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 1px, rgba(42, 43, 58, 0.05) 0px 20px 98px, rgba(42, 43, 58, 0.06) 0px 2px 12px;" >
                <Heading w="full" textAlign={"center"} >Token Selector</Heading>
                <FormControl p={4} mt={3}>
                    <FormLabel>
                        Base Token
                    </FormLabel>
                    <Select
                        id="base-token-select"
                        name="baseToken"
                        options={options}
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
                        options={options}
                        size="lg"
                        useBasicStyles
                        placeholder="Select base token"
                        closeMenuOnSelect={true}
                        formatOptionLabel={option => <SelectOption option={option} />}
                        onChange={e => handleTokenChange(e, TokenTypes.QUOTE)}
                    />
                </FormControl>
                <FormControl p={4} mt={4} >
                    <Button type="button" onClick={handleFormSubmit} bg={colors.primary} w="full" isDisabled={(!quoteToken || !baseToken)} py={8} fontSize="lg" >Get Order</Button>
                </FormControl>
            </Flex>
        </Flex>
    );
}


export default SelectorCard;