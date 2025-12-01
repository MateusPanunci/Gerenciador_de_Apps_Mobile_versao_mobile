import { View, Text, TextInput, Pressable, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles";
import Toast from 'react-native-toast-message';

import { useNavigation } from "@react-navigation/native";
import * as Random from "expo-crypto";
import { useState } from "react"
import {Picker} from "@react-native-picker/picker";

const AddApp = ({ addApp }) => {
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [app, setApp] = useState({
    nome: "",
    tamanho: 0,
    descricao: "",
    unidadeTamanho: "MB",
    empresaDesenvolvedora: "",
    versao: 0.0,
  });

  const changeText = (key, valor) => {
    // Se for campo numérico, remove tudo que não for número ou ponto
    if (key === 'tamanho' || key === 'versao') {
        valor = valor.replace(/[^0-9.]/g, '');
        valor = valor.replace(",", ".");
    }
    setApp({...app, [key]: valor})
  }

  const saveApp = async () => {
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
    
    const novoApp = {
      // id: String(Random.getRandomBytes(8)), // (banco já gera automaticamente)
      nome: app.nome,
      tamanho: parseFloat(app.tamanho),
      descricao: app.descricao,
      unidadeTamanho: app.unidadeTamanho,
      empresaDesenvolvedora: app.empresaDesenvolvedora,
      versao: parseFloat(app.versao) 
    }

    //Limpa erros antigos
    setErrors({});

    const resultado = await addApp(novoApp);

    if (resultado && resultado.success) {
       navigation.navigate("Listar Apps");
       setApp({
            nome: "",
            tamanho: 0,
            descricao: "",
            unidadeTamanho: "MB",
            empresaDesenvolvedora: "",
            versao: 0.0,
            })
        
      Toast.show({
            type: 'success',
            text1: 'Sucesso!',
            text2: 'App adicionado corretamente.',
            visibilityTime: 3000, // Fica visível por 3 segundos
            });
    
    } else if (resultado && resultado.errors) {
       setErrors(resultado.errors); 
    }
  }
    

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Adicionar Aplicativo</Text>
        <View style={styles.label}>
          <Text style={styles.labelText}>Nome do App</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do App"
            onChangeText={(val) => changeText("nome", val)}
            value={app.nome}
          />
          {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}
        </View>

        <View style={styles.label}>
          <Text style={styles.labelText}>Tamanho do App</Text>
          <TextInput
            style={styles.input}
            placeholder="Tamanho do App"
            keyboardType="decimal-pad"
            onChangeText={(val) => changeText("tamanho", val)}
            value={app.tamanho}
          />
          {errors.tamanho && (
            <Text style={styles.errorText}>{errors.tamanho}</Text>
          )}
        </View>

        <View style={styles.label}>
          <Text style={styles.labelText}>Unidade</Text>
          <Picker
            style={styles.input}
            selectedValue={app.unidadeTamanho}
            onValueChange={(valor) => changeText("unidadeTamanho", valor)}
          >
            <Picker.Item label="KB" value="KB" />
            <Picker.Item label="MB" value="MB" />
            <Picker.Item label="GB" value="GB" />
            <Picker.Item label="TB" value="TB" />
          </Picker>
          {errors.unidadeTamanho && (
            <Text style={styles.errorText}>{errors.unidadeTamanho}</Text>
          )}
        </View>

        <View style={styles.label}>
          <Text style={styles.labelText}>Descrição</Text>
          <TextInput
            style={styles.input}
            placeholder="Descrição (Opcional)"
            onChangeText={(val) => changeText("descricao", val)}
            value={app.descricao}
          />
          {errors.desctricao && (
            <Text style={styles.errorText}>{errors.desctricao}</Text>
          )}
        </View>

        <View style={styles.label}>
          <Text style={styles.labelText}>Desenvolvedora</Text>
          <TextInput
            style={styles.input}
            placeholder="Empresa Desenvolvedora"
            onChangeText={(val) => changeText("empresaDesenvolvedora", val)}
            value={app.empresaDesenvolvedora}
          />
          {errors.empresaDesenvolvedora && (
            <Text style={styles.errorText}>{errors.empresaDesenvolvedora}</Text>
          )}
        </View>

        <View style={styles.label}>
          <Text style={styles.labelText}>Versão</Text>
          <TextInput
            style={styles.input}
            placeholder="Versão (ex: 1.0)"
            keyboardType="decimal-pad"
            onChangeText={(val) => changeText("versao", val)}
            value={app.versao}
          />
          {errors.versao && (
            <Text style={styles.errorText}>{errors.versao}</Text>
          )}
        </View>

        <Pressable onPress={() => saveApp()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Adicionar App</Text>
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddApp;