import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../components/Button';

export default function DetailScreen({ route, navigation }) {
  const { petSelecionado } = route.params;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: petSelecionado.imagem }}
      />

      <View style={styles.content}>

        <View style={styles.headerRow}>
          <Text style={styles.title}>{petSelecionado.nome}</Text>
          <Text style={styles.badge}>{petSelecionado.tipo === 'cachorro' ? '🐶' : '🐱'}</Text>

        </View>

        <Text style={styles.details}>{petSelecionado.idade}• Porte {petSelecionado.porte}</Text>

        <Text style={styles.location}>📍{petSelecionado.localizacao}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}> História & Temperamento </Text>
        <Text style={styles.description}> {petSelecionado.descricao}</Text>

        <Button
          title="Voltar para a Lista"
          onPress={() => navigation.goBack()}
          variant="secondary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#F2F2F2'
  },
  content: {
    padding: 24
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333'
  },
  badge: {
    fontSize: 26
  },
  details: {
    fontSize: 16,
    color: '#666',
    marginBottom: 6,
    fontWeight: '500'
  },
  location: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 32
  }
});
