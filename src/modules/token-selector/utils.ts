import { tokens } from "@/constants"
import { TokenOptionType } from "./types"

export const generateTokenOptions = (): TokenOptionType[] => {
    return tokens.map(token => ({
        label: token.title,
        image: token.image,
        value: token.contract
    }))
}