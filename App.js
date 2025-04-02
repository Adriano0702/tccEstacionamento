// Importa a biblioteca React, necessária para criar componentes
import React from 'react';

// Importa o NavigationContainer, que gerencia a navegação do aplicativo
import { NavigationContainer } from '@react-navigation/native';

// Importa a função para criar um navegador do tipo Stack (pilha de navegação)
import { createStackNavigator } from '@react-navigation/stack';

// Importa as telas do aplicativo
import HomeScreen from './src/screens/HomeScreen'; // Tela inicial
import DefinicoesScreen from './src/screens/DefinicoesScreen'; // Tela de configurações
import Estacionamento from './src/components/Estacionamento'; // Tela de gerenciamento do estacionamento
import Login from './src/app/(auth)/signin/page'; // Tela de login
import Signup from './src/app/(auth)/signup/page';

// Cria um navegador do tipo Stack
const Stack = createStackNavigator();

// Define o componente principal do aplicativo
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Tela inicial */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Tela Inicial' }} 
        />
        {/* Tela de configurações */}
        <Stack.Screen 
          name="Definicoes" 
          component={DefinicoesScreen} 
          options={{ title: 'Configurações' }} 
        />
        {/* Tela do estacionamento */}
        <Stack.Screen 
          name="Estacionamento" 
          component={Estacionamento} 
          options={{ title: 'Gerenciar Estacionamento' }} 
        />
        {/* Tela de login */}
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ title: 'Gerenciar Estacionamento' }} 
        />
        {/* Tela de cadastro */}
        <Stack.Screen 
          name="Cadastro" 
          component={Signup} 
          options={{ title: 'Cadastrar novo usuario' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;