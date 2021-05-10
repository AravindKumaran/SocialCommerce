import {useState, useEffect} from 'react';

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback(() => {
      console.log('called back');
    });
  }, [isFetching]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;

// const [listItems, setListItems] = useState(
//   Array.from(Array(20).keys(), (n) => n + 1),
// );
// const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

// function fetchMoreListItems() {
//   setTimeout(() => {
//     setListItems((prevState) => [
//       ...prevState,
//       ...Array.from(Array(20).keys(), (n) => n + prevState.length + 1),
//     ]);
//     setIsFetching(false);
//   }, 2000);
// }

// const lists = () => {
//   return (
//     <>
//       <View style={styles.cmList}>
//         {comments.length > 0 &&
//           comments.map((cm) => (
//             <View styles={styles.cmCard} key={cm.id}>
//               <View style={styles.cmCardContent}>
//                 <View style={{width: 40, padding: 5}}>
//                   <Image
//                     source={{uri: cm?.user?.imageUri}}
//                     style={{
//                       height: 35,
//                       width: 35,
//                       borderRadius: 20,
//                       top: 20,
//                     }}
//                   />
//                 </View>

//                 <View style={{flex: 1}}>
//                   <Text style={{top: 20, marginBottom: 15, margin: 5}}>
//                     <AppText
//                       style={{
//                         textTransform: 'capitalize',
//                         fontSize: 12,
//                         fontWeight: '700',
//                         color: '#20232A',
//                         // top: 5,
//                       }}>
//                       {cm?.user?.username}
//                     </AppText>{' '}
//                     <AppText
//                       style={{
//                         color: '#030303',
//                         fontWeight: '400',
//                         color: '#20232A',
//                         fontSize: 12,
//                       }}>
//                       {cm.text}
//                     </AppText>
//                   </Text>
//                   <AppText
//                     style={{
//                       color: '#999999',
//                       fontSize: 12,
//                       fontWeight: '400',
//                       marginBottom: 20,
//                       top: 0,
//                     }}>
//                     <TimeAgo time={cm.createdAt} />
//                   </AppText>
//                 </View>

//                 <CommentLikes
//                   likes={cm.likes}
//                   onLike={handleCommentLike}
//                   onUnlike={handleCommentUnLike}
//                   comment={cm}
//                   user={user}
//                 />
//               </View>
//             </View>
//           ))}
//       </View>
//     </>
//   );
// };

// const [isLoader, setLoader] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [nextToken, setNextToken] = useState(undefined);
//   const [curLimit, setCurLimit] = useState(5);

//   useEffect(() => {
//     const fetchComment = async () => {
//       try {
//         setLoading(true);
//         const response = await API.graphql(
//           graphqlOperation(listComments, {
//             limit: curLimit,
//           }),
//           graphqlOperation(getPost, {
//             id: postId,
//           }),
//         );
//         const allItems = response.data.listComments.items;
//         const sortedItems = allItems.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
//         );
//         console.log('sortedItemsInside', sortedItems.length, sortedItems[0]);
//         setNextToken(response.data.listComments.nextToken);
//         setComments(sortedItems);
//         setLoading(false);
//       } catch (e) {
//         console.error(e);
//         setLoading(false);
//       }
//     };

//     fetchComment();
//   }, []);

//   const getMoreComments = async () => {
//     try {
//       setLoader(true);
//       if (nextToken) {
//         console.log('loader is true', nextToken);
//         const response = await API.graphql(
//           graphqlOperation(listComments, {
//             limit: curLimit + 5,
//             nextToken,
//           }),
//         );
//         setCurLimit((lim) => lim + 5);
//         setNextToken(response.data.listComments.nextToken);
//         setComments((comments) => [
//           ...comments,
//           ...response.data.listComments.items,
//         ]);
//         setLoader(false);
//       }
//     } catch (error) {
//       console.log('Pagination Error', error);
//       setLoader(false);
//     }
//   };

//   const handleRefresh = async () => {
//     try {
//       setRefreshing(true);
//       const response = await API.graphql(
//         graphqlOperation(listComments, {
//           limit: 5,
//         }),
//       );

//       const allItems = response.data.listComments.items;
//       const sortedItems = allItems.sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
//       );
//       console.log('sortedItems Refreshh', sortedItems.length);
//       setCurLimit(5);
//       setNextToken(response.data.listComments.nextToken);
//       setComments(sortedItems);
//       setRefreshing(false);
//     } catch (e) {
//       console.error(e);
//       setRefreshing(false);
//     }
//   };
