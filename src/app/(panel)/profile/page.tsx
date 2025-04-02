import { useAuth } from '@/src/context/AuthContext';
import { supabase } from '@/src/lib/supabase';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

export default function Profile() {
    const { setAuth, user } = useAuth();

    async function handleSignOut() {
        const {error} = await supabase.auth.signOut()
        setAuth(null)
        if(error){
            Alert.alert('Error', 'Erro ao sair da conta')
            return;
        }
    }
    return (
        <View style={styles.container}>
            <Text>Pagina perfil</Text>
            <Text>{user?.email}</Text>
            <Text>{user?.id}</Text>

            <Button
                title='deselogar'
                onPress={handleSignOut}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
     }
});