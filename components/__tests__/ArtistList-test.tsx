import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ArtistList from "@/components/ArtistList";
import { useRouter } from "expo-router";
import { Artist } from "@/types/artist";

// Mock de useRouter
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("ArtistList Component", () => {
  const mockArtists: Artist[] = [
    {
        id: 1,
        name: "Dios",
        image: "https://th.bing.com/th/id/R.55cb9162f1012df7eddc616b56eae382?rik=q5gmwij%2fRilFLg&riu=http%3a%2f%2f4.bp.blogspot.com%2f-HWG-BCL-ObY%2fUENr0FQhnrI%2fAAAAAAAAGFE%2fFGVWp8zEEPs%2fs1600%2falma.jpg&ehk=pgr2eqOkYoGh4tOOMq2aH4CX1tEzTOgOtTbrdSOEqbU%3d&risl=&pid=ImgRaw&r=0",
        listeners: 0,
        mbid: "54646546",
        url: "https://youtube.com/shorts/ibhGD080xAg?si=857V0hPZzqm-w9nw"
    },
    {
      id: 2,
      name: "Ed Macerick",
      image: "https://www.elheraldodechihuahua.com.mx/incoming/g6a3cf-edmaverickok.jpg/ALTERNATES/LANDSCAPE_1140/edmaverickok.jpg",
      listeners: 800000,
      mbid: "mbid-ed",
      url: "https://youtu.be/8-R62j8OOws?si=WaodUXiugKdoz-F1",
    },
  ];

  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders a list of artists", () => {
    const { getByTestId } = render(<ArtistList artists={mockArtists} />);
    mockArtists.forEach((artist) => {
      const artistBox = getByTestId(`artist-box-${artist.name}`);
      expect(artistBox).toBeTruthy();
    });
  });

  it("navigates to artist detail on artist press", () => {

    const { getByTestId } = render(<ArtistList artists={mockArtists} />);
    const artistBox = getByTestId(`artist-box-${mockArtists[0].name}`);
    fireEvent.press(artistBox);

    // Verifica que la navegación ocurrió con los parámetros correctos
    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/ArtistDetailView",
      params: {
        id: mockArtists[0].id,
        name: mockArtists[0].name,
        image: mockArtists[0].image,
        listeners: mockArtists[0].listeners,
        mbid: mockArtists[0].mbid,
        url: mockArtists[0].url,
      },
    });
  });
});
