import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet } from 'react-native';
import Card from '../components/Card';
import { FlatList } from 'react-native-gesture-handler';

import { carregarPets } from '../services/petService';

export default function ListScreen({ navigation }) {

  const PETS_ESTATICOS = [
    { id: '1', nome: 'Pipoca', tipo: 'cachorro', idade: '2 anos', porte: 'Pequeno', localizacao: 'Boa Viagem, Recife', imagem: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600', descricao: 'A Pipoca é super dócil, ama brincar com crianças e já está vacinada e vermifugada. Perfeita para apartmento!' },
    { id: '2', nome: 'Mingau', tipo: 'gato', idade: '1 ano', porte: 'Médio', localizacao: 'Casa Caiada, Olinda', imagem: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600', descricao: 'Mingau é um gatinho calmo, companheiro and adora tirar um cochilo no sol. Já usa a caixa de areia perfeitamente.' },
    { id: '3', nome: 'Mel', tipo: 'cachorro', idade: '3 anos', porte: 'Médio', localizacao: 'Espinheiro, Recife', imagem: 'https://tse1.mm.bing.net/th/id/OIP.YVb5ztypGSf2kb57StKz-QHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', descricao: 'Mel é super carinhosa, cheia de energia e se dá muito bem com outros cães. Ama passear no parque!' },
    { id: '4', nome: 'Simba', tipo: 'gato', idade: '6 meses', porte: 'Pequeno', localizacao: 'Bairro Novo, Olinda', imagem: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600', descricao: 'Simba é um filhotinho curioso e brincalhão. Muito ativo, vai encher sua casa de alegria e energia!' },
    { id: '5', nome: 'Thor', tipo: 'cachorro', idade: '4 anos', porte: 'Grande', localizacao: 'Madalena, Recife', imagem: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600', descricao: 'Thor é um excelente cão de guarda e incrivelmente leal à família. Precisa de espaço para correr e gastar energia.' },
    { id: '6', nome: 'Luna', tipo: 'cachorro', idade: '1 ano', porte: 'Pequeno', localizacao: 'Graças, Recife', imagem: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=600', descricao: 'Luna é uma cachorrinha tímida no começo, mas extremamente amorosa quando ganha confiança. Muito silenciosa.' },
    { id: '7', nome: 'Oliver', tipo: 'gato', idade: '2 anos', porte: 'Médio', localizacao: 'Jardim Atlântico, Olinda', imagem: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600', descricao: 'Oliver é um gatinho independente, charmoso e muito limpo. Adora brinquedos de arranhar e caçar bolinhas.' },
    { id: '8', nome: 'Amora', tipo: 'cachorro', idade: '5 anos', porte: 'Médio', localizacao: 'Parnamirim, Recife', imagem: 'https://th.bing.com/th/id/R.3b6d415439b5d423bee619db5ad03d16?rik=XFzq5BAKukeyoQ&riu=http%3a%2f%2fportaldoscaesegatos.com.br%2fwp-content%2fuploads%2f2018%2f03%2fLulu-da-Pomer%c3%a2nia.jpg&ehk=CLAc3OgbT0sDDNv3eHfRprwS3er%2bbVVkD1Y89zJ9as8%3d&risl=&pid=ImgRaw&r=0', descricao: 'Amora é madura, obediente e super tranquila. Ideal para quem busca um pet calmo para fazer companhia no dia a dia.' },
    { id: '9', nome: 'Garfield', tipo: 'gato', idade: '3 anos', porte: 'Grande', localizacao: 'Torre, Recife', imagem: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600', descricao: 'Garfield é um gatão robusto, super manso e preguiçoso. O companheiro perfeito para maratonar séries no sofá.' },
    { id: '10', nome: 'Apolo', tipo: 'cachorro', idade: '2 anos', porte: 'Grande', localizacao: 'Imbiribeira, Recife', imagem: 'https://images.unsplash.com/photo-1444212477490-ca407925329e?w=600', descricao: 'Apolo é gigante no tamanho e no amor. Extremamente dócil com crianças e protetor com quem ama.' }
  ];

  const [pets, setPets] = useState(PETS_ESTATICOS);

  const atualizarLista = async () => {
    const petsDoStorage = await carregarPets();
    
    if (petsDoStorage.length > 0) {
      const novosCadastrados = petsDoStorage.filter(
        (petSalvo) => !PETS_ESTATICOS.some((estatico) => estatico.id === petSalvo.id)
      );
      
      setPets([...novosCadastrados, ...PETS_ESTATICOS]);
    } else {
      setPets(PETS_ESTATICOS);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      import('@react-native-async-storage/async-storage').then(storage => storage.default.clear());
      
      atualizarLista();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pets Disponíveis 🐶🐱</Text>
      <FlatList
        data={pets} 
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}  
        contentContainerStyle={styles.listaContainer}
        renderItem={({ item }) => {
          const valorTipo = item.tipo || item.especie || '';
          const tipoNormalizado = valorTipo.toLowerCase().trim();
          
          const esGato = tipoNormalizado === 'gato' || tipoNormalizado === 'gata';
          const emoji = esGato ? '🐱' : '🐶';
          
          const fotoPadrao = esGato 
            ? 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600' 
            : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600'; 

          let idadeFormatada = item.idade ? item.idade.trim() : '1 ano';
          if (!idadeFormatada.toLowerCase().includes('ano') && !idadeFormatada.toLowerCase().includes('mes')) {
            idadeFormatada = parseInt(idadeFormatada) === 1 ? `${idadeFormatada} ano` : `${idadeFormatada} anos`;
          }

          const petFormatated = {
            ...item,
            nome: `${item.nome} ${emoji}`,
            idade: idadeFormatada,
            porte: item.porte || 'Médio', 
            localizacao: item.localizacao ? item.localizacao.trim() : 'Jardim Atlântico, Olinda', 
            imagem: item.imagem || fotoPadrao 
          };

          return (
            <Card
              pet={petFormatated}
              onPress={() => navigation.navigate('Detalhes', { petSelecionado: petFormatated })}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', 
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
    paddingHorizontal: 20
  },
  listaContainer: {
    paddingBottom: 20
  }
});
