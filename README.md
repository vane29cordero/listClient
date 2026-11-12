import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.nombre}>
        <Text style={styles.nombreText}>Laura Cordero!</Text>
      </View>
      <View style={styles.contador}>
        <Text style={styles.numero}> {count} </Text>
      </View>
      <View style={styles.botones}>
        <Button onPress={() => setCount (count + 1)} title="Sumar" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1
  },

  nombre: {
    backgroundColor: '#4F46E5',
    padding: 20,
    justifyContent: 'center',
    alignContent: 'center'
  },

  nombreText: {
    color: 'white',
    fontSize: 30,
  },

  contador:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  numero: {
    fontSize: 60,
    color: '#1F2937',
  },

  botones: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  }
});

-------------------------------------------
const [count, setCount] = useState(0);
  const [nombre, setNombre] = useState('Laura');
  const [fondoClaro, setFondoClaro] = useState(true);

  return (
    <View style={[styles.contenedor, { backgroundColor: fondoClaro ? '#F8FAFC' : '#1e293b' }]}>
      <Header 
        nombre={nombre} 
        esClaro={fondoClaro} 
        onToggleNombre={() => setNombre(nombre === 'Laura' ? 'Vanessa' : 'Laura')} 
        onToggleFondo={() => setFondoClaro(!fondoClaro)} 
      />

      <View style={styles.cuerpo}>
        <Text style={[styles.cuerpoText, { color: fondoClaro ? '#0F172A' : '#F8FAFC' }]}>
          {count}
        </Text>
      </View>

      <BotonFlotante 
        label="-" 
        posicion="izquierda" 
        esClaro={fondoClaro}
        onPress={() => setCount(count - 1)} 
        onLongPress={() => setCount(0)} 
      />

      <BotonFlotante 
        label="+" 
        posicion="derecha" 
        esClaro={fondoClaro}
        onPress={() => setCount(count + 1)} 
        onLongPress={() => setCount(0)} 
      />
    </View>
  );

  const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  cuerpo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cuerpoText: {
    fontSize: 64,
    fontWeight: 'bold',
  },
});
