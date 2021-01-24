import React, { useRef } from "react";
import { DrawerLayoutAndroid, Text, StyleSheet, View } from "react-native";
import { IconButton, Button } from "react-native-paper";

const App = ({ navigation }) => {
    const drawer = useRef(null);

    const navigationView = () => (
        <View style={[styles.containerDraw, styles.navigationContainer]}>
            <Text style={styles.paragraph}>G - A - O</Text>
            <Button
                mode="text"
                onPress={() => navigation.navigate('Ordinateurs', { option: "update" })}
            >
                Liste ordis
            </Button>
            <View style={styles.separator} />
            <Button
                mode="text"
                onPress={() => navigation.navigate('Users')}
            >
                Liste utilisateurs
            </Button>
        </View>
    );

    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition="left"
            renderNavigationView={navigationView}
        >
            <View style={styles.container}>
                <Text style={styles.paragraph}>
                    GESTION D'ATTRIBUTION D'ORDINATEURS
                </Text>
                <IconButton
                    icon="menu"
                    color='purple'
                    onPress={() => drawer.current.openDrawer()}
                />
            </View>
        </DrawerLayoutAndroid>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16
    },
    containerDraw: {
        flex: 1,
        paddingTop: 16,

    },
    navigationContainer: {
        backgroundColor: "#ecf0f1"
    },
    paragraph: {
        padding: 16,
        fontSize: 30,
        textAlign: "center"
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

export default App;