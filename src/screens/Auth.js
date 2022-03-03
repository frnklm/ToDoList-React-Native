import React, { Component } from 'react';
import { ImageBackground, Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import backgroundImage from '../../assets/imgs/login.jpg';
import commonStyles from '../commonStyles';
import AuthInput from '../components/AuthInput';
import { server, showError, showSuccess } from '../common';
import axios from 'axios';

const initialState = {
    name: '',
    email: 'teste@teste.com',
    password: '123456',
    confirmPassword: '',
    stageNewUser: false,
}

export default class Auth extends Component {

    state = {
        ...initialState
    }

    //Metodo para alterar propriedade do botão entrar/registrar
    singInOrSingUp = () => {
        if (this.state.stageNewUser) {
            this.singup()
        } else {
            this.signin()
        }
    }

    singup = async () => {
        try {
            await axios.post(`${server}/singup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            })
            showSuccess('Usuário cadastrado')
            this.setState({ ...initialState })
        } catch (e) {
            showError(e)
        }
    }

    //Metodo para fazer login
    //recebe email e senha. salva o post no res. quando valida recebe a res e coloca o token na tag authorization
    signin = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password,
            })
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            this.props.navigation.navigate('Home')
        } catch (e) {
            showError(e)
        }
    }

    //TextInput: placeholde funciona como hint text, vai receber o valor email setado já no state, quando em onChange 
    //a chave email recebe o valor e seta no state de email para o texto digitado. Funciona igual para o password
    //abaixo do formContainer, se o estado for verdadeiro para novo usuário vai aparecer na tela o campo para coloar o nome
    //TouchbleOpacity1 para cirar o botão. Possui condicional para alterar nome do botão. Recebe a função SingInOrSingUp
    //TouchbleOpacity2 botão responsável por alterar o estado da tela para singin ou singup
    render() {
        const validations = []

        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6)

        if (this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim())
            validations.push(this.state.confirmPassword)
            validations.push(this.state.password === this.state.confirmPassword)
        }

        return (
            <ImageBackground source={backgroundImage}
                style={styles.background}>
                <Text style={styles.title}>To Do List</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subTitle}>
                        {this.state.stageNewUser ? 'Crie sua conta' : 'Informe seus dados'}
                    </Text>
                    {this.state.stageNewUser &&
                        <AuthInput icon='user' placeholder='Nome' value={this.state.name} style={styles.input}
                            onChangeText={name => this.setState({ name })} />
                    }
                    <AuthInput icon='at' placeholder='Email' value={this.state.email} style={styles.input}
                        onChangeText={email => this.setState({ email })} />
                    <AuthInput icon='lock' placeholder='Senha' value={this.state.password} style={styles.input}
                        secureTextEntry={true}
                        onChangeText={password => this.setState({ password })} />
                    {this.state.stageNewUser &&
                        <AuthInput icon='asterisk'
                            placeholder='Confirmar senha' value={this.state.confirmPassword} style={styles.input}
                            secureTextEntry={true}
                            onChangeText={confirmPassword => this.setState({ confirmPassword })} />
                    }
                    <TouchableOpacity onPress={this.singInOrSingUp}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNewUser ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ padding: 10 }}
                    onPress={
                        () => this.setState({ stageNewUser: !this.state.stageNewUser })
                    }>
                    <Text style={styles.buttonText}>
                        {this.state.stageNewUser ? 'Já possui cadastro?' : 'Não possui conta?'}
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10,
    },
    subTitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 10,
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 20,
        width: '90%',
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 18,
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 17,
        fontWeight: 'bold'
    },
})
