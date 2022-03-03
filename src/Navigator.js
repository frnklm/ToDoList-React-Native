import React from 'react';
import { createAppContainer, createSwitchNavigator,  } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import ToDoList from './screens/ToDoList';
import Auth from './screens/Auth';

// const menuNavigator = createDrawerNavigator(menuRoutes)

const menuRoutes = {
    Today: {
        name: 'Today',
        screen: props => <ToDoList title='Hoje' daysAhead={0} {...props} />,
        navigationOptions: {
            title: 'Hoje'
        }
    },
    Tomorrow: {
        name: 'Tomorrow',
        screen: props => <ToDoList title='Amanhã' daysAhead={1} {...props} />,
        navigationOptions: {
            title: 'Amanhã'
        }
    },
    week: {
        name: 'week',
        screen: props => <ToDoList title='semana' daysAhead={7} {...props} />,
        navigationOptions: {
            title: 'semana'
        }
    },
    Month: {
        name: 'Month',
        screen: props => <ToDoList title='Mês' daysAhead={30} {...props} />,
        navigationOptions: {
            title: 'Mês'
        }
    },
}
                            


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