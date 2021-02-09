import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Searchbar from '../../screens/Search/searchbar';

const ActiveStyle = () => (
  <>
    <Image
      style={{
        position: 'absolute',
        bottom: 20,
        left: 95,
        transform: [{
          rotate: '-180deg'
        }],
      }}
      source={require('../../assets/images/blur.png')}
      width={15}
      height={15}
    />
    <View
      style={{
        width: 27,
        height: 4,
        borderRadius: 14,
        position: 'absolute',
        bottom: 55,
        borderBottomColor: '#21FFFC',
        borderBottomWidth: 4,
        left: 120
      }}>
    </View>
  </>
);

const ActiveStyle1 = () => (
  <>
    <Image
      style={{
        position: 'absolute',
        bottom: 20,
        right: 80,
        transform: [{
          rotate: '-180deg'
        }],
      }}
      source={require('../../assets/images/blur.png')}
      width={5}
      height={5}
    />
    <View
      style={{
        width: 27,
        height: 4,
        borderRadius: 14,
        position: 'absolute',
        bottom: 55,
        borderBottomColor: '#21FFFC',
        borderBottomWidth: 4,
        right: 110
      }}>
    </View>
  </>
);

const Categories = () => {
  const [isTouched, setTouched] = useState(false);
  const [isPressed, setPressed] = useState(false);
  const [isClicked, setClicked] = useState(false);


  return (
    <View style={styles.container}>

      <Searchbar />

      <View style={styles.cat}>
        <Image style={{top: 80, left: 15}} source={require('../../assets/images/Line2.png')} size={15} />
        <TouchableOpacity style={styles.type1} onPress={() => setTouched(!isTouched)}>
          <Text style={{color: !isTouched ? '#282D34' : '#21FFFC', fontWeight: '700', fontFamily: 'Proxima Nova', fontSize: 16,}}>Categories</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.type2} onPress={() => setPressed(!isPressed)}>
          <Text style={{color: !isPressed ? '#282D34' : '#21FFFC', fontWeight: '700', fontFamily: 'Proxima Nova', fontSize: 16,}}>Brands</Text>
        </TouchableOpacity>
        <Image style={{top: 180, left: 15}} source={require('../../assets/images/Line2.png')} size={15} />

        <TouchableOpacity style={styles.type3} onPress={() => setClicked(!isClicked)}>
          <Text style={{color: !isClicked ? '#282D34' : '#21FFFC', fontWeight: '700', fontFamily: 'Proxima Nova', fontSize: 16}}>Top Trending</Text>
        </TouchableOpacity>
      </View>

      {isTouched ? (
      <View style={styles.container1}>
        <ActiveStyle />
        <TouchableOpacity style={styles.t1}>
          <Image style={{height: 50, width: 50}} source={require('../../assets/images/Image1.png')} size={15} /> 
          <Text style={styles.text1}>Men</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.t2}>
          <Image style={{height: 50, width: 50}} source={require('../../assets/images/Image2.png')} size={15} /> 
          <Text style={styles.text2}>Women</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.t3}>
          <Image style={{height: 50, width: 50}} source={require('../../assets/images/Image3.png')} size={15} /> 
          <Text style={styles.text3}>Kids</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.t4}>
          <Image style={{height: 50, width: 50}} source={require('../../assets/images/Image4.png')} size={15} /> 
          <Text style={styles.text4}>Apparels</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.t5}>
          <Image style={{height: 50, width: 50}} source={require('../../assets/images/Image5.png')} size={15} /> 
          <Text style={styles.text5}>Beauty</Text>
        </TouchableOpacity>
      </View>
      ) : (<></>) }

      {isPressed ? (
      <View style={styles.container2}>
        <ActiveStyle1 />
        <TouchableOpacity style={styles.t6}>
          <Image style={{height: 75, width: 75}} source={require('../../assets/images/L1.png')} size={15} /> 
          <Text style={styles.text6}>Adidas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.t7}>
          <Image style={{height: 75, width: 75}} source={require('../../assets/images/L2.png')} size={15} /> 
          <Text style={styles.text7}>Armani</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.t8}>
          <Image style={{height: 75, width: 75}} source={require('../../assets/images/L3.png')} size={15} /> 
          <Text style={styles.text8}>Beats</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.t9}>
          <Image style={{height: 75, width: 75}} source={require('../../assets/images/L4.png')} size={15} /> 
          <Text style={styles.text9}>Bose</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.t10}>
          <Image style={{height: 75, width: 75}} source={require('../../assets/images/L5.png')} size={15} /> 
          <Text style={styles.text10}>Hugo Boss</Text>
        </TouchableOpacity>
      </View>
      ) : (<></>) }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
  cat: {
    top: -80
  },
  type1:{
    top: 100, left: 100
  },
  type2:{
    top: 78, right: -250,
  },
  type3:{
    top: 200, right: -150,
  },
  category:{
    // color: isPressed ? '#282D34' : '#21FFFC', fontWeight: '700', fontFamily: 'Proxima Nova', fontSize: 16, 
  },
  brand:{
    color: '#282D34', fontWeight: '700', fontFamily: 'Proxima Nova', fontSize: 16, tintColor: '#21FFFC'
  },
  trend:{
    color: '#282D34', fontWeight: '700', fontFamily: 'Proxima Nova', fontSize: 16
  },
  container1:{
    top: -10
  },
  text1:{
    top: 10,  left: 10, color: '#282D34', fontWeight: '400', fontFamily: 'Proxima Nova', 
  },
  text2:{
    top: 10,  left: 0, color: '#282D34', fontWeight: '400', fontFamily: 'Proxima Nova', 
  },
  text3:{
    top: 10, left: 10, color: '#282D34', fontWeight: '400', fontFamily: 'Proxima Nova', 
  },
  text4:{
    top: 10,  right: 0, color: '#282D34', fontWeight: '400', fontFamily: 'Proxima Nova', 
  },
  text5:{
    top: 10,  right: -5, color: '#282D34', fontWeight: '400', fontFamily: 'Proxima Nova', 
  },
  t1:{
    top: 0,
    left: 10,
    zIndex: 1,
    position: 'absolute'
  },
  t2:{
    top: 0,
    left: 90,
    zIndex: 1,
    position: 'absolute'
  },
  t3:{
    top: 0,
    left: 170,
    zIndex: 1,
    position: 'absolute'
  },
  t4:{
    top: 0,
    right: 90,
    zIndex: 1,
    position: 'absolute'
  },
  t5:{
    top: 0,
    right: 10,
    zIndex: 1,
    position: 'absolute'
  },
  container2:{
    top: -10
  },
  text6:{
    top: -10,  left: 15, color: '#282D34', fontWeight: '400', fontFamily: 'Proxima Nova', 
  },
  text7:{
    top: -10,  left: 15, color: '#282D34', fontWeight: '400', fontFamily: 'Proxima Nova', 
  },
  text8:{
    top: -10, left: 20, color: '#282D34', fontWeight: '400', fontFamily: 'Proxima Nova', 
  },
  text9:{
    top: -10,  right: -25, color: '#282D34', fontWeight: '400', fontFamily: 'Proxima Nova', 
  },
  text10:{
    top: -10,  right: -5, color: '#282D34', fontWeight: '400', fontFamily: 'Proxima Nova', 
  },
  t6:{
    top: -5,
    left: 0,
    zIndex: 1,
    position: 'absolute'
  },
  t7:{
    top: -5,
    left: 80,
    zIndex: 1,
    position: 'absolute'
  },
  t8:{
    top: -5,
    left: 155,
    zIndex: 1,
    position: 'absolute'
  },
  t9:{
    top: -5,
    right: 80,
    zIndex: 1,
    position: 'absolute'
  },
  t10:{
    top: -5,
    right: 0,
    zIndex: 1,
    position: 'absolute'
  },
});

export default Categories;