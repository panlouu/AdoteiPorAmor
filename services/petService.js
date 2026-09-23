import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@pets';

export async function salvarPets(pets) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pets));
  } catch (error) {
    console.log('Erro ao salvar pets', error);
  }
}

export async function carregarPets() {
  try {
    const dados = await AsyncStorage.getItem(STORAGE_KEY);
    return dados ? JSON.parse(dados) : [];
  } catch (error) {
    console.log('Erro ao carregar pets', error);
    return [];
  }
}

export async function adicionarPet(dadosPet) {
  try {
    const petsExistentes = await carregarPets();
    
    const novoPet = {
      id: Date.now().toString(),
      ...dadosPet
    };

    petsExistentes.unshift(novoPet);
    
    await salvarPets(petsExistentes);

    return novoPet;
  } catch (error) {
    console.log('Erro ao adicionar o pet', error);
  }
}

export async function deletarPet(idPet) {
  try {
    const petsExistentes = await carregarPets();
    const listaFiltrada = petsExistentes.filter(pet => pet.id !== idPet);
    
    await salvarPets(listaFiltrada);
    return listaFiltrada;
  } catch (error) {
    console.log('Erro ao deletar o pet', error);
  }
}
