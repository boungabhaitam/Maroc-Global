import React, { useEffect, useState } from 'react';
import { Container, NewsContainer, ToggleContainer, TopContainer } from './NewsListElements';
import { NewsFlatList } from './NewsFlatList'
import { ButtonContainer, CategoryContainer, CatRow, TextCat } from '../NewsCategory/CategoryElements';
import { SearchBar } from 'react-native-elements';
import { KeyboardAvoidingView } from 'react-native';
import Toggle from 'react-native-toggle-element';
import { Icon } from 'react-native-elements'
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';


//aaadded

import { useSelector, useDispatch } from 'react-redux';
import { setLight_theme, setDark_theme } from '../Redux/actions/theme_actions';

//aaaded



export const NewsList = () => {
    //aaaadded
    const theme = useSelector(state => state.theme);
    const dispatch = useDispatch();
    //aaadded

    console.log('refresh')
    const [category, setCategory] = useState('general')
    const [passedText, setPassedText] = useState('')
    const [searchedText, setSearchedText] = useState('')



    useEffect(() => {
        setSearchedText((searchedText) => searchedText = '')

    }, [passedText])


    const updateSearch = (text) => {
        setSearchedText((searchedText) => searchedText = text)
    }

    const reset = () => {
        console.log('CAAAAAAAAAAAAAAAAAALLLLLLLLLLLEEEEEEEEEEDDDDDDDD')
        setPassedText((passedText) => passedText = '')
    }

    const submitEditing = () => {
        if (searchedText.match(/^[a-zA-Z ]+$/) != null) {
            setPassedText((passedText) => passedText = searchedText)
            setCategory((category) => category = 'custom')
        } else {
            alert('Les caractères spécials sont interdits')
            setSearchedText((searchedText) => searchedText = '')
        }
    }

    const displayIcon = () => {
        if (theme === 'light') {
            return (
                <Icon
                    name='sun'
                    type='fontisto'
                    color='#ffd880'
                />
            )
        }
        else {
            return (

                <Icon
                    name='moon-sharp'
                    type='ionicon'
                    color='#ececec'
                />
            )
        }
    }



    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS == "ios" ? "padding" : "height"} enabled={false}>
            <Container theme={theme}>
                <TopContainer theme={theme}>
                    <SearchBar
                        placeholder="Chercher un sujet..."
                        onChangeText={updateSearch}
                        value={searchedText}
                        containerStyle={{ flex: 1, justifyContent: 'center', backgroundColor: (theme === 'light') ? 'transparent' : '#222831', borderBottomColor: 'transparent', borderTopColor: 'transparent' }}
                        inputContainerStyle={{ backgroundColor: '#ececec', height: '100%' }}
                        placeholderTextColor='#aaaaaa'
                        searchIcon={{ color: '#aaaaaa' }}
                        inputStyle={{ color: '#333333', fontSize: 16 }}
                        onSubmitEditing={submitEditing}
                    />
                    <ToggleContainer theme={theme}>
                        <TouchableOpacity onPress={() => {
                            console.log(theme)
                            theme === 'light' ? dispatch(setDark_theme()) : dispatch(setLight_theme())
                        }}
                            style={{ width: '85%', height: '85%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                            {displayIcon()}
                        </TouchableOpacity>

                    </ToggleContainer>
                </TopContainer>
                <CategoryContainer theme={theme}>
                    <CatRow>
                        <ButtonContainer theme={theme} activeOpacity={.8} id='general' highlited={category} onPress={() => setCategory((category) => category = 'general')}><TextCat theme={theme} id='general' highlited={category}>Top</TextCat></ButtonContainer>
                        <ButtonContainer theme={theme} activeOpacity={.8} id='business' highlited={category} onPress={() => setCategory((category) => category = 'business')}><TextCat theme={theme} id='business' highlited={category}>Business</TextCat></ButtonContainer>
                        <ButtonContainer theme={theme} activeOpacity={.8} id='sports' highlited={category} onPress={() => setCategory((category) => category = 'sports')}><TextCat theme={theme} id='sports' highlited={category}>Sport</TextCat></ButtonContainer>
                        <ButtonContainer theme={theme} activeOpacity={.8} id='health' highlited={category} onPress={() => setCategory((category) => category = 'health')}><TextCat theme={theme} id='health' highlited={category}>Santé</TextCat></ButtonContainer>
                    </CatRow>
                    <CatRow>
                        <ButtonContainer theme={theme} activeOpacity={.8} id='science' highlited={category} onPress={() => setCategory((category) => category = 'science')}><TextCat theme={theme} id='science' highlited={category}>Science</TextCat></ButtonContainer>
                        <ButtonContainer theme={theme} activeOpacity={.8} id='technology' highlited={category} onPress={() => setCategory((category) => category = 'technology')}><TextCat theme={theme} id='technology' highlited={category}>Tech</TextCat></ButtonContainer>
                        <ButtonContainer theme={theme} activeOpacity={.8} id='entertainment' highlited={category} onPress={() => setCategory((category) => category = 'entertainment')}><TextCat theme={theme} id='entertainment' highlited={category}>Divertissement</TextCat></ButtonContainer>
                    </CatRow>
                </CategoryContainer>
                <NewsContainer><NewsFlatList reset={reset} searchKey={passedText} category={category} ></NewsFlatList></NewsContainer>
            </Container>
        </KeyboardAvoidingView>
    )
}