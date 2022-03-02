import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import commonStyles from '../commonStyles';
import moment from 'moment';
import 'moment/locale/pt-br';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome'

//componente funcional que retorna jsx
//toda view é um flex container, ele possui flex items
export default props => {

    //Metodo para riscar a tarefa quando concluida
    const doneOrNotStyle = props.doneAt != null ?
        { textDecorationLine: 'line-through' } : {}

    //Metodo de formatação da data
    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formatedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

    //metodo para criar o botão do swipe da direta
    const getRightContent = () => {
        return (
            
            <TouchableOpacity style={styles.right}
            onPress={() => props.onDelete && props.onDelete(props.id)}>
                <Icon name='trash' size={30} color='#FFF'/>
            </TouchableOpacity>
        )
    }

    //metodo para cirar o botão do swipe da esquerda
    const getLefttContent = () => {
        return (    
            <View style={styles.left}>
                <Icon name='trash' size={20} color='#FFF'
                style={styles.leftIcon}/>
                <Text style={styles.removeText}>Excluir</Text>
            </View>
        )
    }

    //render da classe
    return (  
        <Swipeable renderRightActions={getRightContent}
        renderLeftActions={getLefttContent}
        onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}>
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
                <View style={styles.checkContainer}>
                    {getCheckView(props.doneAt)}
                    <Icon name='check' size={20} color='#FFF' />
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={styles.description, doneOrNotStyle}>{props.description}</Text>
                <Text style={styles.date}>{formatedDate}</Text>
            </View>
        </View>
        </Swipeable>
    )

}

//função para o preenchimento da bolinha do check
function getCheckView(doneAt) {
    if (doneAt != null) {
        return (
            <View style={styles.done}>
                <Icon name='check' size={20} color='#FFF' />
            </View>
        )
    } else {
        return (
            <View style={styles.pending}></View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFF'
    },
    checkContainer: {
        width: "20%",
        alignItems: 'center',
        justifyContent: 'center',
        top: 10,
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555',
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center',

    },
    description: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15,
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12,
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    left: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center'
    },
    removeText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        margin: 10,
    },
    leftIcon: {
        marginLeft: 10,
    }
})