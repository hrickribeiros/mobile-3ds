import { useState } from 'react';
import { Text, View, Button, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export default function App() {
  const [verReceitaVisivel, setVerReceitaVisivel] = useState(false);
  const [modalCadastroVisivel, setModalCadastroVisivel] = useState(false);
  
  const [receitas, setReceitas] = useState([
    { 
      id: '1', 
      titulo: "Bolo de Cenoura 🥕", 
      ingredientes: "- 3 cenouras\n- 4 ovos\n- 2 xícaras de açúcar\n- 2 xícaras de farinha", 
      preparo: "Bata no liquidificador e asse por 40 minutos." 
    }
  ]);
  
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);

  const [novoTitulo, setNovoTitulo] = useState('');
  const [novosIngredientes, setNovosIngredientes] = useState('');
  const [novoPreparo, setNovoPreparo] = useState('');

  const salvarReceita = () => {
    if (!novoTitulo || !novosIngredientes || !novoPreparo) {
      alert("Por favor, preencha todos os campos!");
      return;
    }
    const nova = {
      id: Math.random().toString(),
      titulo: novoTitulo,
      ingredientes: novosIngredientes,
      preparo: novoPreparo
    };
    setReceitas([...receitas, nova]);
    alert("Receita salva com sucesso!");
    cancelarCadastro();
  };

  const cancelarCadastro = () => {
    setNovoTitulo('');
    setNovosIngredientes('');
    setNovoPreparo('');
    setModalCadastroVisivel(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 App de Receitas</Text>
      <Text style={styles.subtitle}>Colecione suas receitas preferidas</Text>

      <ScrollView style={styles.lista} contentContainerStyle={{ paddingBottom: 100 }}>
        {receitas.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitulo}>{item.titulo}</Text>
            <Button 
              title="Ver Receita" 
              color="#D35400" 
              onPress={() => {
                setReceitaSelecionada(item);
                setVerReceitaVisivel(true);
              }} 
            />
          </View>
        ))}
      </ScrollView>

      {/* Modal de Detalhes da Receita */}
      <Modal animationType="slide" transparent={true} visible={verReceitaVisivel}>
        <View style={styles.modalCentrado}>
          <View style={styles.modalConteudo}>
            <Text style={styles.modalTitulo}>{receitaSelecionada?.titulo}</Text>
            
            <Text style={styles.secaoTitulo}>Ingredientes:</Text>
            <Text style={styles.secaoTexto}>{receitaSelecionada?.ingredientes}</Text>
            
            <Text style={styles.secaoTitulo}>Modo de Preparo:</Text>
            <Text style={styles.secaoTexto}>{receitaSelecionada?.preparo}</Text>
            
            <Button title="Fechar" color="#D35400" onPress={() => setVerReceitaVisivel(false)} />
          </View>
        </View>
      </Modal>

      {/* Modal de Cadastro */}
      <Modal animationType="fade" transparent={true} visible={modalCadastroVisivel}>
        <View style={styles.modalCentrado}>
          <View style={styles.modalConteudo}>
            <Text style={styles.modalTitulo}>Nova Receita</Text>
            
            <TextInput style={styles.input} placeholder="Nome da Receita" value={novoTitulo} onChangeText={setNovoTitulo} />
            <TextInput style={[styles.input, { height: 70 }]} placeholder="Ingredientes" multiline={true} value={novosIngredientes} onChangeText={setNovosIngredientes} />
            <TextInput style={[styles.input, { height: 70 }]} placeholder="Modo de Preparo" multiline={true} value={novoPreparo} onChangeText={setNovoPreparo} />

            <View style={{ gap: 10, marginTop: 10 }}>
              <Button title="Salvar" color="#2ECC71" onPress={salvarReceita} />
              <Button title="Cancelar" color="#E74C3C" onPress={cancelarCadastro} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Botão Flutuante (FAB) */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalCadastroVisivel(true)}>
        <Text style={styles.fabTexto}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    paddingTop: 60,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#D35400",
    textAlign: "center"
  },
  subtitle: {
    fontSize: 16,
    color: "#566573",
    marginBottom: 20,
    textAlign: "center"
  },
  lista: {
    flex: 1,
    width: '100%'
  },
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8
  },
  modalCentrado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalConteudo: {
    width: '85%',
    backgroundColor: "white",
    borderRadius: 12,
    padding: 22,
    elevation: 5
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#D35400",
    marginBottom: 15,
    textAlign: 'center'
  },
  secaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#2C3E50'
  },
  secaoTexto: {
    fontSize: 14,
    color: '#566573',
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    width: '100%'
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D35400',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabTexto: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
  }
});
