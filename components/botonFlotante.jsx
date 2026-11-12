import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

export default function BotonFlotante({ label, onPress, onLongPress, posicion, esClaro }) {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.boton, 
        posicion === 'izquierda' ? styles.bottomLeft : styles.bottomRight, 
        { backgroundColor: esClaro ? '#82abec' : '#334155' },
        pressed
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Text style={styles.texto}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    position: 'absolute',
    bottom: 30,
    width: 65,
    height: 65,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRight: {
    right: 30,
  },
  bottomLeft: {
    left: 30,
  },
  texto: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
});