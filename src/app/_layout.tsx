import { Slot } from 'expo-router'
import '../styles/global.css'
import { StatusBar } from 'expo-status-bar'
import {
    useFonts,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { Loading } from '../components/loading'

export default function Layout() {

    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold,
    })

    if (fontsLoaded) <Loading />

    return (
        <>
            <StatusBar style='light' />
            <Slot />
        </>
    )
}