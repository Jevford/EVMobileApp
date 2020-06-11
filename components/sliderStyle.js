// Stylesheet for the Slider on Preferences Page

import {StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: 50,
        justifyContent: 'center',
    },
    fullTrack: {
        flexDirection: 'row',
    },
    track: {
        ...Platform.select({
        ios: {
            height: 12,
            borderRadius: 7,
            backgroundColor: '#cccfcd',
        },
        android: {
            height: 12,
            borderRadius: 7,
            backgroundColor: '#cccfcd',
        },
        web: {
            height: 12,
            borderRadius: 7,
            backgroundColor: '#cccfcd',
        },
        }),
    },
    selectedTrack: {
        ...Platform.select({
        ios: {
            backgroundColor: "#65CB89",
        },
        android: {
            backgroundColor: "#65CB89",
        },
        web: {
            backgroundColor: "#65CB89",
        },
        }),
    },
    markerContainer: {
        position: 'absolute',
        width: 48,
        height: 60,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topMarkerContainer: {
        zIndex: 1,
    },
    touch: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    }
});


export default styles;