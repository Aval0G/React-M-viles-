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

const BackButton = styled(Pressable)`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const TextS = styled(Text)`
  color: white;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
`;

function validacion(username: string, password: string, confirmPassword: string, email: string) {
  if (username.length === 0 || password.length === 0 || email.length === 0 || confirmPassword.length === 0) {
    return "Los campos no pueden estar vacíos";
  }
  if (username.length < 4) {
    return "El nombre de usuario debe tener al menos 4 caracteres";
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
  if (password !== confirmPassword) {
    return "Las contraseñas no coinciden";
  }
  return true;
}

const onPress = (username: string, email: string, password: string, confirmPassword: string, router: any) => {
  const resultadoValidacion = validacion(username, password, confirmPassword, email);
  if (resultadoValidacion !== true) {
    Alert.alert("Registro incorrecto", resultadoValidacion);
  } else {
    Alert.alert("Registro exitoso", "Ya puedes iniciar sesión");
    router.push({ pathname: "/" });
  }
};

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  return (
    <MainContainer>
      <BackButton onPress={() => router.push("/")}>
        <Text>{"< Volver al inicio"}</Text>
      </BackButton>

      <ImageS
        source={{
          uri: "https://th.bing.com/th/id/R.8d48511199982c190909eedc99275ebf?rik=b3WPp%2fnma%2bLCpw&pid=ImgRaw&r=0",
        }}
      />

      <TextInputS
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
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

      <TextInputS
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />

      <ButtonS onPress={() => onPress(username, email, password, confirmPassword, router)}>
        <TextS>Registrarse</TextS>
      </ButtonS>
    </MainContainer>
  );
}
