import React from 'react';

import {StyleSheet, View, Text, TouchableOpacity, Image, Pressable} from 'react-native';

const Product = () => {
  return (
    <View style={styles.container}>

      <View style={styles.Rectangle} /> 
        
        <View style={styles.Brand}>
          <Text style={styles.text1}>SONY ALPHA</Text>
        </View>
        
        <View style={styles.Model} >
          <Text style={styles.text2}>ILCE5100L 24.3MP</Text>
        </View>

        <TouchableOpacity style={styles.Rectangle1} > 
          <Text style={styles.text3}>Buy Now</Text>
        </TouchableOpacity>

        <View style={styles.Square} /> 

      <Image
        source={require('../../assets/images/Tag4.png')}
        style={{bottom: -260, left: -110}}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex: 1,
    bottom: 550
  },
  Rectangle:{
    bottom: -550,
    width: 350,
    height: 138,
    backgroundColor: 'grey',
    borderRadius: 10, 
    left: 5,
  },
  Rectangle1:{
    bottom: -455,
    width: '55%',
    height: '35%',
    backgroundColor: '#518BF9',
    borderRadius: 10, 
    right: -70,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  text1:{
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    color: '#222222',
    fontSize: 16,
    top: 430,
    left: 20
  },
  text2:{
    fontFamily: 'Proxima Nova',
    fontWeight: 'normal',
    top: 440,
    color: '#222222',
    fontSize: 12,
    left: 25
  },
  text3:{
    fontFamily: 'Proxima Nova',
    fontWeight: '700',
    fontSize: 16,
  },
  Square:{
    bottom: -350,
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
        {/* <Text>Home Page</Text> */}




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