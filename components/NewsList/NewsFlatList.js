import React, { useEffect, useState, useRef } from 'react';
import { FlatList, ActivityIndicator, Text } from 'react-native'
import { Description, Img, News, Title, TitleContainer, DescriptionContainer, FlatListItemSeparator, ImgContainer, Loader, ReadmoreContainer, Readmore, ReadmoreText } from './NewsListElements';
import { getTopicNews, getSearched } from '../ConsumingAPI/API';
import { makalat } from './RawData';
import { WebView } from 'react-native-webview';
import { Actions } from 'react-native-router-flux';

import { useSelector, useDispatch } from 'react-redux';

export const NewsFlatList = (props) => {
    console.log('Rendering NEWSFLATLIST')
    const topic = props.category
    let keyword = props.searchKey
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const flatListRef = useRef()
    let totalArticles = useRef(0)
    let numberOfCurrentArticles = useRef(5)
    let preArticles = useRef([])
    let newsToShow = []


    const theme = useSelector(state => state.theme);

    const webbg = theme === 'light' ? 'white' : 'black'


    // Fetching data by category
    useEffect(() => {
        if (topic != 'custom') {
            console.log('------Fetching data by category------')
            totalArticles.current = 0
            numberOfCurrentArticles.current = 5
            preArticles.current = []
            setLoading((loading) => loading = true)
            let mounted = true
            getTopicNews(topic).then((response) => {

                console.log('Server ' + response.status)
                console.log('Total results is :' + response.totalResults)
                if (response.status != 'error') {
                    let num = 1
                    preArticles.current = []
                    response.articles.forEach((obj) => {
                        if (obj.content != null && obj.description != "" && obj.description != null) {
                            obj.source.id = num
                            num += 1
                            preArticles.current.push(obj)
                        }
                    })
                    totalArticles.current = num //added
                    for (let i = 0; i <= 4; i++) {
                        if (preArticles.current[i] != undefined) {
                            newsToShow.push(preArticles.current[i])
                        }
                    }
                    if (mounted) {
                        setNews((news) => news = newsToShow)

                    }
                    // This condition is for rendering some static news if the API does not provide data
                } else {
                    let num = 1
                    const preArticle = []
                    console.log('Too much requests, rendering static data...')
                    makalat.forEach((obj) => {
                        if (obj.content != null && obj.description != "") {
                            obj.source.id = num
                            num += 1
                            preArticle.push(obj)
                        }
                    })
                    setNews((news) => news = preArticle)
                }
                // End of condition
                setLoading((loading) => loading = false)

            })
            flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
            props.reset()

            return function cleanup() {
                mounted = false
            }
        }
    }, [topic])

    // Fetching data by search
    useEffect(() => {
        if (keyword != '') {
            console.log('----------Fetching data by searching : ' + keyword + '----------')
            totalArticles.current = 0
            numberOfCurrentArticles.current = 5
            preArticles.current = []
            newsToShow = []
            setLoading((loading) => loading = true)
            let mounted = true
            getSearched(keyword).then((response) => {
                console.log('Server is ' + response.status)
                console.log('Total results is :' + response.totalResults)
                if (response.status != 'error') {
                    let num = 1
                    preArticles.current = []
                    response.articles.forEach((obj) => {
                        if (obj.urlToImage != null && obj.urlToImage != "" && obj != null && obj.content != null && obj.description != "" && obj.description != null) {
                            console.log(obj.urlToImage)
                            obj.source.id = num
                            num += 1
                            preArticles.current.push(obj)
                        }

                    })
                    totalArticles.current = num //added
                    for (let i = 0; i <= 4; i++) {
                        if (preArticles.current[i] != undefined) {
                            newsToShow.push(preArticles.current[i])
                        }
                    }
                    if (mounted) {
                        newsToShow.length > 0 ? setNews((news) => news = newsToShow) : alert('Aucun résultat ne correspond à votre recherche')

                    }
                    // This condition is for rendering some static news if the API does not provide data
                } else {
                    let num = 1
                    const preArticle = []
                    console.log('Too much requests, rendering static data...')
                    makalat.forEach((obj) => {
                        if (obj.content != null && obj.description != "") {
                            obj.source.id = num
                            num += 1
                            preArticle.push(obj)
                        }
                    })
                    setNews((news) => news = preArticle)
                }
                // End of condition
                setLoading((loading) => loading = false)

            })

            flatListRef.current.scrollToOffset({ animated: true, offset: 0 })

            return function cleanup() {
                mounted = false
            }
        }
    }, [keyword])



    const displayLoading = () => {
        if (loading) {
            if (theme === 'light') {
                return (
                    <Loader>
                        <ActivityIndicator color='grey' size='large' />
                    </Loader>
                )
            } else {
                return (
                    <Loader style={{ backgroundColor: '#222831' }}>
                        <ActivityIndicator color='#ececec' size='large' />
                    </Loader>
                )
            }
        }
    }



    const loadArticles = () => {
        console.log('LoadArticles Triggered')
        const n = numberOfCurrentArticles.current + 5

        if (n <= totalArticles.current) {
            for (let i = n - 5; i <= n - 1; i++) {
                newsToShow.push(preArticles.current[i])
            }
            numberOfCurrentArticles.current += 5
            setNews((news) => news = [...news, ...newsToShow])
        } else {
            const m = totalArticles.current + 5 - n
            for (let i = n - 5; i < totalArticles.current - 1; i++) {
                newsToShow.push(preArticles.current[i])
            }
            numberOfCurrentArticles.current += m
            setNews((news) => news = [...news, ...newsToShow])
            console.log('rendered : ' + numberOfCurrentArticles.current)
        }


    }

    let htmlStyle = `<style>
                        body {
                            width:98%;
                            display : flex;
                            justify-content: center;
                            background-color:${webbg};
                          
                        }
                        p {
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 4;
                            overflow: hidden;
                            font-size: 235%;
                            margin-left: 6%;
                            margin-right: 6%;
                            font-weight: normal;
                            text-align: justify;
                            color: #706c61;
                        }
                
                    </style>`


    const goToUrl = (url) => {
        Actions.newsRead({ url: url })
    }


    return (
        <>
            <FlatList
                data={news}
                keyExtractor={(item) => item.source.id.toString()}
                ref={flatListRef}
                ItemSeparatorComponent={FlatListItemSeparator}
                renderItem={({ item }) => (
                    <News>
                        <TitleContainer>
                            <Title theme={theme} numberOfLines={3}>{item.title}</Title>
                        </TitleContainer>
                        <ImgContainer>
                            <Img source={{ uri: item.urlToImage }} />
                        </ImgContainer>
                        <DescriptionContainer theme={theme}>
                            <Description theme={theme} numberOfLines={4}>{item.description}</Description>
                        </DescriptionContainer>
                        <ReadmoreContainer>
                            <Readmore theme={theme} onPress={() => goToUrl(item.url)} activeOpacity={.5}><ReadmoreText theme={theme}>Lire la suite</ReadmoreText></Readmore>
                        </ReadmoreContainer>
                    </News>
                )}
                onEndReachedThreshold={1}
                onEndReached={() => {
                    if (numberOfCurrentArticles.current + 5 - totalArticles.current < 5) {
                        loadArticles()
                    }
                }}
            />
            {displayLoading()}
        </>
    )
}