import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  appView: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    backgroundColor: "white",
    margin: 20,
    padding: 10,
  },

  searchBarBlock: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#59799C", // Azul
    margin: 10,
    padding: 10,
  },

  errorText: {
    color: "#ff4444", // Vermelho
    fontSize: 14,
    marginLeft: 10,
    marginTop: 2,
    fontWeight: "bold",
  },

  searchBar: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "white",
    // margin: 10,
    padding: 10,
  },

  button: {
    height: 50,
    backgroundColor: "#D58513", // Laranja
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
  },

  DeleteButton: {
    height: 50,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
  },

  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "white",
  },

  listText: {
    fontSize: 20,
    marginBottom: 5,
    color: "#0B3510", // Verde Escuro
  },

  appAttribute: {
    fontSize: 20,
    marginBottom: 5,
    color: "#D58513", // Laranja
  },

  listEmpty: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    color: "white",
    backgroundColor: "#D58513", // Laranja
    padding: 50,
    borderRadius: 10,
    margin: 30,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 30,
    color: "white",
  },

  flatList: {
    backgroundColor: "transparent",
    borderRadius: 10,
    marginBottom: 140,
  },

  labelText: {
    marginBottom: 5,
    marginLeft: 10,
    color: "black",
    fontSize: 18,
  },

  picker: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "white",
    height: 50,
  },

  input: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "white",
    paddingHorizontal: 8,
    height: 55,
  },

  container: {
    backgroundColor: "#59799C", // Azul
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingBottom: 20,
  },

  textContainer: {
    backgroundColor: "#59799C", // Azul
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingBottom: 20,
  },

  safeArea: {
    flex: 1,
    backgroundColor: "#59799C",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  label: {
    width: "97%",
    marginBottom: 15,
    paddingHorizontal: 3,
    marginBottom: 20,
  },

  homeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    marginTop: 20,
    color: "white",
  },
 
});

export default styles;
