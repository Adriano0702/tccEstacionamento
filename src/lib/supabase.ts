/*
  Este código configura o cliente do Supabase para uso em um aplicativo React Native. Ele utiliza o AsyncStorage para armazenar a sessão do usuário localmente e habilita a atualização automática do token de autenticação. Além disso, ele monitora o estado do aplicativo (ativo ou em segundo plano) para iniciar ou parar a atualização automática do token, garantindo que a sessão do usuário seja gerenciada de forma eficiente.
*/

import { AppState } from 'react-native'; // Importa o AppState do React Native para monitorar o estado do aplicativo.
import 'react-native-url-polyfill/auto'; // Importa o polyfill para corrigir problemas relacionados a URLs no React Native.
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa o AsyncStorage para armazenar dados localmente no dispositivo.
import { createClient } from '@supabase/supabase-js'; // Importa a função createClient para criar uma instância do cliente Supabase.
import { anonkey, supaUrl } from '@/constants/supabase'; // Importa as constantes com a URL e a chave anônima do Supabase.

const supabaseUrl = supaUrl; // Define a URL do Supabase a partir da constante importada.
const supabaseAnonKey = anonkey; // Define a chave anônima do Supabase a partir da constante importada.

export const supabase = createClient(supabaseUrl, supabaseAnonKey, { // Cria uma instância do cliente Supabase.
  auth: {
    storage: AsyncStorage, // Configura o AsyncStorage para armazenar a sessão do usuário localmente.
    autoRefreshToken: true, // Habilita a atualização automática do token de autenticação.
    persistSession: true, // Garante que a sessão do usuário seja persistida entre reinicializações do aplicativo.
    detectSessionInUrl: false, // Desabilita a detecção de sessão na URL (não necessário em aplicativos móveis).
  },
});

// Adiciona um listener para monitorar mudanças no estado do aplicativo (foreground ou background).
AppState.addEventListener('change', (state) => {
  if (state === 'active') { // Verifica se o aplicativo está em primeiro plano (ativo).
    supabase.auth.startAutoRefresh(); // Inicia a atualização automática do token de autenticação.
  } else { // Caso contrário, o aplicativo está em segundo plano ou inativo.
    supabase.auth.stopAutoRefresh(); // Para a atualização automática do token de autenticação.
  }
});