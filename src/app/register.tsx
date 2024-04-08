import { Alert, Image, StatusBar, View } from 'react-native'
import { Input } from '../components/input'
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { colors } from '../styles/colors'
import { Button } from '../components/button'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { api } from '@/server/api'
import { AxiosError } from 'axios'
import { useBadgeStore } from '@/store/badge-store'


export default function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const badgeStore = useBadgeStore()

    async function handleRegister() {
        if (!name.trim() || !email.trim()) {
            return Alert.alert("Inscrição", "Preencha todos os campos.")
        }

        setIsLoading(true)

        const registerResponse = await api.post("/events/ad34a061-2e35-4b99-a5aa-a8e778f04d73/attendees",
            { name, email }
        )

        if (registerResponse.data.attendeeId) {

            const badgeResponse = await api.get(`/attendees/${registerResponse.data.attendeeId}/badge`)

            badgeStore.save(badgeResponse.data.badge)

            Alert.alert("Inscrição", "Inscrição realizada com sucesso!", [
                { text: "Ok", onPress: () => router.push("/ticket") },
            ])
        }

        try {

        } catch (err) {
            console.log(err)
            Alert.alert("Inscrição", "Não foi possível realizar a inscrição.")

            if (err instanceof AxiosError) {
                if (String(err.response?.data.message).includes("already registered")) {
                    return Alert.alert("Inscrição", "Este e-mail já está cadastrado!")
                }
            }
            setIsLoading(false)
        }
    }

    return (
        <View className='flex-1 bg-green-500 p-8 items-center justify-center'>
            <StatusBar barStyle={"light-content"} />
            <Image
                source={require("@/assets/logo.png")}
                className='h-16'
                resizeMode='contain'
            />
            <View className='w-full mt-12 gap-3'>
                <Input>
                    <FontAwesome6
                        name='user-circle'
                        size={20}
                        color={colors.green[200]}
                    />
                    <Input.Field
                        placeholder='Nome completo'
                        onChangeText={setName}
                    />
                </Input>

                <Input>
                    <MaterialIcons
                        name='alternate-email'
                        size={20}
                        color={colors.green[200]}
                    />
                    <Input.Field
                        placeholder='E-mail'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        onChangeText={setEmail}
                    />
                </Input>

                <Button
                    title='Realizar inscrição'
                    onPress={handleRegister}
                    isLoading={isLoading}
                />
                <Link href={"/"} className='text-gray-100 text-base font-bold text-center mt-8'>
                    Já possui ingresso?
                </Link>
            </View>
        </View>
    )
}