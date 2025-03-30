/**
 Esse código define a tela inicial do aplicativo, permitindo ao usuário navegar para as telas de gerenciamento do estacionamento e configurações. Ele usa o React Navigation para realizar a navegação entre telas.
 
 **/

// Importa a biblioteca React, necessária para criar componentes
import React from 'react';

// Importa os componentes do React Native para construir a interface
import { View, Text, Button } from 'react-native';

// Importa o hook useNavigation do React Navigation para permitir a navegação entre telas
import { useNavigation } from '@react-navigation/native';

// Define o componente funcional HomeScreen
const HomeScreen = () => {
  const navigation = useNavigation(); // Obtém o objeto de navegação para possibilitar a transição entre telas

  return (
    // Cria um contêiner que ocupa toda a tela e centraliza os elementos
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

       {/* Exibe um título na tela inicial */}
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Bem-vindo ao Estacionamento</Text>

      {/* Botão para navegar até a tela de gerenciamento de estacionamento */}
      <Button
        title="Gerenciar Estacionamento"
        onPress={() => navigation.navigate('Estacionamento')}
      />

      {/* Botão para navegar até a tela de configurações */}
      <Button
        title="Configurações"
        onPress={() => navigation.navigate('Definicoes')}
      />
    </View>
  );
};

export default HomeScreen;