import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, Alert } from "react-native";

import { adicionarPet } from "../services/petService";

export default function RegistrationScreen({ navigation }) {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [especie, setEspecie] = useState('');
    const [contato, setContato] = useState('');

    const handleRegister = async () => {
        if (!nome || !idade || !especie || !contato) {
            Alert.alert('Atenção', 'Por favor, preencha todos os campos!');
            return;
        };

        const dadosDoPet = { nome, idade, especie, contato };
        const resultado = await adicionarPet(dadosDoPet);

        if (resultado) {
            Alert.alert('Pet cadastrado com amor!')
            navigation.goBack();
        } else {
            Alert.alert('Error, não foi possível cadastrar o pet')
        };
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastrar Novo Amigo</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome do pet"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Espécie (Cão ou Gato)"
                value={especie}
                onChangeText={setEspecie}
            />
            <TextInput
                style={styles.input}
                placeholder="Idade"
                value={idade}
                onChangeText={setIdade}
            />
            <TextInput
                style={styles.input}
                placeholder="Contato (WhatsApp)"
                value={contato}
                onChangeText={setContato}
            />

            <Button
                title="Salvar Pet"
                onPress={handleRegister}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DDD',
        marginBottom: 12
    }
});
