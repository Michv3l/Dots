import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Locmulti from '../gamescreen';
import Single from '../Single';
import Single3 from '../Single3';
import SingleMin from '../SingleMin';
import OnlineScreen from './onlineScreen';
import { getAuth, signOut } from "firebase/auth";
//import Ionicons from 'react-native-vector-icons/Ionicons';


function HomeScreen({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Main' }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Local Multiplayer" component={Locmulti} />
        <Stack.Screen name="Easy" component={Single} options={{title: 'Easy'}}/>
        <Stack.Screen name="Normal" component={Single3} options={{title: 'Normal'}}/>
        <Stack.Screen name="Hard" component={SingleMin} options={{title: 'Hard'}}/>
        <Stack.Screen name="Ultimate" component={Single} options={{title: 'Ultimate'}}/>
      </Stack.Navigator>
  );
}

function DetailsScreen({route, navigation}) {
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })}
      />

      <Button title="Go to Home" onPress={() => navigation.navigate('Main')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}


signingOut = () => {
  const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
  console.log("Signed Out")
  navigation.navigate('Signup')
}).catch((error) => {
  // An error happened.
  console.log(error)
});
}

function MainScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Dots and Shapes</Text>
      <Text>Daily Challenges</Text>
      <Button
        //onPress={() => navigation.navigate('Details')}
        onPress={() => {navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
      }}
        title="Details"
        color="#841584"
        accessibilityLabel="Start single player game"
        />

        <Button
        //onPress={() => navigation.navigate('Details')}
        onPress={() => {navigation.navigate('Easy', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
      }}
        title="Easy"
        color="#1444AA"
        accessibilityLabel="Start single player game"
        />

      <Button
        onPress={() => {navigation.navigate('Normal')}}
        title="Normal"
        color="#1444AA"
        accessibilityLabel="Start multiplayer game"
        />

      <Button
        onPress={() => {navigation.navigate('Hard')}}
        title="Hard"
        color="#1444AA"
        accessibilityLabel="Start multiplayer game"
        />

      <Button
        onPress={() => {navigation.navigate('Local Multiplayer')}}
        title="Multiplayer"
        color="#1444AA"
        accessibilityLabel="Start multiplayer game"
        />

      <Button
      onPress={() => {
      //  this.signingOut()
      const auth = getAuth();
        signOut(auth).then(() => {
          // Sign-out successful.
          console.log("Signed Out")
          navigation.navigate('Signup')
        }).catch((error) => {
          // An error happened.
          console.log(error)
        });
      }}
      title="Sign Out"
      color = "red"
      accessibilityLabel="Sign Out"
      />

    </View>
  );
}

function StatsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Stats!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home-outline'
                : 'home';
            } else if (route.name === 'Stats') {
              iconName = focused ? 'stats-chart-outline' : 'stats-chart';
            } else if (route.name === 'Online') {
              iconName = focused ? 'globe-outline' : 'globe';
            }

            // You can return any component that you like here!
            //return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'blue',
        })}

    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarBadge: 1 }} />
      <Tab.Screen name="Online" component={OnlineScreen} options={{ tabBarBadge: 6 }} />
      <Tab.Screen name="Stats" component={StatsScreen} options={{ tabBarBadge: 3 }} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function App() {

  return (
    
    // <NavigationContainer independent={true}>
    // <MyTabs />
    // </NavigationContainer>

    <MyTabs/>

  );
}

export default App;

