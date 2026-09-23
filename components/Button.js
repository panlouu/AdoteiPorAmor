import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button({ title, onPress, variant = 'primary' }) {
  const buttonStyle = variant === 'primary' ? styles.btnPrimary : styles.btnSecondary;

  return (
    <TouchableOpacity 
      style={[styles.button, buttonStyle]} 
      onPress={onPress} 
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  btnPrimary: {
    backgroundColor: '#FF6B6B', 
  },
  btnSecondary: {
    backgroundColor: '#4D96FF', 
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
