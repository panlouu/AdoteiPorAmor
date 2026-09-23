import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, ScrollView } from 'react-native';
import Button from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { DeviceMotion } from 'expo-sensors';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {

  const [image, setImage] = useState(null);
  const [locationText, setLocationText] = useState('📍 Não localizado')
  const [orientation, setOrientation] = useState('📱 Em pé (Vertical)')

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()


    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "Você precisa permitir o acesso à galeria!")
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });


    if (!result.canceled) {
      setImage(result.assets[0].uri);
    };
  }

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert("Permissão negada", "Precisamos de permissão")
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = currentLocation.coords;

    let addressResponse = await Location.reverseGeocodeAsync({longitude,latitude})
    if(addressResponse.length>0) {
      const address = addressResponse[0];

      const cidade = address.city || address.subregion;
      const estado = address.region;

      setLocationText(`📍 ${cidade} - ${estado}`);
    }else{
    setLocationText(`Lat: ${latitude.toFixed(4)} | Lon: ${longitude.toFixed(4)}`);
    }

    Alert.alert('Sucesso', 'Localização atualizada com o GPS!');
  }

  useEffect(() => {
    DeviceMotion.setUpdateInterval(300);

    const subscription = DeviceMotion.addListener((data) => {
      if (data.rotation) {
        const { gamma } = data.rotation;
        if (Math.abs(gamma) > 1.0) {
          setOrientation('🔄 Deitado (Horizontal)');
        } else {
          setOrientation('📱 Em pé (Vertical)');
        }
      }
    })
    return () => {
      subscription.remove()
    }
  }, []);


  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={true}>

      <TouchableOpacity style={styles.avatarContainer} onPress={pickImage} activeOpacity={0.7}>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Ionicons name='person' size={70} color='#bbb' />
          </View>
        )}
        <View style={styles.cameraIconBadge}>
          <Ionicons name='camera' size={16} color='#fff' />
        </View>
      </TouchableOpacity>


      <View style={styles.profileHeader}>
        <Text style={styles.userName}>Luiz Eduardo</Text>
        <Text style={styles.userSubtitle}> Estudante de Sistemas da Informação</Text>
        <Text style={styles.userLocation}>{locationText}</Text>
      </View>
      <View style={styles.sensorsArea}>
        <Text style={styles.sensorsTitle}>🧭 Estado do Giroscópio / Rotação</Text>
        <Text style={styles.orientationValue}>{orientation}</Text>      
        </View>

      <View style={styles.actions}>
        <Button
          title="Tirar Foto de Perfil"
          onPress={pickImage}
          variant="primary"
        />
        <Button
          title="Atualizar Localização (GPS)"
          onPress={getLocation}
          variant="secondary"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatarImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  avatarPlaceholder: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e2e2',
  },
  cameraIconBadge: {
    position: 'absolute',
    bottom: 0,
    right: 4,
    backgroundColor: '#FF6B6B',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  userSubtitle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  sensorsArea: {
    width: '100%',
    marginTop: 40,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  sensorsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
  },
  orientationValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34D399',
  },
  actions: {
    width: '100%',
    gap: 15,
  },
  placeholderText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
});
