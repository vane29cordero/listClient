import { StyleSheet, View, Text } from "react-native";

export default function CardListClient({ nombre, edad, direccion }) {
    return (
        <View style={styles.contenedorList}>
            <Text style={styles.textInfo}> <Text style={styles.label}>Nombre:</Text> {nombre} </Text>
            <Text style={styles.textInfo}> <Text style={styles.label}>Edad:</Text> {edad} </Text>
            <Text style={styles.textInfo}> <Text style={styles.label}>Dirección:</Text> {direccion} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedorList: {
        backgroundColor: '#D1E2F0',
        borderRadius: '10px',
        padding: '10px',
        marginBottom: '10px',
        borderWidth: 1,
        borderColor: '#E2E8F0'
    },
    textInfo: {
        fontSize: '19px',
        color: '#1E293B',
        marginBottom: '16px'
    },
    label: {
        fontWeight: 'bold',
        color: '#475569'
    }
})