import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from "react-native";
import { WebView } from "react-native-webview";

export default class App extends React.Component {
  state = {
    showModal: false,
    status: "Pending",
  };
  handleResponse = (data) => {
    if (data.title === "success") {
      this.setState({ showModal: false, status: "Complete" });
    } else if (data.title === "cancel") {
      this.setState({ showModal: false, status: "Cancelled" });
    } else {
      return;
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}
        >
          <WebView
            style={{ marginTop: 50 }}
            source={{ uri: "https://6da0-78-133-22-111.eu.ngrok.io" }}
            onNavigationStateChange={(data) => this.handleResponse(data)}
            injectedJavaScript={`document.f1.submit()`}
          />
        </Modal>
        <Image style={styles.image} source={require("./assets/paypal.png")} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => this.setState({ showModal: true })}>
            <Text style={styles.buttonText}>Pay with Paypal</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.status}>Payment Status: {this.state.status}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    width: 250,
    marginHorizontal: 10,
    marginVertical: 20,
    marginTop: 40,
    backgroundColor: "#1336DF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    textTransform: "uppercase",
    color: "white",
    fontSize: 17,
    fontFamily: "Helvetica",
    fontWeight: "bold",
  },
  container: {
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  status: {
    fontSize: 16,
    fontFamily: "Helvetica",
  },
  image: {
    marginTop: 200,
    height: 150,
    width: 150,
  },
});