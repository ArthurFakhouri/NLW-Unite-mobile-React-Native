import { Alert, Image, StatusBar, View } from 'react-native'
import { Input } from '../components/input'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../styles/colors'
import { Button } from '../components/button'
import { Link, Redirect, router } from 'expo-router'
import { useState } from 'react'
import { api } from '@/server/api'
import { useBadgeStore } from '@/store/badge-store'


export default function Home() {

    const [code, setCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const badgeStore = useBadgeStore()

    async function handleAccessCredential() {
        if (!code.trim()) {
            return Alert.alert("Ingresso", "Informe o código do ingresso.")
        }

        try {
            setIsLoading(true)

            const { data } = await api.get(`/attendees/${code}/badge`)

            badgeStore.save(data.badge)

        } catch (err) {
            console.log(err)
            Alert.alert("Ingresso", "Informe o código do ingresso!")
            setIsLoading(false)
        }
    }

    if (badgeStore.data?.checkInURL) {
        return <Redirect href={"/ticket"} />
    }

    return (
        <View className='flex-1 bg-green-500 items-center justify-center p-8'>
            <StatusBar barStyle={"light-content"} />
            <Image
                source={require("@/assets/logo.png")}
                className='h-16'
                resizeMode='contain'
            />
            <View className='w-full mt-12 gap-3'>
                <Input>
                    <MaterialCommunityIcons
                        name='ticket-confirmation-outline'
                        size={20}
                        color={colors.green[200]}
                    />
                    <Input.Field
                        placeholder='Código do ingresso'
                        onChangeText={setCode}
                    />
                </Input>

                <Button
                    title='Acessar credencial'
                    onPress={handleAccessCredential}
                    isLoading={isLoading}
                />
                <Link href={"/register"} className='text-gray-100 text-base font-bold text-center mt-8'>
                    Ainda não possui ingresso?
                </Link>
            </View>
        </View>
    )
}