import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Searchhbar from '../../screens/Search/searchbar';
import Brands from '../Search/brands3';
import Trending from '../Search/trending3';
import HashTag from './hashtag';
import {API, graphqlOperation} from 'aws-amplify';
import {searchUsersList} from '../../graphql/queries';
import {listPosts} from '../../graphql/queries';
import {Header} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import Feather from 'react-native-vector-icons/Feather';
import Settings from '../Settings';

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
    src: require('../../assets/images/Travel1.png'),
    name: 'Travel',
  },
  {
    src: require('../../assets/images/Food1.png'),
    name: 'Food',
  },
  {
    src: require('../../assets/images/Movies1.png'),
    name: 'Movies & Series',
  },
  {
    src: require('../../assets/images/Sports1.png'),
    name: 'Sports',
  },
  {
    src: require('../../assets/images/Finance1.png'),
    name: 'Finance',
  },
  {
    src: require('../../assets/images/Diy1.png'),
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
  const [searchedData, setSearchedData] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brand, setBrand] = useState('');
  const [category, setcategory] = useState('');
  const refRBSheet3 = useRef();

  const handleActive = (value) => {
    setActive(value);
    setBrand('');
    setSearchedData(null);
    setcategory('');
  };

  const handleBrandSelection = (value) => {
    setBrand(value);
    setSearchedData(null);
  };

  const handleCategory = (value) => {
    setcategory(value);
    setSearchedData(null);
  };

  const handleSearch = async (value) => {
    console.log('Insider', value);
    if (value.length >= 3) {
      try {
        setLoading(true);
        const response = await API.graphql(
          graphqlOperation(listPosts, {
            filter: {
              or: [
                {description: {contains: value}},
                {category: {contains: value}},
                {brand: {contains: value}},
              ],
            },
          }),
        );

        const allItems = response.data.listPosts.items;
        // const sortedItems = allItems.sort(
        //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        // );
        let sortedItems = allItems
          .filter((item) => item.likes)
          .sort((a, b) => b.likes.length - a.likes.length);
        setSearchedData(
          sortedItems.concat(allItems.filter((item) => item.likes === null)),
        );

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log('Error', err);
      }
    }
  };

  /*const getMoreSearchedPosts = async () => {
    try {
      setLoading(true);
      if (nextToken) {
        const response = await API.graphql(
          graphqlOperation(listPosts, (brand!=='')?{
            limit: curLimit + 15,
            filter: {
              brand:{eq: brand}
            },
            nextToken,
          }:{
            limit: curLimit + 15,
            nextToken
          })
        );
        console.log('AllItems', curLimit);
        setCurLimit((lim) => lim + 15);
        setNextToken(response.data.listPosts.nextToken);
        setUris((post) => [...post, ...response.data.listPosts.items]);
        setLoader(false);
      }
    } catch (error) {
      console.log('Pagination Error', error);
      setLoader(false);
    }
  };*/

  const refScrollView = useRef(null);
  const moveTo = () => {
    refScrollView.current?.scrollTo({x: 0, y: 0, animated: true});
  };

  const MyCustomLeftComponent = () => {
    return (
      <TouchableOpacity onPress={moveTo}>
        <Text
          style={{
            fontSize: 23,
            fontFamily: 'LilyScriptOne-Regular',
            width: 200,
          }}>
          Livebox
        </Text>
      </TouchableOpacity>
    );
  };

  const MyCustomRightComponent = () => {
    return (
      <TouchableOpacity
        onPress={() => refRBSheet3.current.open()}
        style={{left: 10, alignSelf: 'center', top: 5}}>
        <Feather style={{top: 0, right: 0}} name={'settings'} size={25} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Header
        leftComponent={<MyCustomLeftComponent />}
        containerStyle={{
          backgroundColor: '#20232A',
          borderColor: '#20232A',
        }}
      />
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        ref={refScrollView}>
        <RBSheet
          ref={refRBSheet3}
          height={Dimensions.get('window').height - 140}
          animationType="fade"
          closeOnDragDown={false}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,.6)',
              padding: 10,
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
            container: {
              backgroundColor: '#1A1A1A',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              bottom: 85,
            },
          }}>
          <Settings />
        </RBSheet>
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
          {/* <View>
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
          </View> */}
          <View>
            {active === 'hashtag' ? (
              <ActiveStyle />
            ) : (
              <View style={{height: 52}} />
            )}
            <TouchableWithoutFeedback onPress={() => handleActive('hashtag')}>
              <Text
                style={[
                  styles.text1,
                  {color: active === 'hashtag' ? '#21FFFC' : '#FFFFFF'},
                ]}>
                # Challenges
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

        {active === 'categories' && (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.cat}>
              {cat.map((c, i) => (
                <TouchableOpacity
                  onPress={() => handleCategory(c.name)}
                  key={`${c.name}-${i}`}
                  style={styles.catItem}>
                  <Image
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
                <TouchableOpacity
                  key={`${b.name}-${i}`}
                  onPress={() => handleBrandSelection(b.name)}
                  style={styles.catItem}>
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

        {active === 'categories' && (
          <Trending category={category} searchedData={searchedData} />
        )}
        {active === 'brands' && (
          <Brands brand={brand} searchedData={searchedData} />
        )}
        {active === 'hashtag' && <HashTag />}

        {/* <View>
          {active === 'categories' ? (
            <Trending category={category} searchedData={searchedData} />
          ) : (
            <Brands brand={brand} searchedData={searchedData} />
          )}
        </View> */}
      </ScrollView>
    </>
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
