import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Text } from 'react-native'
import { ArticleContainer } from './ReadElements';
import { WebView } from 'react-native-webview';
import { Loader } from '../NewsList/NewsListElements';

import { useSelector } from 'react-redux';

export const NewsRead = (props) => {

    const theme = useSelector(state => state.theme);
    const [loading, setLoading] = useState(false)

    const displayloader = () => {
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

    return (
        <>
            <ArticleContainer>
                <WebView
                    showsHorizontalScrollIndicator={false}
                    originWhitelist={['*']}
                    source={{ uri: props.url }}
                    onLoadProgress={(e) => {
                        if (e.nativeEvent.progress <= 0.4) {
                            setLoading(true)
                        } else { setLoading(false) }
                    }}
                />
                {loading && displayloader()}
            </ArticleContainer>
        </>
    )
}