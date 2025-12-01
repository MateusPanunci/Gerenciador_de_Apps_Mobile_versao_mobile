import { View, Text, TextInput, Pressable, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles";
import Toast from 'react-native-toast-message';

import { useState, useEffect } from "react";
import {Picker} from "@react-native-picker/picker";

const AtualizarApp = ({ route, navigation, atualizarApp }) => {
  const appDesatualizado = route.params?.app;
  
  const [app, setApp] = useState({
    nome: appDesatualizado.nome,
    tamanho: appDesatualizado.tamanho,
    descricao: appDesatualizado.descricao,
    unidadeTamanho: appDesatualizado.unidadeTamanho,
    empresaDesenvolvedora: appDesatualizado.empresaDesenvolvedora,
    versao: appDesatualizado.versao,
  });

  useEffect(() => {
    if (route.params?.app) {
      const novoApp = route.params.app;
      setApp({
        nome: novoApp.nome,
        tamanho: novoApp.tamanho,
        descricao: novoApp.descricao,
        unidadeTamanho: novoApp.unidadeTamanho,
        empresaDesenvolvedora: novoApp.empresaDesenvolvedora,
        versao: novoApp.versao,
      });
    }
  }, [route.params]);

  
  const changeText = (key, valor) => {
    // Se for campo numérico, remove tudo que não for número ou ponto
    if (key === 'tamanho' || key === 'versao') {
        valor = valor.replace(/[^0-9.]/g, '');
        valor = valor.replace(",", ".");
    }
    setApp({...app, [key]: valor})
  }

  
  const saveApp = () => {
    if (app.nome === ""){
      Toast.show({
        type: 'error',
        text1: 'Campo Obrigatório',
        text2: 'Preencha o nome do App!'
      });
      return;
    }
    else if (app.tamanho === 0.0){
      Toast.show({
        type: 'error',
        text1: 'Campo Obrigatório',
        text2: 'Insira o tamanho do App!' 
      });
      return;
    }
    else if (app.empresaDesenvolvedora === ""){
      Toast.show({
        type: 'error',
        text1: 'Campo Obrigatório',
        text2: 'Preencha a empresa desenvolvedora do App!'
      });
      return;
    }
    else if (app.versao === 0.0){
      Toast.show({
        type: 'error',
        text1: 'Campo Obrigatório',
        text2: 'Insira a versão do App!'
      });
      return;
    }

    const appAtualizado = {
      id: appDesatualizado.id,
      nome: app.nome,
      tamanho: parseFloat(app.tamanho),
      descricao: app.descricao,
      unidadeTamanho: app.unidadeTamanho,
      empresaDesenvolvedora: app.empresaDesenvolvedora,
      versao: parseFloat(app.versao) 
    }

    atualizarApp(appAtualizado);

    Toast.show({
      type: 'success',
      text1: 'Sucesso!',
      text2: 'App atualizado corretamente.',
      visibilityTime: 4000, // Fica visível por 4 segundos
    });
    
    navigation.navigate("Listar Apps");
    
  }



  return(
      <SafeAreaView style={styles.safeArea}>
          <ScrollView 
            contentContainerStyle={styles.container} 
          >
            <Text style={styles.title}>Atualizar Aplicativo</Text>
            <View style={styles.label}>
                <Text style={styles.labelText}>Nome do App</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nome do App"
                  onChangeText={(val) => changeText('nome', val)}
                  value= {app.nome}
                />
            </View>
      
            <View style={styles.label}>
                <Text style={styles.labelText}>Tamanho do App</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Tamanho do App"
                  keyboardType="decimal-pad"
                  onChangeText={(val) => changeText('tamanho', val)}
                  value= {String(app.tamanho)}
                />
            </View>
      
            <View style={styles.label}>
                <Text style={styles.labelText}>Unidade</Text>
                <Picker style={styles.input}
                        selectedValue={app.unidadeTamanho}
                        onValueChange={(valor) => changeText('unidadeTamanho', valor)}>
                        <Picker.Item label="KB" value="KB" />
                        <Picker.Item label="MB" value="MB" />
                        <Picker.Item label="GB" value="GB" />
                        <Picker.Item label="TB" value="TB" /> 
                 </Picker>
            </View>
      
            <View style={styles.label}>
                <Text style={styles.labelText}>Descrição</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Descrição"
                  onChangeText={(val) => changeText('descricao', val)}
                  value= {app.descricao}
                />
            </View>
      
            <View style={styles.label}>
                <Text style={styles.labelText}>Empresa Desenvolvedora</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Empresa Desenvolvedora"
                  onChangeText={(val) => changeText('empresaDesenvolvedora', val)}
                  value= {app.empresaDesenvolvedora}
                />
            </View>
      
            <View style={styles.label}>
                <Text style={styles.labelText}>Versão</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Versão (ex: 1.0)"
                  keyboardType="decimal-pad"
                  onChangeText={(val) => changeText('versao', val)}
                  value= {String(app.versao)}
                />
            </View>
      
            <Pressable onPress={() => saveApp()}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Atualizar App</Text>
                </View>
            </Pressable>
        </ScrollView>
    </SafeAreaView>
  );
}

export default AtualizarApp