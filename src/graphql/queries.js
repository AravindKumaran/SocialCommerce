/* eslint-disable */
// this is an auto generated file. This will be overwritten


export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      name
      imageUri
      bio
      posts {
        items {
          id
          videoUri
          description
          likes
          thumbnail
          category
          brand
          userID
          songID
          createdAt
          updatedAt
        }
        nextToken
      }
      following {
        userId
        userName
        imgUri
      }
      followers {
        userId
        userName
        imgUri
      }
      notifications {
        items {
          id
          userID
          ownerID
          postID
          notificationID
          read
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        name
        imageUri
        bio
        posts {
          nextToken
        }
        following {
          userId
          userName
          imgUri
        }
        followers {
          userId
          userName
          imgUri
        }
        notifications {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      videoUri
      description
      likes
      thumbnail
      category
      brand
      userID
      user {
        id
        username
        name
        imageUri
        bio
        posts {
          nextToken
        }
        following {
          userId
          userName
          imgUri
        }
        followers {
          userId
          userName
          imgUri
        }
        notifications {
          nextToken
        }
        createdAt
        updatedAt
      }
      songID
      song {
        id
        name
        imageUri
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          postId
          userID
          text
          likes
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        videoUri
        description
        likes
        thumbnail
        category
        brand
        userID
        user {
          id
          username
          name
          imageUri
          bio
          createdAt
          updatedAt
        }
        songID
        song {
          id
          name
          imageUri
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
        category
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      postId
      userID
      text
      likes
      user {
        id
        username
        name
        imageUri
        bio
        posts {
          nextToken
        }
        following {
          userId
          userName
          imgUri
        }
        followers {
          userId
          userName
          imgUri
        }
        notifications {
          nextToken
        }
        createdAt
        updatedAt
      }
      post {
        id
        videoUri
        description
        likes
        thumbnail
        category
        brand
        userID
        user {
          id
          username
          name
          imageUri
          bio
          createdAt
          updatedAt
        }
        songID
        song {
          id
          name
          imageUri
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postId
        userID
        text
        likes
        user {
          id
          username
          name
          imageUri
          bio
          createdAt
          updatedAt
        }
        post {
          id
          videoUri
          description
          likes
          thumbnail
          category
          brand
          userID
          songID
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSong = /* GraphQL */ `
  query GetSong($id: ID!) {
    getSong(id: $id) {
      id
      name
      imageUri
      createdAt
      updatedAt
    }
  }
`;
export const listSongs = /* GraphQL */ `
  query ListSongs(
    $filter: ModelSongFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSongs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        imageUri
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
      id
      message
      createdAt
      updatedAt
    }
  }
`;
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        message
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserNotification = /* GraphQL */ `
  query GetUserNotification($id: ID!) {
    getUserNotification(id: $id) {
      id
      userID
      ownerID
      postID
      user {
        id
        username
        name
        imageUri
        bio
        posts {
          nextToken
        }
        following {
          userId
          userName
          imgUri
        }
        followers {
          userId
          userName
          imgUri
        }
        notifications {
          nextToken
        }
        createdAt
        updatedAt
      }
      post {
        id
        videoUri
        description
        likes
        thumbnail
        category
        brand
        userID
        user {
          id
          username
          name
          imageUri
          bio
          createdAt
          updatedAt
        }
        songID
        song {
          id
          name
          imageUri
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      notificationID
      notification {
        id
        message
        createdAt
        updatedAt
      }
      read
      createdAt
      updatedAt
    }
  }
`;
export const listUserNotifications = /* GraphQL */ `
  query ListUserNotifications(
    $filter: ModelUserNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserNotifications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        ownerID
        postID
        user {
          id
          username
          name
          imageUri
          bio
          createdAt
          updatedAt
        }
        post {
          id
          videoUri
          description
          likes
          thumbnail
          category
          brand
          userID
          songID
          createdAt
          updatedAt
        }
        notificationID
        notification {
          id
          message
          createdAt
          updatedAt
        }
        read
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
