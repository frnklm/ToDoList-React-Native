import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform, Alert } from 'react-native';
import commonStyles from '../commonStyles';
import Task from '../components/Task';
import AddTask from './AddTask';
import todayImage from '../../assets/imgs/today.jpg';
import moment from 'moment';
import 'moment/locale/pt-br';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ToDoList extends Component {
    //state criado para a lista de tasks
    state = {
        showDoneTasks: true,
        showAddTask: false,
        visibleTasks: [],

        tasks: [{
            id: Math.random(),
            description: 'Comprar livro',
            estimateAt: new Date(),
            doneAt: new Date(),
        },
        {
            id: Math.random(),
            description: 'Ler livro',
            estimateAt: new Date(),
            doneAt: null,
        }]
    }

    //metodo de ciclo de vida de componente
    componentDidMount = () => {
        this.filterTasks()
    }

    //função para alterar o estado da task entre aberto e concluido
    //criar uma copia do array tasks e percorre cada item no foreach
    //procura cada task que possui os ids iguais, se tiver vazio continua, se não tiver recebe nova data
    toggleTask = taskId => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if (task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        //seta o novo objeto na tela
        this.setState({ tasks }, this.filterTasks)
    }

    //método para aleterar botão do filtro
    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    //método do filtro
    //se  showDoneTasks for verdadeiro cria uma copia de tasks e poe no array
    //pending recebe uma taks quando ela for igual a null
    //os items pending serão filtrados no filter da função const
    filterTasks = () => {
        let visibleTasks = null
        if(this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }
        this.setState({visibleTasks})
    }

    addTask = newTask => {
        if(!newTask.description || !newTask.description.trim()){
            Alert.alert('Dados Inválidos', 'Descrição inválida')
            return
        }
        const tasks = [...this.state.tasks]
        tasks.push({
            id: Math.random(),
            description: newTask.description,
            estimateAt: newTask.date,
            doneAt: null,
        })
        this.setState({tasks, showAddTask: false}, this.filterTasks)
    }

    //metodo para deletar tarefas
    deleteTask = id => {
        const tasks = this.state.tasks.filter(task => task.id !== id)
        this.setState({ tasks }, this.filterTasks)
    }

    render() {
        // today recebe o moment com local pt-br e no formato de data no padrão descrito
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        //data recebe os items criados no state
        //keyExtractor fica resposável por gerar uma chave por cada item da lista, recebe o item como parametro e retorna o item.id como string
        //renderItem cria a lista baseado em cada item da tasklist, pega todos os obejots e poe numa lista jsx
        //toggleTask eh chamada quando eh clidado no {checkContainer} que esta no componente task que foi envolto do TouchableWithoutFeedeback passando o id do elemento
        //touchbleOpacity seta o estado de showAddTask para true fazendo com que o modal de AddTask seja chamado
        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask}
                onCancel={() => this.setState({showAddTask: false})}
                onSave={this.addTask} />
                <ImageBackground source={todayImage}
                    style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                size={20}
                                color={commonStyles.colors.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subTitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.toDoList}>
                    <FlatList data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask}  onDelete={this.deleteTask}/>} />
                </View>
                <TouchableOpacity style={styles.addButton}
                activeOpacity={0.7}
                onPress={() => this.setState({showAddTask: true})}>
                    <Icon name='plus' size={20} color={commonStyles.colors.secondary} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        //permite que o container "cresca" e ocupe a tela inteira
        //container ocupa toda a tela e nele estão os children background e toDoList
        flex: 1,
    },
    background: {
        //prop background ocupa 30% da tela
        flex: 3,
    },
    toDoList: {
        //prop toDoList ocupada 70% da tela
        flex: 7,
    },
    titleBar: {
        //como só há um elemento dentro do componente do background da pra por o flex em 1
        //se houvesse mais de um elemento teria que fazer as propoções e adequar
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20,
    },
    subTitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 40 : 10,
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center',
    },
})