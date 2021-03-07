import styled from "styled-components/native";
import React from 'react';
import { View } from 'react-native'



export const Container = styled.View`
    flex: 1;
    background-color: ${props => props.theme === 'light' ? 'white' : '#222831'}; ;
`

export const NewsContainer = styled.View`
    flex:8;
`

export const News = styled.View`
    flex: 1;
    height: 360px;
    margin-bottom:12px;
    margin-top: 12px;
    padding: 20px;
`

export const TitleContainer = styled.View`
flex: 1;
justify-content: center;
padding: 0px;

`

export const Title = styled.Text`
    font-size: 16px;
    color: ${props => props.theme === 'light' ? '#333333' : '#ececec'};
    margin-left: 5%;
    margin-right: 5%;
`

export const Img = styled.Image`
    flex:2;
    width: 90%;
    border-radius: 3px;
`

export const ImgContainer = styled.View`
    flex:2;
    justify-content: center;
    align-items: center;
`

export const DescriptionContainer = styled.View`
flex: 1;
flex-direction: column;
justify-content: center;
background-color:${props => props.theme === 'light' ? 'white' : '#222831'} ;
padding: 0px;

`

export const Description = styled.Text`
    font-size: 12.5px;
    color: ${props => props.theme === 'light' ? '#706c61' : '#bebebe'} ;
    margin-left: 6%;
    margin-right: 6%;
    text-align: justify;
    
`

export const Loader = styled.View`
    background-color: white;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    align-items: center;
    justify-content: center;
`

export const ReadmoreContainer = styled.View`
flex: 0.45;
width: 95%;
justify-content: center;
align-items: flex-end;
padding: 0px;
`

export const Readmore = styled.TouchableOpacity`
background-color: ${props => props.theme === 'light' ? '#333333' : '#ececec'};
justify-content: center;
align-items: center;
border-radius: 10px;
height: 75%;
margin-top: 5%;
width: auto;
padding-right:6%;
padding-left: 6%;
`

export const ReadmoreText = styled.Text`
    color: ${props => props.theme === 'light' ? 'white' : '#222831'};
`

export const TopContainer = styled.View`
    flex:0.8;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color:  ${props => props.theme === 'light' ? 'white' : '#222831'};  /*heeeeeeeeeeeeeeeeeeeeeeeeeeeeere */
    padding-right: 2%;

`

export const ToggleContainer = styled.View`
    flex:0.14;
    height: 75%;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme === 'light' ? 'white' : '#222831'}     /*heeeeeeeeeeeeeeeeeeeeeeeeeeeeere */
`


export const FlatListItemSeparator = () => {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center'
        }}>
            <View
                style={{
                    height: 0.5,
                    width: "70%",
                    backgroundColor: "#dddddd",

                }}
            />
        </View>
    );
}