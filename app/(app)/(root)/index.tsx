//Main screen shown only after user logs in
import React from 'react';
import { Image, RefreshControl, Text, ScrollView, Button, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import BackArrowIcon from './assets/svg/common/BackArrowIcon';
//import PageHeader from '@/components/PageHeader';
import { tailwind } from 'tailwind';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaProvider>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
           <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
          }>
        <SafeAreaView>
        <Text style={styles.title}>Welcome to Warima</Text>
        <Text style={styles.subtitle}>Investing in the land you stand on. </Text>
        </SafeAreaView>
        </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  subtitle: { fontSize: 20, textAlign: 'center' },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
