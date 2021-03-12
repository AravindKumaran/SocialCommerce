import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Searchbar from '../../screens/Search/searchbar';
import Brands from './brands';
import Trending from './trending';

const ActiveStyle = () => (
  <View style={{alignItems: 'center'}}>
    <View
      style={{
        width: 27,
        height: 4,
        borderRadius: 14,
        borderBottomColor: '#21FFFC',
        borderBottomWidth: 4,
      }}></View>
    <Image
      style={{
        transform: [
          {
            rotate: '-180deg',
          },
        ],
      }}
      source={require('../../assets/images/blur.png')}
      width={15}
      height={15}
    />
  </View>
);

const cat = [
  {
    src: require('../../assets/images/c1.png'),
    name: 'Men',
  },
  {
    src: require('../../assets/images/c2.png'),
    name: 'Women',
  },
  {
    src: require('../../assets/images/c3.png'),
    name: 'Kids',
  },
  {
    src: require('../../assets/images/c4.png'),
    name: 'Apparels',
  },
  {
    src: require('../../assets/images/c5.png'),
    name: 'Beauty',
  },
];
const brands = [
  {
    src: require('../../assets/images/L1.png'),
    name: 'Adidas',
  },
  {
    src: require('../../assets/images/L2.png'),
    name: 'Armani',
  },
  {
    src: require('../../assets/images/L3.png'),
    name: 'Beats',
  },
  {
    src: require('../../assets/images/L4.png'),
    name: 'Bose',
  },
  {
    src: require('../../assets/images/L5.png'),
    name: 'Hugo Boss',
  },
];

const Categories = () => {
  const [active, setActive] = useState('categories');

  const handleActive = (value) => {
    setActive(value);
  };

  return (
    <ScrollView style={styles.container}>
      <Searchbar />

      <View style={styles.choose}>
        <View>
          {active === 'categories' ? (
            <ActiveStyle />
          ) : (
            <View style={{height: 52}} />
          )}
          <TouchableWithoutFeedback onPress={() => handleActive('categories')}>
            <Text
              style={[
                styles.text1,
                {color: active === 'categories' ? '#21FFFC' : '#FFFFFF'},
              ]}>
              Categories
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View>
          {active === 'brands' ? (
            <ActiveStyle />
          ) : (
            <View style={{height: 52}} />
          )}
          <TouchableWithoutFeedback onPress={() => handleActive('brands')}>
            <Text
              style={[
                styles.text1,
                {color: active === 'brands' ? '#21FFFC' : '#FFFFFF'},
              ]}>
              Brands
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>

      {active === 'categories' && (
        <View style={styles.cat}>
          {cat.map((c, i) => (
            <TouchableOpacity key={`${c.name}-${i}`} style={styles.catItem}>
              <Image style={{height: 50, width: 50}} source={c.src} size={15} />
              <Text style={[styles.catItemText, {marginTop: 10}]}>
                {c.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {active === 'brands' && (
        <View style={styles.cat}>
          {brands.map((b, i) => (
            <TouchableOpacity key={`${b.name}-${i}`} style={styles.catItem}>
              <Image style={{height: 75, width: 75}} source={b.src} size={15} />
              <Text style={[styles.catItemText, {marginTop: -10}]}>
                {b.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.text2}>Top Trending</Text>

      {active === 'categories' ? <Trending /> : <Brands />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20232A',
  },
  choose: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  cat: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 120,
    padding: 8,
  },
  catItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  catItemText: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontFamily: 'Proxima Nova',
  },
  text1: {
    fontWeight: '700',
    fontFamily: 'Proxima Nova',
    fontSize: 16,
    marginHorizontal: 25,
    marginTop: -35,
  },

  text2: {
    top: 10,
    left: 0,
    color: '#FFFFFF',
    fontWeight: '400',
    fontFamily: 'Proxima Nova',
  },
  text3: {
    top: 10,
    left: 10,
    color: '#FFFFFF',
    fontWeight: '400',
    fontFamily: 'Proxima Nova',
  },
  text4: {
    top: 10,
    right: 0,
    color: '#FFFFFF',
    fontWeight: '400',
    fontFamily: 'Proxima Nova',
  },
  text5: {
    top: 10,
    right: -5,
    color: '#FFFFFF',
    fontWeight: '400',
    fontFamily: 'Proxima Nova',
  },
  t1: {
    top: 0,
    left: 10,
    zIndex: 1,
    position: 'absolute',
    
  },
  t2: {
    top: 0,
    left: 90,
    zIndex: 1,
    position: 'absolute',
    
  },
  t3: {
    top: 0,
    right: '43.5%',
    zIndex: 1,
    position: 'absolute',
  },
  t4: {
    top: 0,
    right: 85,
    zIndex: 1,
    position: 'absolute',
  },
  t5: {
    top: 0,
    right: 10,
    zIndex: 1,
    position: 'absolute',
  },
  container2: {
    top: -10,
    // backgroundColor: '#20232A',
    // zIndex: 1
  },
  text6: {
    top: -10,
    left: 15,
    color: '#FFFFFF',
    fontWeight: '400',
    fontFamily: 'Proxima Nova',
  },
  text7: {
    top: -10,
    left: 15,
    color: '#FFFFFF',
    fontWeight: '400',
    fontFamily: 'Proxima Nova',
  },
  text8: {
    top: -10,
    left: 20,
    color: '#FFFFFF',
    fontWeight: '400',
    fontFamily: 'Proxima Nova',
  },
  text9: {
    top: -10,
    right: -25,
    color: '#FFFFFF',
    fontWeight: '400',
    fontFamily: 'Proxima Nova',
  },
  text10: {
    top: -10,
    right: -5,
    color: '#FFFFFF',
    fontWeight: '400',
    fontFamily: 'Proxima Nova',
    fontSize: 16,
    marginVertical: 15,
  },
});

export default Categories;
