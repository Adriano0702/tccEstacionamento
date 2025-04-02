/*
    Este código implementa uma tela de cadastro com campos para nome, email e senha. Ele utiliza o Supabase para criar uma conta de usuário e o expo-router para navegação. Os estilos são definidos com o StyleSheet do React Native.
 */


import colors from '@/constants/Colors'; // Importa um módulo de cores personalizado.
import {
        View, Text, StyleSheet, TextInput, Pressable, ScrollView, Alert
    } from 'react-native'; // Importa componentes do React Native para construir a interface.
import { router } from 'expo-router'; // Importa o objeto router para navegação programática.
import { Ionicons } from '@expo/vector-icons'; // Importa ícones da biblioteca Ionicons.
import { useState } from 'react'; // Importa o hook useState para gerenciar estados no componente.
import { SafeAreaView } from 'react-native-safe-area-context'; // Garante que o conteúdo respeite as áreas seguras do dispositivo.
import { supabase } from '../../../lib/supabase'; // Importa a instância configurada do Supabase.

export default function Signup() { // Define o componente funcional Signup.

    const [name, setname] = useState(''); // Estado para armazenar o nome completo do usuário.
    const [email, setEmail] = useState(''); // Estado para armazenar o email do usuário.
    const [password, setPassword] = useState(''); // Estado para armazenar a senha do usuário.
    const [loading, setLoading] = useState(false); // Estado para controlar o estado de carregamento.

    async function handleSingup() { // Função assíncrona para lidar com o cadastro do usuário.
        setLoading(true); // Define o estado de carregamento como verdadeiro.

        const { data, error } = await supabase.auth.signUp({ // Chama a função de cadastro do Supabase.
            email: email, // Passa o email do estado.
            password: password, // Passa a senha do estado.
            options: {
                data: {
                    name: name // Passa o nome completo do estado.
                }
            }
        });

        if (error) { // Verifica se houve erro no cadastro.
            Alert.alert('Erro', error.message); // Exibe um alerta com a mensagem de erro.
            setLoading(false); // Define o estado de carregamento como falso.
            return; // Encerra a execução da função.
        }

        setLoading(false); // Define o estado de carregamento como falso.
        router.replace('/(auth)/signin/page'); // Redireciona o usuário para a página de login.
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}> {/* Define a área segura com fundo branco. */}
            <ScrollView> {/* Permite rolagem do conteúdo. */}
                <View style={styles.container}> {/* Contêiner principal do layout. */}
                    <View style={styles.header}> {/* Cabeçalho da página. */}

                        <Pressable
                            style={styles.backButton} // Estilo do botão de voltar.
                            onPress={() => router.back()} // Navega para a página anterior.
                        >
                            <Ionicons name="arrow-back" size={24} color={colors.white} /> {/* Ícone de voltar. */}
                        </Pressable>
                        <Text style={styles.logoText}> {/* Texto do logo. */}
                            Dev<Text style={{ color: colors.green }}>app</Text> {/* Parte do logo com cor verde. */}
                        </Text>
                        <Text style={styles.slogan}> {/* Slogan da aplicação. */}
                            Criar uma conta
                        </Text>
                    </View>

                    <View style={styles.form}> {/* Formulário de cadastro. */}
                        <View>
                            <Text style={styles.label}>Nome completo:</Text> {/* Rótulo para o campo de nome. */}
                            <TextInput 
                                placeholder='Nome completo...' // Placeholder do campo de nome.
                                style={styles.input} // Estilo do campo de entrada.
                                value={name} // Valor do campo de nome.
                                onChangeText={setname} // Atualiza o estado do nome ao digitar.
                            />
                        </View>

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

                        <Pressable style={styles.button} onPress={handleSingup}> {/* Botão para enviar o formulário. */}
                            <Text style={styles.buttonText}>
                                {loading ? 'Carregando...' : 'Cadastrar'} {/* Exibe "Carregando..." enquanto o cadastro está em andamento. */}
                            </Text>
                        </Pressable>
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

    backButton: {
        backgroundColor: 'rgba(255,255,255,0.70)', // Fundo semitransparente.
        alignSelf: 'flex-start', // Alinha o botão à esquerda.
        padding: 8, // Espaçamento interno.
        borderRadius: 8, // Arredondamento das bordas.
        marginBottom: 8, // Margem inferior.
    }
});