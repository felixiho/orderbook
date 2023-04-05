import { TokenOptionType } from '@/modules/token-selector/types';
import { Flex, Image, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';


type SelectOptionProps = {
    option: TokenOptionType
}


const SelectOption = ({option}: SelectOptionProps) => {
    return (
        <Flex p={2}>
            <Image src={option.image} alt={option.label} mr={3} />
            <Text>{option.label}</Text>
        </Flex>
    );
}

 
export default SelectOption;