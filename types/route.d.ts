
type RootStackParamList = {
    Home: undefined;
    detail: {id: number; title: string; star: number} | undefined,
    // Feed: {sort: 'laset' | 'top'}
}

declare global {
    namespace ReactNavigation {
        interface RootStackParamList extends RootStackParamList
    }
}