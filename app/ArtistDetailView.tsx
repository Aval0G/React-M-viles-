import React from "react";
import { View, Text, Image, Button } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const Container = ({ children }: { children: React.ReactNode }) => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      padding: 20,
    }}
  >
    {children}
  </View>
);

const ArtistImage = ({ uri }: { uri: string }) => (
  <Image
    source={{ uri }}
    style={{
      width: 200,
      height: 200,
      borderRadius: 100,
      marginBottom: 20,
    }}
  />
);

const TextName = ({ children }: { children: React.ReactNode }) => (
  <Text
    style={{
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
    }}
  >
    {children}
  </Text>
);

const TextDetail = ({ children }: { children: React.ReactNode }) => (
  <Text
    style={{
      fontSize: 16,
      marginBottom: 5,
    }}
  >
    {children}
  </Text>
);

export default function ArtistDetailView() {
  const { id, name, image, listeners, mbid } = useLocalSearchParams();
  const router = useRouter();

  return (
    <Container>
      <ArtistImage uri={Array.isArray(image) ? image[0] : image} />
      <TextName>{name}</TextName>
      <TextDetail>ID: {id}</TextDetail>
      <TextDetail>Listeners: {listeners}</TextDetail>
      <TextDetail>MBID: {mbid}</TextDetail>
      <Button title="Back" onPress={() => router.back()} />
    </Container>
  );
}
