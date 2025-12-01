import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import AtualizarScreen from "./src/screens/AtualizarScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AddAppScreen from "./src/screens/AddAppScreen";
import ListarScreen from "./src/screens/ListarScreen";
import {useState} from "react";

const Tab = createBottomTabNavigator();

const App = () => {
  const [apps, setApps] = useState([{
     id: 0,
     nome: "Heiter",
     tamanho: 2,
     descricao: "MB",
     empresaDesenvolvedora: "Jeferson",
     versao: 1.0
  }]);

  
  const addApp = (app) => {
    setApps([...apps, app]);
  }

  const atualizarApp = (appAtualizado) => {
   setApps(apps.map((app) => app.id === appAtualizado.id ? appAtualizado : app))
  }
  
  const deleteApp = (appId) => {
    setApps(apps.filter((app) => app.id !== appId));
    Toast.show({
      type: 'success',
      text1: 'Sucesso!',
      text2: 'App deletado com sucesso!',
      visibilityTime: 4000, // Fica visível por 4 segundos
    });
  }

  // const toastConfig = {
  //   /* Configuração para SUCESSO (Verde) */
  //   success: (props) => (
  //     <BaseToast
  //       {...props}
  //       style={{ 
  //         borderLeftColor: '#69C779', 
  //         height: 90, // AUMENTA A ALTURA DA CAIXA
  //         width: '90%' // AUMENTA A LARGURA
  //       }}
  //       contentContainerStyle={{ paddingHorizontal: 15 }}
  //       text1Style={{
  //         fontSize: 20, // AUMENTA O TÍTULO (Ex: "Sucesso")
  //         fontWeight: 'bold'
  //       }}
  //       text2Style={{
  //         fontSize: 16, // AUMENTA A MENSAGEM (Ex: "App salvo")
  //         color: '#555'
  //       }}
  //     />
  //   ),

  //   /* Configuração para ERRO (Vermelho/Laranja) - O do seu print */
  //   error: (props) => (
  //     <ErrorToast
  //       {...props}
  //       style={{ 
  //         borderLeftColor: '#FE6301', 
  //         height: 90, // CAIXA MAIOR
  //         width: '90%'
  //       }}
  //       text1Style={{
  //         fontSize: 20, // TÍTULO MAIOR
  //         fontWeight: 'bold'
  //       }}
  //       text2Style={{
  //         fontSize: 16 // MENSAGEM MAIOR
  //       }}
  //     />
  //   )
  // };
  
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
