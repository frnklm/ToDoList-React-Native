import { Alert } from 'react-native'

const server = 'http://10.0.2.2:3000'

function showError(err) {
    Alert.alert('Deu ruim', `Mensagem: ${err}`)
}

export { server, showError }