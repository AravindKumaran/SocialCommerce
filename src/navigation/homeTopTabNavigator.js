// import * as React from 'react';
// import { Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import Feather from 'react-native-vector-icons/Feather';
// import ProfileScreen from '../screens/Profile/index';
// import Home from '../screens/Home';
  
// function FeedScreen() {
//   return (
//    <Feather name={'user'} size={25} color={'white'} onPress={() => ('Profile')} />              
//   );
// }
  
// // function NotificationsScreen() {
// //   return (
// //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// //       <Text>Notifications!</Text>
// //     </View>
// //   );
// // }

// const Tab = createMaterialTopTabNavigator();
  
// function MyTabs() {
//   return (
//     <Tab.Navigator
//       initialRouteName="App"
//       tabBarOptions={{
//         activeTintColor: '#e91e63',
//         labelStyle: { fontSize: 20 },
//         style: { backgroundColor: '#292929' }
//       }}
//     >
//       <Tab.Screen
//         name="Feed"
//         component={ProfileScreen}
//         options={{ tabBarLabel: 'LiveBox' }}
//       />
//       {/* <Tab.Screen
//         name="Notifications"
//         component={NotificationsScreen}
//         options={{ tabBarLabel: 'Updates' }}
//       /> */}
//       {/* <Tab.Screen
//         name={'Search'}
//         component={Home}
//         options={{
//           tabBarIcon: ({tintColor}) => (
//             <Feather name={'search'} size={25} color={tintColor} 
//             />                                        
//           ),
//         }}
//       /> */}
        
//     </Tab.Navigator>
      
//   );
// }

// export default function Toptab() {
//   return (
//     <NavigationContainer>
//       <MyTabs />
//     </NavigationContainer>
//   );
// }





// // import {createAppContainer} from 'react-navigation';
// // // import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
// // import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// // import {createStackNavigator} from 'react-navigation-stack';
// // import Home from '../screens/Home';
// // // import Profile from '../screens/Profile';
// // // import Settings from '../screens/Settings';
// // import React, {Component} from 'react';
// // import {View, Text, StyleSheet} from 'react-native';
// // import Bellicon from '../assets/images/Bell_icon.png';


// // const createMaterialTopTabNavigator = () => {
// //     return (

// //         <Tab.Navigator>
// //         tabBarOptions={{
// //             tabStyle: {
// //               backgroundColor: '#000',
// //               lazyLoad: true,
// //               tabBarPosition: 'top',
// //               swipeEnabled: true,
// //             },
// //             indicatorStyle: {
// //                 backgroundColor: '#fff',
// //                 elevation: 10,
// //               },
// //             activeTintColor: '#fff',
// //             inactiveTintColor: 'gray',
// //           }}
          
// //             <Tab.Screen
// //                 name={'LiveBox'} component={Home}  options={{
// //                     tabBarIcon: ({color}) => (
// //                         <Image source={Bellicon} size={25} color={color} />  ) }}  />
            
// //             <Tab.Screen
// //                 name={'Notification'}  component={Home} options={{
// //                     tabBarIcon: ({color}) => (
// //                         <Image source={Bellicon} size={25} color={color} />  )}} />

// //         </Tab.Navigator>
// //     );   
// // };    

// // const MainScreenNavigator = createStackNavigator({
// //     Tabs: {
// //       screen: Tabs,
// //       navigationOptions: {
// //         title: 'LiveBox',
// //         headerStyle: {
// //           backgroundColor: '#2b2b39',
// //         },
// //         headerTitleStyle: {
// //           color: '#fff',
// //         },
// //       },
// //     },
// //   });
  
// //   export default createAppContainer(MainScreenNavigator);

// //   const styles = StyleSheet.create({
// //     iconCOntainer: {
// //       justifyContent: 'center',
// //       alignItems: 'center',
// //       alignContent: 'center',
// //     },
// //   });
  




   


       