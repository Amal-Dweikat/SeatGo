module.exports = {
    preset: "jest-expo",

    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native|expo(nent)?|@expo(nent)?/.*|expo-router|@expo/.*|react-navigation|@react-navigation/.*))"
    ],
};