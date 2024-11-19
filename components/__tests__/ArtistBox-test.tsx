import React from "react";
import { render } from "@testing-library/react-native";
import ArtistBox from "@/components/ArtistBox";
import { Artist } from "@/types/artist";

describe("ArtistBox Component", () => {
  const mockArtist: Artist = {
      id: 1,
      name: "Dios",
      image: "https://th.bing.com/th/id/R.55cb9162f1012df7eddc616b56eae382?rik=q5gmwij%2fRilFLg&riu=http%3a%2f%2f4.bp.blogspot.com%2f-HWG-BCL-ObY%2fUENr0FQhnrI%2fAAAAAAAAGFE%2fFGVWp8zEEPs%2fs1600%2falma.jpg&ehk=pgr2eqOkYoGh4tOOMq2aH4CX1tEzTOgOtTbrdSOEqbU%3d&risl=&pid=ImgRaw&r=0",
      listeners: 0,
      mbid: "",
      url: ""
  };

  it("renders the artist name", () => {
    const { getByText } = render(<ArtistBox artist={mockArtist} />);
    expect(getByText(mockArtist.name)).toBeTruthy();
  });

  it("renders the artist image", () => {
    const { getByTestId } = render(<ArtistBox artist={mockArtist} />);
    const image = getByTestId("artist-image");
    expect(image.props.source.uri).toBe(mockArtist.image);
  });
});
