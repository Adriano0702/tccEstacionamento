/*
Esse código é um componente React Native que gerencia um estacionamento, permitindo registrar veículos, calcular o tempo estacionado e fechar a cobrança com base no tempo. Ele utiliza o Supabase para armazenamento e manipulação de dados, além de exibir notificações ao usuário.
 */

// Importa os módulos necessários do React e React Native
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

// Importa a instância do Supabase para manipulação do banco de dados
import { supabase } from '../services/supabase';

// Importa a biblioteca de notificações Toast
import Toast from 'react-native-toast-message';

// Importa o Picker do @react-native-picker/picker
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';

// Define o componente funcional Estacionamento
const Estacionamento = () => {
  const [placa, setPlaca] = useState('');
  const [nomeVeiculo, setNomeVeiculo] = useState('');
  const [cor, setCor] = useState('');
  const [tipoVeiculo, setTipoVeiculo] = useState('carro'); // 'carro' ou 'moto'
  const [veiculosEstacionados, setVeiculosEstacionados] = useState([]);
  const [precoCarro, setPrecoCarro] = useState(0);
  const [precoMoto, setPrecoMoto] = useState(0);
  const [pesquisa, setPesquisa] = useState(''); // Estado para a pesquisa

  // Função para exibir notificações de sucesso
  const notifySuccess = (message) => {
    Toast.show({
      type: 'success',
      text1: message || 'Operação realizada com sucesso',
    });
  };

  // Função para exibir notificações de erro
  const notifyError = (message) => {
    Toast.show({
      type: 'error',
      text1: message || 'Ocorreu um erro',
    });
  };

  // Função para carregar os preços de carro e moto
  async function carregarPrecos() {
    try {
      const { data, error } = await supabase.from('definicoes').select('*').limit(1);
      if (error) throw error;

      if (data && data.length > 0) {
        setPrecoCarro(data[0].precoCarro);
        setPrecoMoto(data[0].precoMoto);
      } else {
        console.error('Nenhum dado encontrado na tabela definicoes');
      }
    } catch (error) {
      console.error(error);
      notifyError('Erro ao carregar preços');
    }
  }

  // Função para carregar os veículos estacionados
  async function carregarVeiculos() {
    try {
      const { data, error } = await supabase.from('veiculos_estacionados').select('*');
      if (error) throw error;

      setVeiculosEstacionados(data);
    } catch (error) {
      console.error(error);
      notifyError('Erro ao carregar veículos estacionados');
    }
  }

  // useEffect para carregar dados iniciais
  useEffect(() => {
    carregarPrecos();
    carregarVeiculos();
  }, []);

  // Função para registrar um novo veículo
  async function registrarVeiculo() {
    // Ajusta o horário para o fuso horário local antes de salvar
    const horarioCheckin = new Date();
    const horarioLocal = new Date(horarioCheckin.getTime() - horarioCheckin.getTimezoneOffset() * 60000).toISOString();

    try {
      // Verifica se a placa já está cadastrada com status 'ativo'
      const { data: veiculoExistente, error: errorVerificacao } = await supabase
        .from('veiculos_estacionados')
        .select('*')
        .eq('placa', placa)
        .eq('status', 'ativo')
        .single();

      if (errorVerificacao && errorVerificacao.code !== 'PGRST116') {
        throw errorVerificacao;
      }

      if (veiculoExistente) {
        notifyError('Este veículo já está registrado e ativo. Finalize-o antes de registrar novamente.');
        return;
      }

      // Insere o novo veículo na tabela
      const { error } = await supabase.from('veiculos_estacionados').insert([
        {
          placa,
          nome_veiculo: nomeVeiculo,
          cor,
          tipo_veiculo: tipoVeiculo,
          horario_checkin: horarioLocal, // Salva o horário ajustado para o fuso horário local
          horario_saida: null, // Certifica-se de que o horário de saída está vazio
          status: 'ativo',
        },
      ]);

      if (error) throw error;

      carregarVeiculos();
      setPlaca('');
      setNomeVeiculo('');
      setCor('');
      setTipoVeiculo('carro');
      notifySuccess('Veículo registrado com sucesso');
    } catch (error) {
      console.error(error);
      notifyError('Erro ao registrar veículo');
    }
  }

  // Função para exibir o horário no fuso horário local
  function formatarHorario(horario) {
    if (!horario) return '---'; // Retorna '---' se o horário for nulo ou indefinido
    const data = new Date(horario);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa do zero
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${horas}:${minutos}`; // Formato: DD/MM/AAAA HH:mm
  }

  // Função para fechar a cobrança e atualizar o status
  async function fecharVeiculo(id, horarioCheckin, tipoVeiculo) {
    const horarioSaida = new Date();
    const horarioLocalSaida = new Date(horarioSaida.getTime() - horarioSaida.getTimezoneOffset() * 60000).toISOString(); // Ajusta para o fuso horário local
    const tempoPermanencia = Math.ceil((horarioSaida - new Date(horarioCheckin)) / (1000 * 60)); // Tempo em minutos
    const precoHora = tipoVeiculo === 'carro' ? precoCarro : precoMoto;

    // Calcula o valor com base no tempo de permanência
    let valor;
    if (tempoPermanencia < 60) {
      valor = precoHora / 2; // Cobra metade do valor estipulado
    } else {
      valor = (tempoPermanencia / 60) * precoHora; // Calcula o valor normal
    }

    try {
      // Atualizar o status e o valor na tabela
      const { error } = await supabase
        .from('veiculos_estacionados')
        .update({
          status: 'finalizado',
          valor: valor.toFixed(2),
          horario_saida: horarioLocalSaida, // Salva o horário ajustado para o fuso horário local
        })
        .eq('id', id);

      if (error) throw error;

      carregarVeiculos();
      notifySuccess(`Cobrança finalizada: R$ ${valor.toFixed(2)}`);
    } catch (error) {
      console.error(error);
      notifyError('Erro ao fechar cobrança');
    }
  }

  // Filtrar veículos com base na pesquisa
  const veiculosFiltrados = veiculosEstacionados.filter((veiculo) =>
    veiculo.placa.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Estacionamento</Text>
        <Text style={styles.value}>Preço por hora - Carro: R$ {precoCarro} | Moto: R$ {precoMoto}</Text>

        <TextInput
          style={styles.input}
          placeholder="Pesquisar por placa"
          value={pesquisa}
          onChangeText={setPesquisa}
        />

        <TextInput
          style={styles.input}
          placeholder="Placa do veículo"
          value={placa}
          onChangeText={setPlaca}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome do veículo"
          value={nomeVeiculo}
          onChangeText={setNomeVeiculo}
        />
        <TextInput
          style={styles.input}
          placeholder="Cor do veículo"
          value={cor}
          onChangeText={setCor}
        />
        <Picker selectedValue={tipoVeiculo} onValueChange={(itemValue) => setTipoVeiculo(itemValue)}>
          <Picker.Item label="Carro" value="carro" />
          <Picker.Item label="Moto" value="moto" />
        </Picker>

        <Button title="Registrar Veículo" onPress={registrarVeiculo} />

        <FlatList
          data={veiculosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text>{item.nome_veiculo} ({item.tipo_veiculo})</Text>
              <Text>Placa: {item.placa}</Text>
              <Text>Entrada: {formatarHorario(item.horario_checkin)}</Text>
              <Text>Saída: {item.horario_saida ? formatarHorario(item.horario_saida) : '---'}</Text>
              <Text>Valor: {item.valor ? `R$ ${item.valor}` : '---'}</Text>
              {item.status === 'ativo' ? (
                <Button
                  title="Fechar"
                  onPress={() => fecharVeiculo(item.id, item.horario_checkin, item.tipo_veiculo)}
                />
              ) : (
                <Text style={styles.finalizado}>Finalizado</Text>
              )}
            </View>
          )}
        />
        <Toast />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'column',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  finalizado: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default Estacionamento;