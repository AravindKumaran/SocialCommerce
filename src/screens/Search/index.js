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

import Searchhbar from '../../screens/Search/searchbar';
import Brands from '../Search/brands3';
import Trending from '../Search/trending3';
import {API, graphqlOperation} from 'aws-amplify';
import {searchUsersList} from '../../graphql/queries';
import {Header} from 'react-native-elements';

const ActiveStyle = () => (
  <View style={{alignItems: 'center'}}>
    <View
      style={{
        width: 27,
        height: 4,
        bottom: 20,
        right: 2,
        borderRadius: 14,
        borderBottomColor: '#21FFFC',
        borderBottomWidth: 4,
      }}></View>
    <Image
      style={{
        bottom: 23,
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
    src: require('../../assets/images/Men1.png'),
    name: 'Fashion',
  },
  {
    src: require('../../assets/images/Jewel1.png'),
    name: 'Jewellery',
  },
  {
    src: require('../../assets/images/Gym1.png'),
    name: 'Fitness',
  },
  {
    src: require('../../assets/images/Beauty1.png'),
    name: 'Beauty',
  },
  {
    src: require('../../assets/images/Beauty1.png'),
    name: 'Travel',
  },
  {
    src: require('../../assets/images/Beauty1.png'),
    name: 'Food',
  },
  {
    src: require('../../assets/images/Beauty1.png'),
    name: 'Movies & Series',
  },
  {
    src: require('../../assets/images/Beauty1.png'),
    name: 'Sports',
  },
  {
    src: require('../../assets/images/Beauty1.png'),
    name: 'Finance',
  },
  {
    src: require('../../assets/images/Beauty1.png'),
    name: 'DIY',
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
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setcategory] = useState('');

  const handleActive = (value) => {
    setActive(value);
  };
  const handleCategory = (value) => {
    setcategory(value);
  };
  const handleSearch = async (value) => {
    console.log('Insider', value);
    if (value.length > 3) {
      try {
        setLoading(true);
        const res = await API.graphql(
          graphqlOperation(searchUsersList, {
            filter: {
              username: {eq: value},
            },
          }),
        );
        console.log('ress', res.data.listUsers.items);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log('Error', err);
      }
    }
  };

  const MyCustomLeftComponent = () => {
    return (
      <Text
        style={{
          fontSize: 25,
          fontFamily: 'LilyScriptOne-Regular',
          width: 200,
        }}>
        Search
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {/* <Header
        leftComponent={<MyCustomLeftComponent />}
        containerStyle={{
          backgroundColor: '#20232A',
          borderColor: '#20232A',
        }}
      /> */}
      <ScrollView nestedScrollEnabled={true} style={{marginTop: 25}}>
        <Searchhbar onSearch={handleSearch} />

        <View style={styles.choose}>
          <View>
            {active === 'categories' ? (
              <ActiveStyle />
            ) : (
              <View style={{height: 52}} />
            )}
            <TouchableWithoutFeedback
              onPress={() => handleActive('categories')}>
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
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.cat}>
              {cat.map((c, i) => (
                <TouchableOpacity
                  key={`${c.name}-${i}`}
                  onPress={() => handleCategory(c.name)}
                  style={styles.catItem}>
                  <Image
                    style={
                      {
                        // height: 50,
                        // width: 50,
                        // borderWidth: 0.5,
                        // borderRadius: 25,
                        // borderColor: '#A1A1A1',
                        // backgroundColor: '#20232A',
                      }
                    }
                    source={c.src}
                    size={15}
                    style={{height: 75, width: 75}}
                  />
                  <Text style={[styles.catItemText, {marginTop: -10}]}>
                    {c.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}

        {active === 'brands' && (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.cat}>
              {brands.map((b, i) => (
                <TouchableOpacity key={`${b.name}-${i}`} style={styles.catItem}>
                  <Image
                    style={{height: 75, width: 75}}
                    source={b.src}
                    size={15}
                  />
                  <Text style={[styles.catItemText, {marginTop: -10}]}>
                    {b.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
        <View>
          {active === 'categories' ? (
            <Trending category={category} />
          ) : (
            <Brands />
          )}
        </View>
      </ScrollView>
    </View>
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
    bottom: 20,
  },
  catItemText: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
  },
  text1: {
    fontWeight: '700',
    fontFamily: 'Proxima Nova',
    fontSize: 14,
    marginHorizontal: 25,
    marginTop: -45,
  },

  text2: {
    bottom: 5,
    left: 0,
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Proxima Nova',
    fontSize: 16,
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
