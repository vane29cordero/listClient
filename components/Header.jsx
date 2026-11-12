import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

export default function Header({ nombre, esClaro, onToggleNombre, onToggleFondo }) {
  return (
    <View style={[styles.cabecera, { backgroundColor: esClaro ? '#82abec' : '#0f172a' }]}>
      
      <Pressable 
        style={[styles.botonSuperior, { backgroundColor: esClaro ? '#5785cf' : '#334155' }]} 
        onPress={onToggleFondo}
      >
        <Text style={styles.textoBoton}>Fondo</Text>
      </Pressable>

      <Text style={styles.titulo}>{nombre}</Text>

      <Pressable 
        style={[styles.botonSuperior, { backgroundColor: esClaro ? '#5785cf' : '#334155' }]} 
        onPress={onToggleNombre}
      >
        <Text style={styles.textoBoton}>Nombre</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  cabecera: {
    height: 90,
    paddingTop: 40,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  botonSuperior: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
});