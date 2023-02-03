export const menuListConfig = {
    Home: {
        home: "Home.md",
    },
    QuickStart: {
        install: "Install.md",
        setup: "Setup.md",
    }
}

export const menuListNameMap = Object.entries(menuListConfig).reduce((acc, [_, value]) => {
    for (let key in value) {
        // @ts-ignore
        acc[key] = value[key]
    }
    return acc
}, {})

