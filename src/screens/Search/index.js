import React from 'react';

import {StyleSheet, View, Text} from 'react-native';

const Notification = () => {
  return (
    <View style={styles.container}>
      <Text>Search</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#fff',
  },
});

export default Notification;


// import React from 'react';

// import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';

// const Search = () => {
//   return (
//     <View style={styles.container}>

//       {/* <Image
//         source={require('../../assets/images/Tag1.png')}
//         style={{top: 250}}
//       /> */}

//       <TouchableOpacity style={styles.Rectangle} /> 
        
//       <TouchableOpacity style={styles.Brand}>
//         <Text style={styles.text1}>SONY ALPHA</Text>
//       </TouchableOpacity>
        
//       <TouchableOpacity style={styles.Model}>
//         <Text style={styles.text2}>ILCE5100L 24.3MP</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.Rectangle1} > 
//         {/* <Text style={styles.text1}>Sony</Text>
//         <Text style={styles.text2}>Model 3</Text> */}
//         <Text style={styles.text3}>Buy Now</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.Square} /> 

//       <Image
//         source={require('../../assets/images/Tag4.png')}
//         style={{top: -40, left: -110}}
//       />

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container:{
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'black',
//   },
//   Rectangle:{
//     bottom: -255,
//     width: 350,
//     height: 138,
//     backgroundColor: 'grey',
//     borderRadius: 10, 
//     left: 5
//   },
//   Rectangle1:{
//     bottom: -155,
//     width: 200,
//     height: 40,
//     backgroundColor: '#518BF9',
//     borderRadius: 10, 
//     right: -70,
//     justifyContent: 'center',
//     alignContent: 'center',
//     alignItems: 'center'
//   },
//   // Brand:{
//   //   bottom: -155,
//   //   width: 200,
//   //   height: 40,
//   //   backgroundColor: '#518BF9',
//   //   borderRadius: 10, 
//   //   right: -70,
//   //   justifyContent: 'center',
//   //   alignContent: 'center',
//   //   alignItems: 'center'
//   // },
//   // Model:{
//   //   bottom: -155,
//   //   width: 200,
//   //   height: 40,
//   //   backgroundColor: '#518BF9',
//   //   borderRadius: 10, 
//   //   right: -70,
//   //   justifyContent: 'center',
//   //   alignContent: 'center',
//   //   alignItems: 'center'
//   // },
//   text1:{
//     fontFamily: 'Proxima Nova',
//     fontWeight: 'bold',
//     color: '#222222',
//     fontSize: 16,
//     bottom: -130,
//     left: 20
//   },
//   text2:{
//     fontFamily: 'Proxima Nova',
//     fontWeight: 'normal',
//     top: 140,
//     color: '#222222',
//     fontSize: 12,
//     left: 25
//   },
//   text3:{
//     fontFamily: 'Proxima Nova',
//     fontWeight: '700',
//     fontSize: 16
//   },
//   Square:{
//     bottom: -55,
//     width: 100,
//     height: 100,
//     backgroundColor: '#ffffff',
//     borderRadius: 10, 
//     left: -110
//   }
// });

// export default Search;




// // import React, {Component} from 'react';
// // import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

// // class Home extends Component {
// //   state = {};
// //   render() {
// //     return (
// //       <View style={styles.container}>
// //         <TouchableOpacity style={styles.Rectangle} /> 
// //         <TouchableOpacity style={styles.Rectangle1} > 
// //           <Text style={styles.text}>Buy Now!</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity style={styles.Square} /> 
// //       </View>
// //     );
// //   }
// // }

// // export default Home;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignContent: 'center',
// //     alignItems: 'center',
// //     overflow: 'visible'
// //   },
// //   Rectangle:
// //   {
// //     bottom: -100,
// //     width: 350,
// //     height: 138,
// //     backgroundColor: '#E5E5E5',
// //     borderRadius: 10, 
// //     left: 10
// //   },
// //   Rectangle1:
// //   {
// //     bottom: -35,
// //     width: 200,
// //     height: 40,
// //     backgroundColor: '#518BF9',
// //     borderRadius: 10, 
// //     right: -70,
// //     justifyContent: 'center',
// //     alignContent: 'center',
// //     alignItems: 'center'
// //   },
// //   text:{
// //     fontFamily: 'Proxima Nova',
// //     fontWeight: '700',
// //   },
// //   Square:
// //   {
// //     bottom: 60,
// //     width: 100,
// //     height: 100,
// //     backgroundColor: '#ffffff',
// //     borderRadius: 10, 
// //     left: -90
// //   }
// // });

// {/* <Image
//           source={require('../../assets/images/Tag1.png')}    
//           size={25}
//           style={{position: 'absolute', right: 20, bottom: 250, width: 400, height: 150 }}
//         /> */}
//         {/* <Text>Home Page</Text> */}
