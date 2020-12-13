import { StyleSheet} from 'react-native';

const mainStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#fff',
    },
})

const inputStyles = StyleSheet.create({
    inputField: {
        borderWidth: 1,
        backgroundColor: "whitesmoke",
        marginBottom: 10,
        padding: 10
    }
})

export { mainStyles, inputStyles }