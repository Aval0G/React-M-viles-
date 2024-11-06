import { View} from "react-native";
import styled from "styled-components";

const MainContainer = styled(View)`
flex: 1;
align-items: center;
background-color: #F5FCFF;
flex-direction: row;
`

const box= styled(View)`
width: 150px;
height: 200px;
background-color: black;
`

const RedView = styled(box)`
background-color: red;
`

const GreenView = styled(box)`
flex: 1;
background-color: green;
`

const BlueView = styled(box)`
background-color: blue;
`

export default function Index() {
return (
<MainContainer>
<RedView />
<GreenView />
<BlueView />
</MainContainer>
);
}