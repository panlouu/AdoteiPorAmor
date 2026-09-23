import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Importando o seu botão personalizado!
import Button from '../components/Button'; 

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adote por Amor 🐾</Text>
      <Text style={styles.subtitle}>Encontre seu novo melhor amigo aqui!</Text>
      
      <Button 
        title="Ver Pets Disponíveis" 
        onPress={() => navigation.navigate('Lista')} 
        variant="primary"
      />
      <Button 
        title="Cadastrar Novo Pet" 
        onPress={() => navigation.navigate('Cadastro')} 
        color="#FF6B6B"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#FFF',
    padding: 20
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#FF6B6B', 
    marginBottom: 8, 
    textAlign: 'center'
  },
  subtitle: { 
    fontSize: 16, 
    color: '#666', 
    marginBottom: 30,
    textAlign: 'center'
  }
});
