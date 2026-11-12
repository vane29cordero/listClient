import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Pressable, 
  Modal, 
  TextInput,
  Alert 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardListClient from '../components/listCardClients';

// Clave única para almacenar los datos en AsyncStorage
const STORAGE_KEY = '@clientsData';

export default function Main() {
  // 1. Estados principales
  const [listClients, setListClients] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);

  // Estados del formulario para nuevo cliente
  const [name, setNameClients] = useState('');
  const [age, setAgeClients] = useState('');
  const [location, setLocationClients] = useState('');

  // 2. Cargar datos almacenados al montar el componente
  useEffect(() => {
    obtenerData();
  }, []);

  // 3. Funciones para interactuar con AsyncStorage
  const obtenerData = async () => {
    try {
      let dataStorage = await AsyncStorage.getItem(STORAGE_KEY);
      // Soporte de compatibilidad en caso de registros previos guardados con otra clave
      if (!dataStorage) {
        dataStorage = await AsyncStorage.getItem('@clientesData');
      }

      if (dataStorage !== null) {
        const parsedData = JSON.parse(dataStorage);
        setListClients(Array.isArray(parsedData) ? parsedData : []);
      }
    } catch (error) {
      console.error('Error al obtener datos de AsyncStorage:', error);
      Alert.alert('Error', 'No se pudieron recuperar los clientes almacenados.');
    }
  };

  const saveDataClients = async () => {
    // Validación: asegurarse de que los campos no estén vacíos
    if (!name.trim() || !age.trim() || !location.trim()) {
      Alert.alert('Campos incompletos', 'Por favor complete todos los campos.');
      return;
    }

    try {
      const newClient = {
        id: Date.now().toString(),
        nombre: name.trim(),
        edad: age.trim(),
        direccion: location.trim(),
      };

      const newData = [...listClients, newClient];

      // Guardar en el almacenamiento local
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));

      // Actualizar el estado con la nueva lista
      setListClients(newData);

      // Limpiar campos y cerrar modal
      limpiarFormulario();
      setVisibleModal(false);
    } catch (error) {
      console.error('Error al guardar datos en AsyncStorage:', error);
      Alert.alert('Error', 'No se pudo guardar la información del cliente.');
    }
  };

  const limpiarFormulario = () => {
    setNameClients('');
    setAgeClients('');
    setLocationClients('');
  };

  const cerrarModal = () => {
    limpiarFormulario();
    setVisibleModal(false);
  };

  return (
    <View style={styles.contenedor}>
      <StatusBar style="light" />

      {/* Cabecera superior */}
      <View style={styles.header}>
        <Text style={styles.textHeader}>Lista Clientes</Text>
      </View>

      {/* Listado de clientes */}
      <View style={styles.contenedorList}>
        <FlatList
          data={listClients}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay datos registrados.</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <CardListClient
              nombre={item.nombre || item.name}
              edad={item.edad || item.age}
              direccion={item.direccion || item.location}
            />
          )}
        />
      </View>

      {/* Botón flotante para abrir el modal */}
      <Pressable
        onPress={() => setVisibleModal(true)}
        style={styles.newRegister}
      >
        <Text style={styles.textRegister}>+</Text>
      </Pressable>

      {/* Modal para registrar nuevo cliente */}
      <Modal
        visible={visibleModal}
        animationType="slide"
        onRequestClose={cerrarModal}
      >
        <View style={styles.modalContent}>
          {/* Header del Modal */}
          <View style={styles.headerModal}>
            <Text style={styles.titleModal}>Nuevo Cliente</Text>
            <Pressable
              onPress={cerrarModal}
              style={styles.closeBtnModal}
            >
              <Text style={styles.closeBtnText}>✕</Text>
            </Pressable>
          </View>

          {/* Formulario */}
          <View style={styles.bodyFormClients}>
            <View style={styles.formControl}>
              <Text style={styles.inputTitle}>Nombre Completo</Text>
              <TextInput
                style={styles.inputText}
                placeholder="Escriba su Nombre Completo"
                value={name}
                onChangeText={setNameClients}
              />
            </View>

            <View style={styles.formControl}>
              <Text style={styles.inputTitle}>Edad</Text>
              <TextInput
                style={styles.inputText}
                placeholder="Escriba su Edad"
                keyboardType="numeric"
                value={age}
                onChangeText={setAgeClients}
              />
            </View>

            <View style={styles.formControl}>
              <Text style={styles.inputTitle}>Dirección</Text>
              <TextInput
                style={styles.inputText}
                placeholder="Escriba su Dirección"
                value={location}
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
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    height: 70,
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7AB6E6',
  },
  textHeader: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contenedorList: {
    flex: 1,
    padding: 15,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#64748B',
    fontSize: 16,
  },
  newRegister: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#7AB6E6',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textRegister: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 36,
  },

  // Modal
  modalContent: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerModal: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 65,
    backgroundColor: '#5F8CB8',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleModal: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeBtnModal: {
    padding: 8,
  },
  closeBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bodyFormClients: {
    padding: 20,
    flex: 1,
  },
  formControl: {
    marginTop: 15,
  },
  inputTitle: {
    color: '#3E6082',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    height: 42,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  btnSaveData: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#5F8CB8',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
  },
  textBtnSave: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});