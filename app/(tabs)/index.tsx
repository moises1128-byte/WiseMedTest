import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  Text,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Corazon from "../../assets/images/svg/corazon.svg";
import BolsaClinica from "../../assets/images/svg/bolsaClinica.svg";
import Huesos from "../../assets/images/svg/huesos.svg";
import Face from "../../assets/images/svg/face.svg";

export default function HomeScreen() {
  const [emergencyKinds, setEmergencyKinds] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    fetch(
      "https://wisemed-interview.s3.us-east-2.amazonaws.com/react-native/emergency-kinds.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setEmergencyKinds(data.emergencyKinds);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f3edf7" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.subContainer}>
          <View style={{ width: 276 }}>
            <View style={styles.titleContainer}>
              <View
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <Text style={styles.title}>Traumatología</Text>
                <Text style={styles.subTitle}>Dr. José Pedro Sans</Text>
              </View>
              <Huesos width={50} height={50} />
            </View>

            <View style={styles.subTitleContainer}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <Face width={24} height={24} />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <Text style={styles.titleName}>Jorge Avendaño Pérez</Text>
                  <Text style={styles.titleName}>35 años</Text>
                </View>
              </View>
              <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                <Text style={styles.fichaText}>Ficha médica:</Text>
                <Text style={styles.fichaText2}>77884</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                <Text style={styles.fichaText}>Diagnóstico:</Text>
                <Text style={styles.fichaText2}>Calcificación Talón</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                <Text style={styles.fichaText}>Intervención:</Text>
                <Text style={styles.fichaText2}>Extirpación en talón</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                <Text style={styles.fichaText}>Evaluación preanestésica:</Text>
                <Text style={styles.fichaText2}>Sí</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                <Text style={styles.fichaText}>Tiempo de solicitud:</Text>
                <Text style={styles.fichaText2}>3 días</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                <Text style={styles.fichaText}>Suspensiones:</Text>
                <Text style={styles.fichaText2}>2</Text>
              </View>

              <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                <Corazon width={24} height={24} />
                <BolsaClinica width={24} height={24} />
              </View>

              <View
                style={{
                  borderColor: "#154FBF",
                  borderWidth: 1,
                  borderRadius: 6,
                  overflow: "hidden",
                }}
              >
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue) => setSelectedValue(itemValue)}
                  style={{
                    height: 50,
                  }}
                >
                  <Picker.Item label="Seleccionar" value="" />
                  {emergencyKinds.map((item, index) => {
                    return (
                      <Picker.Item
                        key={index}
                        label={item.name || "Nombre no disponible"}
                        value={item.name || ""}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },

  fichaText: {
    fontSize: 12,
    color: "#154FBF",
    fontFamily: "PoppinsRegular",
  },
  fichaText2: {
    fontSize: 12,
    color: "#000000",
    fontFamily: "PoppinsRegular",
  },
  title: {
    fontSize: 16,
    color: "white",
    fontFamily: "PoppinsSemiBold",
  },
  subTitle: {
    fontSize: 12,
    color: "white",
    fontFamily: "PoppinsSemiBold",
  },
  titleName: {
    fontSize: 14,
    color: "#000000",
    fontFamily: "PoppinsMedium",
  },
  titleContainer: {
    backgroundColor: "#154FBF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  subTitleContainer: {
    paddingTop: 16,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 16,
  },
  subContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "#154FBF",
    borderWidth: 1,
  },
});
