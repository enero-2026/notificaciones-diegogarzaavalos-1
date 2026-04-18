import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    cargarContador();
  }, []);

  useEffect(() => {
    guardarContador(contador);
  }, [contador]);

  const pedirPermiso = async () => {
    await Notifications.requestPermissionsAsync();
  };

  const enviarNotificacion = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hola, mundo 🌍",
        body: `Esta es tu primera notificación. Contador: ${contador}`,
      },
      trigger: null,
    });
  };

  const incrementar = () => {
    setContador(contador + 1);
  };

  const guardarContador = async (valor) => {
    try {
      await AsyncStorage.setItem("contador", JSON.stringify(valor));
    } catch (e) {
      console.log("Error guardando");
    }
  };

  const cargarContador = async () => {
    try {
      const data = await AsyncStorage.getItem("contador");
      if (data !== null) {
        setContador(JSON.parse(data));
      }
    } catch (e) {
      console.log("Error cargando");
    }
  };

  return (
    <View style={{ marginTop: 50 }}>
      <Text>Notificaciones</Text>
      <Button title="Pedir permiso" onPress={pedirPermiso} />
      <Button title="Enviar notificación" onPress={enviarNotificacion} />
      <Text style={{ fontSize: 20 }}>
        Contador: {contador}
      </Text>
      <Button title="Incrementar" onPress={incrementar} />
    </View>
  );
}
