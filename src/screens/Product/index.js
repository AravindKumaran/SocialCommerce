import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Product = () => {
  return (
    <View style={styles.container}>
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#c1c1c1', '#ffffff']} style={styles.Rectangle} >
        <View />
      </LinearGradient>
      <View style={styles.Brand}>
        <Text style={styles.text1}>Sony Alpha</Text>
      </View>

      <View style={styles.Model} >
        <Text style={styles.text2}>ILCE5100L 24.3MP</Text>
      </View>

      
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#5e37f4', '#518bf9', '#21fffc']} style={styles.Rectangle1} >
        <TouchableOpacity>
          <Text style={styles.text3}>Buy Now</Text>
        </TouchableOpacity>
      </LinearGradient>
      

      <View style={styles.Square} />

      <Image
        source={require('../../assets/images/Tag4.png')}
        style={{ bottom: -315, left: -110 }}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex: 1,
    bottom: 550,
    right: 7,
  },
  Rectangle: {
    bottom: -595,
    width: 370,
    height: 138,
    // backgroundColor: '#ffffff',
    borderRadius: 10,
    left: 5,
    opacity: 0.8
  },
  Rectangle1: {
    top: 500,
    width: '55%',
    height: '20%',
    backgroundColor: '#518BF9',
    borderRadius: 5,
    right: -65,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  text1: {
    fontFamily: 'Proxima Nova',
    fontWeight: "700",
    color: '#222222',
    fontSize: 14,
    top: 475,
    left: 3
  },
  text2: {
    fontFamily: 'Proxima Nova',
    fontWeight: "400",
    top: 485,
    color: '#363636',
    fontSize: 12,
    left: 20
  },
  text3: {
    fontFamily: 'Proxima Nova',
    fontWeight: '700',
    fontSize: 14,
  },
  Square: {
    bottom: -400,
    width: 100,
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    left: -110
  }
});

export default Product;




// import React, {Component} from 'react';
// import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

// class Home extends Component {
//   state = {};
//   render() {
//     return (
//       <View style={styles.container}>
//         <TouchableOpacity style={styles.Rectangle} /> 
//         <TouchableOpacity style={styles.Rectangle1} > 
//           <Text style={styles.text}>Buy Now!</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.Square} /> 
//       </View>
//     );
//   }
// }

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignContent: 'center',
//     alignItems: 'center',
//     overflow: 'visible'
//   },
//   Rectangle:
//   {
//     bottom: -100,
//     width: 350,
//     height: 138,
//     backgroundColor: '#E5E5E5',
//     borderRadius: 10, 
//     left: 10
//   },
//   Rectangle1:
//   {
//     bottom: -35,
//     width: 200,
//     height: 40,
//     backgroundColor: '#518BF9',
//     borderRadius: 10, 
//     right: -70,
//     justifyContent: 'center',
//     alignContent: 'center',
//     alignItems: 'center'
//   },
//   text:{
//     fontFamily: 'Proxima Nova',
//     fontWeight: '700',
//   },
//   Square:
//   {
//     bottom: 60,
//     width: 100,
//     height: 100,
//     backgroundColor: '#ffffff',
//     borderRadius: 10, 
//     left: -90
//   }
// });

{/* <Image
          source={require('../../assets/images/Tag1.png')}    
          size={25}
          style={{position: 'absolute', right: 20, bottom: 250, width: 400, height: 150 }}
        /> */}
{/* <Text>Home Page</Text> */ }




  // Brand:{
  //   bottom: -155,
  //   width: 200,
  //   height: 40,
  //   backgroundColor: '#518BF9',
  //   borderRadius: 10, 
  //   right: -70,
  //   justifyContent: 'center',
  //   alignContent: 'center',
  //   alignItems: 'center'
  // },
  // Model:{
  //   bottom: -155,
  //   width: 200,
  //   height: 40,
  //   backgroundColor: '#518BF9',
  //   borderRadius: 10, 
  //   right: -70,
  //   justifyContent: 'center',
  //   alignContent: 'center',
  //   alignItems: 'center'
  // },