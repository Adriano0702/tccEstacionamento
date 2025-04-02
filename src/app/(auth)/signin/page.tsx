import colors from '@/constants/Colors'; // Importa um módulo de cores personalizado.
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Alert } from 'react-native'; // Importa componentes do React Native.
import { Link } from 'expo-router'; // Importa o componente Link para navegação entre páginas.
import { SafeAreaView } from 'react-native-safe-area-context'; // Garante que o conteúdo respeite as áreas seguras do dispositivo.
import { useState } from 'react'; // Importa o hook useState para gerenciar estados no componente.
import { supabase } from '../../../lib/supabase'; // Importa a instância do Supabase configurada.
import { router } from 'expo-router'; // Importa o objeto router para navegação programática.

export default function Login() { // Define o componente funcional Login.
    const [email, setEmail] = useState(''); // Estado para armazenar o email digitado pelo usuário.
    const [password, setPassword] = useState(''); // Estado para armazenar a senha digitada pelo usuário.
    const [loading, setLoading] = useState(false); // Estado para controlar o estado de carregamento.

    async function handleSingin() { // Função assíncrona para lidar com o login do usuário.
        setLoading(true); // Define o estado de carregamento como verdadeiro.

        const { data, error } = await supabase.auth.signInWithPassword({ // Chama a função de login do Supabase.
            email: email, // Passa o email do estado.
            password: password // Passa a senha do estado.
        });

        if (error) { // Verifica se houve erro no login.
            Alert.alert('Erro', error.message); // Exibe um alerta com a mensagem de erro.
            setLoading(false); // Define o estado de carregamento como falso.
            return; // Encerra a execução da função.
        }

        setLoading(false); // Define o estado de carregamento como falso.
        router.replace('/(panel)/profile/page'); // Redireciona o usuário para a página de perfil.
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}> {/* Define a área segura com fundo branco. */}
            <ScrollView> {/* Permite rolagem do conteúdo. */}
                <View style={styles.container}> {/* Contêiner principal do layout. */}
                    <View style={styles.header}> {/* Cabeçalho da página. */}
                        <Text style={styles.logoText}> {/* Texto do logo. */}
                            Dev<Text style={{ color: colors.green }}>app</Text> {/* Parte do logo com cor verde. */}
                        </Text>
                        <Text style={styles.slogan}> {/* Slogan da aplicação. */}
                            O futuro da programação
                        </Text>
                    </View>

                    <View style={styles.form}> {/* Formulário de login. */}
                        <View>
                            <Text style={styles.label}>Email:</Text> {/* Rótulo para o campo de email. */}
                            <TextInput 
                                placeholder='Digite seu email...' // Placeholder do campo de email.
                                style={styles.input} // Estilo do campo de entrada.
                                value={email} // Valor do campo de email.
                                onChangeText={setEmail} // Atualiza o estado do email ao digitar.
                            />
                        </View>
                        
                        <View>
                            <Text style={styles.label}>Senha:</Text> {/* Rótulo para o campo de senha. */}
                            <TextInput 
                                placeholder='Digite sua senha...' // Placeholder do campo de senha.
                                style={styles.input} // Estilo do campo de entrada.
                                secureTextEntry // Oculta o texto digitado (modo senha).
                                value={password} // Valor do campo de senha.
                                onChangeText={setPassword} // Atualiza o estado da senha ao digitar.
                            />
                        </View>

                        <Pressable style={styles.button} onPress={handleSingin}> {/* Botão para enviar o formulário. */}
                            <Text style={styles.buttonText}>
                                {loading ? 'Carregando...' : 'Entrar'} {/* Exibe "Carregando..." enquanto o login está em andamento. */}
                            </Text>
                        </Pressable>

                        <Link href='/(auth)/signup/page' style={styles.link}> {/* Link para a página de cadastro. */}
                            <Text>Ainda não possui uma conta? Cadastre-se</Text>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({ // Define os estilos do componente.
    container: {
        flex: 1, // O contêiner ocupa todo o espaço disponível.
        paddingTop: 34, // Espaçamento superior.
        backgroundColor: colors.zinc // Cor de fundo.
    },

    header: {
        paddingLeft: 14, // Espaçamento à esquerda.
        paddingRight: 14, // Espaçamento à direita.
    },

    logoText: {
        fontSize: 20, // Tamanho da fonte.
        fontWeight: 'bold', // Texto em negrito.
        color: colors.white, // Cor do texto.
        marginBottom: 8 // Margem inferior.
    },

    slogan: {
        fontSize: 34, // Tamanho da fonte.
        color: colors.white, // Cor do texto.
        marginBottom: 34 // Margem inferior.
    },

    form: {
        flex: 1, // O formulário ocupa todo o espaço disponível.
        backgroundColor: colors.white, // Cor de fundo.
        borderTopLeftRadius: 34, // Arredondamento no canto superior esquerdo.
        borderTopRightRadius: 34, // Arredondamento no canto superior direito.
        paddingTop: 24, // Espaçamento superior.
        paddingLeft: 14, // Espaçamento à esquerda.
        paddingRight: 14 // Espaçamento à direita.
    },

    input: {
        borderWidth: 1, // Largura da borda.
        borderColor: colors.gray, // Cor da borda.
        borderRadius: 8, // Arredondamento das bordas.
        marginBottom: 16, // Margem inferior.
        paddingHorizontal: 8, // Espaçamento horizontal interno.
        paddingTop: 14, // Espaçamento superior interno.
        paddingBottom: 14 // Espaçamento inferior interno.
    },

    label: {
        color: colors.zinc, // Cor do texto.
        marginBottom: 4 // Margem inferior.
    },

    buttonText: {
        color: colors.white, // Cor do texto.
        fontSize: 16, // Tamanho da fonte.
        fontWeight: 'bold' // Texto em negrito.
    },

    button: {
        backgroundColor: colors.green, // Cor de fundo do botão.
        borderRadius: 8, // Arredondamento das bordas.
        padding: 14, // Espaçamento interno.
        alignItems: 'center', // Alinha o conteúdo ao centro horizontalmente.
        justifyContent: 'center', // Alinha o conteúdo ao centro verticalmente.
        width: '100%' // O botão ocupa toda a largura disponível.
    },

    link: {
        marginTop: 24, // Margem superior.
        alignItems: 'center' // Alinha o conteúdo ao centro horizontalmente.
    }
});