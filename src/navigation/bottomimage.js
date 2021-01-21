// import React, {Component} from 'react';
// import {View, Text, StyleSheet, Image} from 'react-native';

// class BottomImage extends Component {
//   state = {};
//   render() {
//     return (
//       <View style={styles.container}>
//         {/* <Image style={styles.containerimage} source={require('../assets/images/Bottom.png')}  /> */}
//         <Image style={styles.containerimage} source={require('../assets/images/Bottom1.png')} width={35} height={35} style={{bottom: 5}} />     
//         <Image style={styles.containerimage} source={require('../assets/images/Bottom.png')} width={35} height={35} style={{bottom: 5}} />    
//       </View>
//     );
//   }
// }

// export default BottomImage;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignContent: 'center',
//     alignItems: 'center',
//   },
//   containerimage: {
//       bottom: 0, 
//       width: 35,
//       height: 35
//   }
// });



// import React, { useState } from "react";
// import { Button, Text, View } from "react-native";

// const Color = (props) => {
//   const [isTouched, setIsTouched] = useState(true);

//   return (
//     <View>
//       <Image
//         source={require('../assets/images/Search_icon.png')}
//         style={{width: 25, height: 25, bottom: -5}}
//         tintColor= '#21FFFC'
//       />
//       {/* <Text>
//         I am {props.name}, and I am {isTouched ? "hungry" : "full"}!
//       </Text> */}
//       <Button
//         onPress={() => {
//           setIsTouched(false);
//         }}
//         disabled={!isTouched}
//         title={isTouched ? "Pour me some milk, please!" : "Thank you!"}
//       />
//     </View>
//   );
// }

// const Tint = () => {
//   return (
//     <>
//       <Color color= 'white' />
//       <Color color=  '#21FFFC' />
//     </>
//   );
// }

// export default Tint;

// import React, { useState } from "react";
// import { View, Switch, StyleSheet } from "react-native";

// const App = () => {
//   const [isEnabled, setIsEnabled] = useState(false);
//   const toggleSwitch = () => setIsEnabled(previousState => !previousState);

//   return (
//     <View style={styles.container}>
//       <Switch
//         trackColor={{ false: "#767577", true: "#21FFFC" }}
//         thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
//         ios_backgroundColor="#3e3e3e"
//         onValueChange={toggleSwitch}
//         value={isEnabled}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });

// export default App;