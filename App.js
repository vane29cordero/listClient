import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, StatusBar, 
  FlatList, Pressable, Modal, TextInput 
} from 'react-native';
import CardListClient from './components/listCardClients';

export default function App() {

  // constante para la visibilidad del modal
  const [visibleModal, setVisibleModal] = useState(false);

  // Constantes para almacenar los datos
  const [name, setNameClients] = useState("");
  const [age, setAgeClients] = useState("");
  const [location, setLocationClients] = useState("");

  // Funcion para guardar
  const saveDataClients = () => {
    setListClients([
      ...listClients,
      {
        id: 1,
        name: name,
        edad: age, 
        direccion: location
      }
    ])
    setVisibleModal(false)
  }

  const [listClients, setListClients] = useState([
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "edad": 30,
      "direccion": "Calle 123",
    },
    {
      "id": 2,
      "nombre": "María López",
      "edad": 25,
      "direccion": "Avenida 456",
    },
    {
      "id": 3,
      "nombre": "Carlos García",
      "edad": 40,
      "direccion": "Boulevard 789",
    }
  ]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.List}>
        <Text style={styles.textList}>
          Lista Clientes
        </Text>
        <StatusBar style='auto' />
      </View>
      <View style={styles.contenedorList}>
        <FlatList
          data={listClients}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={() => (
            <Text style={styles.textList}>No hay datos registrados.</Text>
          )}
          renderItem={({ item }) => {
            return (
              <CardListClient
                nombre={item.nombre}
                edad={item.edad}
                direccion={item.direccion}
              />
            );
          }}
        >
        </FlatList>
      </View>

      <Pressable
        onPress={(() => setVisibleModal(!visibleModal))}
        style={styles.newRegister}
      >
        <Text style={styles.textRegister}>+</Text>
      </Pressable>

      {/*Componente Modal*/}
      <Modal
        visible={visibleModal}
        animationType='slide'
      >
        <View style={{ flex: 1 }}>
          <View style={styles.headerModal}>
            <Text style={styles.titleModal}> Nuevo Cliente </Text>
          <Pressable
            onPress={(() => setVisibleModal(!visibleModal))}
            style={styles.newRegister}
          >
            <Text style={styles.titleModal}>X</Text>
          </Pressable>
          </View>
          <View style={styles.bodyFormClients}>
            <View style={styles.formControl}>
              <Text style={styles.inputTitle}>Nombre Completo</Text>
              <TextInput style={styles.inputText}
                placeholder='Escriba su Nombre Completo'
                onChangeText={setNameClients}
              />
            </View>
            <View style={styles.formControl}>
              <Text style={styles.inputTitle}>Edad</Text>
              <TextInput style={styles.inputText}
                placeholder='Escriba su Edad'
                onChangeText={setAgeClients}
              />
            </View>
            <View style={styles.formControl}>
              <Text style={styles.inputTitle}>Dirección</Text>
              <TextInput style={styles.inputText}
                placeholder='Escriba su Dirección'
                onChangeText={setLocationClients}
              />
            </View>
            <Pressable
              onPress={saveDataClients}
              style={styles.btnSaveData}
            >
              <Text style={styles.textBtnSave}>GUARDAR DATOS</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  contenedor: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  List: {
    height: 65,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7AB6E6'
  },
  textList: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  contenedorList: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
  },
  newRegister: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#ceddeb',
    width: 65,
    height: 65,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textRegister: {
    color: 'black',
    fontSize: 32,
    bottom: '10px'
  },

  // Modal
  headerModal: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    height: 65,
    backgroundColor: "#5F8CB8",
    alignItems: 'center'
  },
  titleModal: {
    color: 'white',
    fontSize: 18
  },
  closeBtnModal: {
    padding: 5
  },
  bodyFormClients: {
    padding: 15,
    flex: 1
  },
  formControl: {
    marginTop: 15
  },
  inputTitle: {
    color: '#3e6082',
    fontWeight: 'bold'
  },
  inputText: {
    borderWidth: 1,
    height: 35,
    borderRadius: 10,
    paddingLeft: 8
  },
  btnSaveData: {
    position: 'absolute',
    bottom: 25,
    backgroundColor: '#5F8CB8',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center', 
    borderRadius: 30
  },
  textBtnSave: {
    color: 'white'
  }
});