import { View, TextInput, Image, Pressable, Alert, Text } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "expo-router";

const MainContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #F5FCFF;
`;

const ImageS = styled(Image)`
  width: 150px;
  height: 150px;
  border-radius: 100px;
  margin-bottom: 20px;
`;

const TextInputS = styled(TextInput)`
  width: 300px;
  height: 50px;
  border: 1px solid #81D8D0;
  background-color: white;
  font-size: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ButtonS = styled(Pressable)`
  width: 300px;
  height: 50px;
  border-radius: 10px;
  background-color: #01796F;
  margin-top: 20px;
`;

const RegisterButton = styled(Pressable)`
  width: 300px;
  height: 50px;
  border-radius: 10px;
  background-color: #FFA500;
  margin-top: 20px;
`;

const TextS = styled(Text)`
  color: white;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
`;

function validacion(password: string, email: string) {
  if (password.length === 0 || email.length === 0) {
    return "Los campos no pueden estar vacíos";
  }
  if (password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres";
  }
  if (!password.match(/[A-Z]/)) {
    return "La contraseña debe tener al menos una letra mayúscula";
  }
  if (!password.match(/[\W]/)) {
    return "La contraseña debe tener al menos un caracter especial";
  }
  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    return "El email no es válido";
  }
  return true;
}

const onPress = (email: string, password: string) => {
  const resultadoValidacion = validacion(password, email);
  if (resultadoValidacion !== true) {
    Alert.alert("Inicio de sesión incorrecto", resultadoValidacion);
  } else {
    Alert.alert("Inicio de sesión correcto", "Ya puedes iniciar sesión");
  }
};

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <MainContainer>
      <ImageS
        source={{
          uri: "https://th.bing.com/th/id/R.8d48511199982c190909eedc99275ebf?rik=b3WPp%2fnma%2bLCpw&pid=ImgRaw&r=0",
        }}
        testID="icon-image"
      />
      <TextInputS
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInputS
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <ButtonS onPress={() => onPress(email, password)}>
        <TextS>Iniciar Sesión</TextS>
      </ButtonS>
      <RegisterButton onPress={() => router.push("/register")}>
        <TextS>Registrarse</TextS>
      </RegisterButton>
    </MainContainer>
  );
}
