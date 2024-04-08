import { colors } from "@/styles/colors";
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps & {
    title: string
    isLoading?: boolean
}

export function Button({ title, isLoading = false, ...rest }: ButtonProps) {

    return (
        <TouchableOpacity
            {...rest}
            activeOpacity={0.7}
            disabled={isLoading}
            style={{ backgroundColor: "#F48F56", width: '100%', height: 56, justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}
        >
            {isLoading ? (
                <ActivityIndicator className="text-green-500" />
            ) : (
                <Text className="text-green-500 text-base font-bold uppercase">
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    )
}