import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import TabSwipeView from './TabSwipeView'

const App: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <View style={styles.container}>
      <TabSwipeView labels={['Test 1', 'Test 2', 'Test 3']} tabIndex={tabIndex} onTabChange={setTabIndex}>
        <Text style={{ padding: 20 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
        </Text>
        <Text style={{ padding: 20 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
        </Text>
        <Text style={{ padding: 20 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
        </Text>
      </TabSwipeView>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App
