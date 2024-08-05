import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import YearCalendar from './YearCalendar'; // YearCalendar bileşenini içe aktar

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <YearCalendar year={2024} /> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});

export default App;
