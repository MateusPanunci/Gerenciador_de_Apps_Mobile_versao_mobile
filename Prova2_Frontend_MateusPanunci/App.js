import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { API_URL } from "./src/config";
import Toast from 'react-native-toast-message';
import AtualizarScreen from "./src/screens/AtualizarScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AddAppScreen from "./src/screens/AddAppScreen";
import ListarScreen from "./src/screens/ListarScreen";
import {useState, useEffect } from "react";

const Tab = createBottomTabNavigator();


const App = () => {
  const [apps, setApps] = useState([]);

  const fetchApps = async () => {
    try {
      const response = await fetch(API_URL); // Chama o @GetMapping
      const data = await response.json();
      setApps(data); // Atualiza a lista com o que veio do banco
      
    //   console.log("Apps buscados:", data);  
    } catch (error) {
      console.error("Erro ao buscar:", error);
      Toast.show({ type: 'error', text1: 'Erro', text2: error });
    } 
  }

  // Este useEffect roda o fetchApps quando é criado o componente
  useEffect(() => {
    fetchApps();
  }, []);

  const addApp = async (novoApp) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST', // Chama o @PostMapping
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoApp), // Manda os dados
        });

        if (response.ok) {
            fetchApps(); // Recarrega a lista guardada no banco para ver o item novo
            console.log("ola");
            Toast.show({ type: 'success', text1: 'Sucesso', text2: 'App salvo no banco!' });
            return { success: true };
        } else {
            const errorData = await response.json();
            Toast.show({ type: "error", text1: "Erro", text2: "Verifique os campos." });        
            return { success: false, errors: errorData };
        }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Erro Fatal",
        text2: "Falha na conexão.",
      });
      return { success: false, errors: { general: "Erro de conexão" } };
    }
  }

  const atualizarApp = async (appAtualizado) => {
    try {
      await fetch(`${API_URL}/${appAtualizado.id}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appAtualizado),
      });

      fetchApps(); 
      Toast.show({ type: 'success', text1: 'Atualizado', text2: 'Dados alterados com sucesso.' });
    } catch (error) {
      console.error(error);
    }
  }

  const deleteApp = async (appId) => {
    try {
      await fetch(`${API_URL}/${appId}`, { 
        method: 'DELETE', 
      });

      fetchApps(); // 🔄 Recarrega a lista
      Toast.show({ type: 'success', text1: 'Removido', text2: 'App excluído do banco.' });
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <>
     <NavigationContainer>
       <Tab.Navigator screenOptions={{
           tabBarStyle: { backgroundColor: "#0B3510" }, // Verde escuro
           headerStyle: { backgroundColor: "#0B3510" },
           headerTintColor: '#fff', 
           justifyContent: "center",
           headerTitle: "Gerenciador de Apps Mobile",
           headerTitleStyle: {
               fontWeight: 'bold',
               fontSize: 22,
               color: "white",
               backgroundColor: "#D58513", // Laranja
               padding: 7,
               borderRadius: 10
           }
         }}
      >
         <Tab.Screen name="Home" component={HomeScreen} />
         <Tab.Screen name="Adicionar App">
             {() => <AddAppScreen addApp={addApp}/> }
         </Tab.Screen> 
         <Tab.Screen name="Listar Apps"> 
             {() => <ListarScreen appsList={apps} deleteApp={deleteApp}/>} 
         </Tab.Screen>
         <Tab.Screen
            name="Editar App" // Esse é o nome que usaremos no navigate
            options={{ 
              tabBarButton: () => null,
              tabBarItemStyle: { display: 'none' }
            }} 
         >
            {/* Passamos navigation e route para podermos pegar os dados depois */}
            {(props) =>  <AtualizarScreen {...props} atualizarApp={atualizarApp} />}
         </Tab.Screen>
       </Tab.Navigator>
     </NavigationContainer>
     <Toast/>
    </>
  );
}

export default App;
