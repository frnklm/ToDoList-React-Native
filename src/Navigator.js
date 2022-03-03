
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import ToDoList from './screens/ToDoList';
import Auth from './screens/Auth';

//seta o nome das rotas, seta a rota colocando o nome (string) e a referencia para a tela(nome da classe)
const mainRoutes = {
    Auth: {
        name: 'Auth',
        screen: Auth,
    },
    Home: {
        name: 'Home',
        screen: ToDoList
    }
}

//cria um metodo de qualquer nome, que recebe createSwitchNavigator que tem por parametro o metodo das rotas acima
//passe entre chave a rota inicial
const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'Auth'
})

//exportar a classe para ser indexada no index.js
export default createAppContainer(mainNavigator)