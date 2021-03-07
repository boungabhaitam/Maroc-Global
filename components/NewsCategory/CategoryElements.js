import styled from "styled-components/native";

export const CategoryContainer = styled.View`
    flex: 0.9;
    flex-direction: column;
    background-color: ${props => props.theme === 'light' ? 'white' : '#222831'}; 
    margin-top: 3%;
`

export const CatRow = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`

export const ButtonContainer = styled.TouchableOpacity`
    
    ${props => props.theme === 'light' && `

    background-color: ${props.id === props.highlited ? '#333333' : 'white'};  

`};
${props => props.theme === 'dark' && `

    background-color: ${props.id === props.highlited ? '#ececec' : '#222831'};  

`};

  
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    height: 81%;
    width: auto;
    padding-right:6%;
    padding-left: 6%;
`

export const TextCat = styled.Text`
${props => props.theme === 'light' && `
    color: ${props.id === props.highlited ? 'white' : '#333333'};
    `};

    ${props => props.theme === 'dark' && `
    color: ${props.id === props.highlited ? '#222831' : '#ececec'};
    `};
`