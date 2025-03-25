import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function FormVisita({ onSubmit, styles }) {
  const [vendedor, setVendedor] = useState("");
  const [viaticos, setViaticos] = useState("");
  const [nota, setNota] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [cliente, setCliente] = useState("");
  const [lugar, setLugar] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowDatePicker(false);
    setFecha(currentDate);
  };

  const handleSubmit = () => {
    onSubmit({
      vendedor,
      viaticos,
      nota,
      fecha,
      cliente,
      lugar,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Visita</Text>

      <Text style={styles.label}>Viáticos</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresar viáticos"
        value={viaticos}
        onChangeText={setViaticos}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Nota</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresar nota"
        value={nota}
        onChangeText={setNota}
      />

      <Text style={styles.label}>Fecha de la visita</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateInput}
      >
        <Text>{fecha.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresar cliente"
        value={cliente}
        onChangeText={setCliente}
      />

      <Text style={styles.label}>Lugar</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresar lugar"
        value={lugar}
        onChangeText={setLugar}
      />

      <Text style={styles.label}>Vendedor</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={vendedor}
          style={styles.picker}
          onValueChange={(itemValue) => setVendedor(itemValue)}
        >
          <Picker.Item label="Seleccionar vendedor" value="" />
          <Picker.Item label="Vendedor 1" value="vendedor1" />
          <Picker.Item label="Vendedor 2" value="vendedor2" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Crear Visita</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
