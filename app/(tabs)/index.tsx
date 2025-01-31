import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import Corazon from "../../assets/images/svg/corazon.svg";
import BolsaClinica from "../../assets/images/svg/bolsaClinica.svg";
import Huesos from "../../assets/images/svg/huesos.svg";
import Face from "../../assets/images/svg/face.svg";
import { Dropdown } from "react-native-element-dropdown";
import { Shadow } from "react-native-shadow-2";
import { Ficha_Paciente } from "@/utils/ficha-paciente";

type EmergencyKind = {
  id: string;
  name: string;
};

export default function HomeScreen() {
  const [emergencyKinds, setEmergencyKinds] = useState<EmergencyKind[]>([]);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    fetch(
      "https://wisemed-interview.s3.us-east-2.amazonaws.com/react-native/emergency-kinds.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setEmergencyKinds(data.emergencyKinds || []);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Shadow distance={5}>
          <View style={styles.Card}>
            <View style={{ width: 276 }}>
              <View style={styles.titleContainer}>
                <View style={styles.labelCardContainer}>
                  <Text style={styles.title}>Traumatología</Text>
                  <Text style={styles.subTitle}>Dr. José Pedro Sans</Text>
                </View>
                <Huesos width={50} height={50} />
              </View>

              <View style={styles.subTitleContainer}>
                {Ficha_Paciente.map((item, index) => (
                  <React.Fragment key={index}>
                    <View style={styles.rowContainer}>
                      <Face width={24} height={24} />
                      <View style={styles.nameContainer}>
                        <Text style={styles.titleName}>{item.nombre}</Text>
                        <Text style={styles.titleName}>{item.edad} años</Text>
                      </View>
                    </View>

                    <View style={styles.cardItem}>
                      <Text style={styles.fichaInputText}>Ficha médica:</Text>
                      <Text style={styles.itemTextInput}>
                        {item.fichaMedica}
                      </Text>
                    </View>

                    <View style={styles.cardItem}>
                      <Text style={styles.fichaInputText}>Diagnóstico:</Text>
                      <Text style={styles.itemTextInput}>
                        {item.diagnostico}
                      </Text>
                    </View>
                    <View style={styles.cardItem}>
                      <Text style={styles.fichaInputText}>Intervención:</Text>
                      <Text style={styles.itemTextInput}>
                        {item.intervencion}
                      </Text>
                    </View>
                    <View style={styles.cardItem}>
                      <Text style={styles.fichaInputText}>
                        Evaluación preanestésica:
                      </Text>
                      <Text style={styles.itemTextInput}>
                        {item.evaluacion}
                      </Text>
                    </View>
                    <View style={styles.cardItem}>
                      <Text style={styles.fichaInputText}>
                        Tiempo de solicitud:
                      </Text>
                      <Text style={styles.itemTextInput}>
                        {item.tiempo} días
                      </Text>
                    </View>
                    <View style={styles.cardItem}>
                      <Text style={styles.fichaInputText}>Suspensiones:</Text>
                      <Text style={styles.itemTextInput}>
                        {item.Suspension}
                      </Text>
                    </View>
                  </React.Fragment>
                ))}

                <View style={styles.rowContainer}>
                  <Corazon width={24} height={24} />
                  <BolsaClinica width={24} height={24} />
                </View>

                <View style={styles.dropdownContainer}>
                  <Text style={styles.label}>Tipo de Urgencia</Text>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.inputTxt}
                    selectedTextStyle={styles.inputTxt}
                    data={emergencyKinds.map((item) => ({
                      label: item.name || "Nombre no disponible",
                      value: item.name || "",
                    }))}
                    labelField="label"
                    valueField="value"
                    placeholder="Seleccionar"
                    iconColor={"#154FBF"}
                    value={selectedValue}
                    onChange={(item) => {
                      setSelectedValue(item.value);
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </Shadow>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3edf7" },
  subContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  labelCardContainer: { display: "flex", flexDirection: "column", gap: 10 },
  fichaInputText: {
    fontSize: 12,
    color: "#154FBF",
    fontFamily: "PoppinsRegular",
  },
  itemTextInput: {
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
    fontFamily: "PoppindsMedium",
  },
  titleContainer: {
    backgroundColor: "#154FBF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  subTitleContainer: {
    paddingTop: 16,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 16,
  },
  Card: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "#154FBF",
    borderWidth: 1,
  },
  dropdown: {
    height: 50,
    borderColor: "#154FBF",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  cardItem: { display: "flex", flexDirection: "row", gap: 5 },
  rowContainer: { display: "flex", flexDirection: "row", gap: 10 },
  nameContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  inputTxt: {
    fontSize: 16,
    color: "#719ec0",
    fontFamily: "PoppinsRegular",
  },
  label: {
    fontSize: 14,
    color: "#154FBF",
    fontFamily: "PoppindsMedium",
  },
  dropdownContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    paddingTop: 5,
  },
});
