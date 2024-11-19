import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ArtistDetailView from "@/app/ArtistDetailView";
import { useRouter, useLocalSearchParams } from "expo-router";

// Mock de Expo Router
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
  useLocalSearchParams: jest.fn(),
}));

describe("ArtistDetailView Component", () => {
  const mockRouterBack = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ back: mockRouterBack });
    (useLocalSearchParams as jest.Mock).mockReturnValue({
        id: 1,
        name: "Dios",
        image: "https://th.bing.com/th/id/R.55cb9162f1012df7eddc616b56eae382?rik=q5gmwij%2fRilFLg&riu=http%3a%2f%2f4.bp.blogspot.com%2f-HWG-BCL-ObY%2fUENr0FQhnrI%2fAAAAAAAAGFE%2fFGVWp8zEEPs%2fs1600%2falma.jpg&ehk=pgr2eqOkYoGh4tOOMq2aH4CX1tEzTOgOtTbrdSOEqbU%3d&risl=&pid=ImgRaw&r=0",
        listeners: 0,
        mbid: "54646546",
        url: "https://youtube.com/shorts/ibhGD080xAg?si=857V0hPZzqm-w9nw"
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders artist details correctly", () => {
    const { getByText} = render(<ArtistDetailView />);

    // Verifica que los detalles del artista están renderizados
    expect(getByText("Dios")).toBeTruthy();
    expect(getByText("ID: 1")).toBeTruthy();
    expect(getByText("Listeners: 0")).toBeTruthy();
    expect(getByText("MBID: 54646546")).toBeTruthy();
  });

  it("calls router.back on 'Back' button press", () => {
    const { getByText } = render(<ArtistDetailView />);

    // Simula el evento de presionar el botón "Back"
    fireEvent.press(getByText("Back"));

    // Verifica que router.back fue llamado
    expect(mockRouterBack).toHaveBeenCalledTimes(1);
  });
});
