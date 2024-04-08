import { Button } from "@/components/button";
import { Credential } from "@/components/credential";
import { Header } from "@/components/header";
import { colors } from "@/styles/colors";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Modal, ScrollView, Share, StatusBar, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import { QRCode } from "@/components/qrcode";
import { useBadgeStore } from "@/store/badge-store";
import { Redirect } from "expo-router";
import { MotiView } from "moti";

export default function Ticket() {
    const [showQRCode, setShowQRCode] = useState(false)

    const badgeStore = useBadgeStore()

    async function handleShare() {
        try {
            if (badgeStore.data?.checkInURL) {
                await Share.share({
                    message: badgeStore.data.checkInURL
                })
            }
        } catch (err) {
            console.log(err)
            Alert.alert("Compartilhar", "Não foi possível compartilhar")
        }
    }

    async function handleSelectImage() {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4]
            })

            if (result.assets) {
                badgeStore.updateAvatar(result.assets[0].uri)
            }
        } catch (err) {
            console.log(err)
            Alert.alert("Foto", "Não foi possível carregar a foto.")
        }
    }

    if (!badgeStore.data?.checkInURL) {
        return <Redirect href={"/"} />
    }

    return (
        <View className="flex-1 bg-green-500">
            <StatusBar barStyle={"light-content"} />
            <Header title="Minha credencial" />
            <ScrollView
                className="-mt-28 -z-10"
                contentContainerClassName="px-8"
                showsVerticalScrollIndicator={false}
            >
                <Credential
                    data={badgeStore.data}
                    onChangeAvatar={handleSelectImage}
                    onShowQRCode={() => setShowQRCode(true)}
                />
                <MotiView
                    from={{ translateY: 0, }}
                    animate={{
                        translateY: 10
                    }}
                    transition={{
                        loop: true,
                        type: "timing",
                        duration: 700
                    }}
                >
                    <FontAwesome
                        name="angle-double-down"
                        size={24}
                        color={colors.gray[300]}
                        className="self-center my-6"
                    />
                </MotiView>
                <Text className="text-white font-bold text-2xl mt-4">Compartilhar credencial</Text>
                <Text className="text-white font-regular text-base mt-1 mb-6">
                    Mostre ao mundo que você vai participar do {badgeStore.data.eventTitle}!
                </Text>

                <Button title="Compartilhar" onPress={handleShare} />

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ marginTop: 40, marginBottom: 40 }}
                    onPress={() => badgeStore.remove()}
                >
                    <Text className="text-base text-white font-bold text-center">Remover ingresso</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal visible={showQRCode} statusBarTranslucent animationType="fade">
                <View className="flex-1 bg-green-500 items-center justify-center">
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setShowQRCode(false)}
                    >
                        <QRCode value="teste" size={300} />
                        <Text className="font-body text-orange-500 text-sm mt-10">
                            Fechar QRCode
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}