import { useState } from "react";
import { View, Text, FlatList, TextInput, Pressable, Alert, Platform} from "react-native";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";

const ListarScreen = ({ appsList, deleteApp }) => {
    const navigation = useNavigation(); 
    const [searchText, setSearchText] = useState(''); 

    // Se searchText mudar, essa variável atualiza sozinha
    const filteredApps = appsList.filter((app) => 
        app.nome.toLowerCase().includes(searchText.toLowerCase())
    );

    const confirmarExclusao = (id) => {
        // Caso seja no navegador
        if (Platform.OS === 'web') {
            const confirmou = window.confirm("Tem certeza que deseja remover este aplicativo?");
            if (confirmou) {
                deleteApp(id);
            }
        } 
        // Caso seja no celular
        else {
            Alert.alert(
                "Excluir App", 
                "Tem certeza que deseja remover este aplicativo permanentemente?", 
                [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Excluir", onPress: () => deleteApp(id) }
                ]
            );
        }
    };

    return (
      <View style={styles.container}>
        <View style={styles.searchBarBlock}>
          <TextInput
            style={styles.searchBar}
            placeholder="Pesquisar por nome do App"
            keyboardType="default"
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
          />
        </View>

        <Text style={styles.listTitle}>Lista de Aplicativos</Text>
        <FlatList
          data={filteredApps}
          keyExtractor={(item) => String(item.id)}
          style={styles.flatList}
          ListEmptyComponent={() => (
            <Text style={styles.listEmpty}>Nenhum app encontrado.</Text>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}

          renderItem={({ item }) => (
            <View style={styles.appView}>
              <Text style={styles.listText}>
                Nome: <Text style={styles.appAttribute}>{item.nome}</Text>
              </Text>

              <Text style={styles.listText}>
                Tamanho:{" "}
                <Text style={styles.appAttribute}>
                  {item.tamanho} {item.unidadeTamanho}
                </Text>
              </Text>

              <Text style={styles.listText}>
                Descrição: {/* Se não tiver descrição, mostra "N/A" */}
                <Text style={styles.appAttribute}>
                  {!item.descricao ? "N/A" : item.descricao}
                </Text>
              </Text>

              <Text style={styles.listText}>
                Desenvolvedora:{" "}
                <Text style={styles.appAttribute}>
                  {item.empresaDesenvolvedora}
                </Text>
              </Text>

              <Text style={styles.listText}>
                Versão: <Text style={styles.appAttribute}>{item.versao}</Text>
              </Text>

              <Pressable onPress={() => confirmarExclusao(item.id)}>
                <View style={styles.DeleteButton}>
                  <Text style={styles.buttonText}>Deletar App</Text>
                </View>
              </Pressable>

              <Pressable
                onPress={() => {
                  navigation.navigate("Editar App", { app: item });
                }}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Atualizar App</Text>
                </View>
              </Pressable>
            </View>
          )}
        />
      </View>
    );
}

export default ListarScreen;