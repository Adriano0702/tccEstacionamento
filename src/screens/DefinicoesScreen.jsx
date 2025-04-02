/**
 Esse código representa uma tela de configurações onde o usuário pode visualizar e atualizar o valor da hora do estacionamento. Ele usa o Supabase para buscar e atualizar esse valor no banco de dados, garantindo que qualquer alteração feita seja refletida imediatamente na aplicação.
 **/

// Importa os módulos necessários do React e React Native
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// Importa a instância do Supabase para comunicação com o banco de dados
import { supabase } from '../services/supabase';

// Importa a biblioteca de notificações Toast
import Toast from 'react-native-toast-message';

// Define o componente funcional DefinicoesScreen
const DefinicoesScreen = () => {
  const [precoCarro, setPrecoCarro] = useState(0); // Estado para armazenar o valor atual do carro
  const [precoMoto, setPrecoMoto] = useState(0); // Estado para armazenar o valor atual da moto
  const [novoPrecoCarro, setNovoPrecoCarro] = useState(''); // Estado para o novo valor do carro
  const [novoPrecoMoto, setNovoPrecoMoto] = useState(''); // Estado para o novo valor da moto

  // Função para exibir uma notificação de sucesso
  const notifySuccess = (message) => {
    Toast.show({
      type: 'success',
      text1: message || 'Valores atualizados com sucesso',
    });
  };

  // Função para exibir uma notificação de erro
  const notifyError = (message) => {
    Toast.show({
      type: 'error',
      text1: message || 'Falha ao atualizar os valores',
    });
  };

  // Função para buscar os valores atuais do banco de dados
  const fetchValores = async () => {
    try {
      const { data, error } = await supabase.from('definicoes').select('*').single();
      if (error) throw error;

      setPrecoCarro(data.precoCarro);
      setPrecoMoto(data.precoMoto);
    } catch (error) {
      console.error(error);
      notifyError('Erro ao carregar os valores');
    }
  };

  // Função para atualizar os valores no banco de dados
  const handleUpdateValores = async () => {
    try {
      const precoCarroAtualizado = parseFloat(novoPrecoCarro);
      const precoMotoAtualizado = parseFloat(novoPrecoMoto);

      if (isNaN(precoCarroAtualizado) || isNaN(precoMotoAtualizado)) {
        notifyError('Por favor, insira valores válidos');
        return;
      }

      const { data, error } = await supabase
        .from('definicoes')
        .update({ precoCarro: precoCarroAtualizado, precoMoto: precoMotoAtualizado })
        .eq('id', 1) // Atualiza o registro com ID 1 (ajuste conforme necessário)
        .select(); // Retorna os dados atualizados

      if (error) throw error;

      if (data && data.length > 0) {
        setPrecoCarro(data[0].precoCarro);
        setPrecoMoto(data[0].precoMoto);
        setNovoPrecoCarro('');
        setNovoPrecoMoto('');
        notifySuccess('Valores atualizados com sucesso');
      } else {
        notifyError('Nenhum dado foi atualizado');
      }
    } catch (error) {
      console.error(error);
      notifyError('Erro ao atualizar os valores');
    }
  };

  // Carrega os valores ao montar o componente
  useEffect(() => {
    fetchValores();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <Text style={styles.label}>Preço atual por hora:</Text>
      <Text style={styles.value}>Carro: R$ {precoCarro}</Text>
      <Text style={styles.value}>Moto: R$ {precoMoto}</Text>

      <TextInput
        style={styles.input}
        placeholder="Novo preço para carro"
        keyboardType="numeric"
        value={novoPrecoCarro}
        onChangeText={setNovoPrecoCarro}
      />
      <TextInput
        style={styles.input}
        placeholder="Novo preço para moto"
        keyboardType="numeric"
        value={novoPrecoMoto}
        onChangeText={setNovoPrecoMoto}
      />
      <Button title="Atualizar Valores" onPress={handleUpdateValores} />
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
});

export default DefinicoesScreen;