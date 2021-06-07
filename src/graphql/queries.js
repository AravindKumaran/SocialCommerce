/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      bio
      createdAt
      facebook
      followers {
        imgUri
        userId
        userName
      }
      following {
        imgUri
        userId
        userName
      }
      id
      imageUri
      instagram
      languages
      name
      notifications {
        nextToken
      }
      posts {
        nextToken
      }
      updatedAt
      username
      youtube
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
        bio
        createdAt
        facebook
        id
        imageUri
        instagram
        languages
        name
        updatedAt
        username
        youtube
      }
      nextToken
    }
  }
`;
export const getSong = /* GraphQL */ `
  query GetSong($id: ID!) {
    getSong(id: $id) {
      createdAt
      id
      imageUri
      name
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
        createdAt
        id
        imageUri
        name
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      brand
      category
      comments {
        nextToken
      }
      createdAt
      description
      id
      likes
      songID
      song {
        createdAt
        id
        imageUri
        name
        updatedAt
      }
      thumbnail
      updatedAt
      userID
      user {
        bio
        createdAt
        facebook
        id
        imageUri
        instagram
        languages
        name
        updatedAt
        username
        youtube
      }
      videoUri
      views
      hashTag {
        nextToken
      }
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
        brand
        category
        createdAt
        description
        id
        likes
        songID
        thumbnail
        updatedAt
        userID
        videoUri
        views
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      createdAt
      id
      likes
      postId
      post {
        brand
        category
        createdAt
        description
        id
        likes
        songID
        thumbnail
        updatedAt
        userID
        videoUri
        views
      }
      text
      updatedAt
      userID
      user {
        bio
        createdAt
        facebook
        id
        imageUri
        instagram
        languages
        name
        updatedAt
        username
        youtube
      }
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
        createdAt
        id
        likes
        postId
        text
        updatedAt
        userID
      }
      nextToken
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
      createdAt
      id
      message
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
        createdAt
        id
        message
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserNotification = /* GraphQL */ `
  query GetUserNotification($id: ID!) {
    getUserNotification(id: $id) {
      createdAt
      id
      notificationID
      notification {
        createdAt
        id
        message
        updatedAt
      }
      ownerID
      postID
      post {
        brand
        category
        createdAt
        description
        id
        likes
        songID
        thumbnail
        updatedAt
        userID
        videoUri
        views
      }
      read
      updatedAt
      userID
      user {
        bio
        createdAt
        facebook
        id
        imageUri
        instagram
        languages
        name
        updatedAt
        username
        youtube
      }
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
        createdAt
        id
        notificationID
        ownerID
        postID
        read
        updatedAt
        userID
      }
      nextToken
    }
  }
`;
export const getHashTag = /* GraphQL */ `
  query GetHashTag($id: ID!) {
    getHashTag(id: $id) {
      createdAt
      id
      name
      updatedAt
    }
  }
`;
export const listHashTags = /* GraphQL */ `
  query ListHashTags(
    $filter: ModelHashTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHashTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        id
        name
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPostHashTag = /* GraphQL */ `
  query GetPostHashTag($id: ID!) {
    getPostHashTag(id: $id) {
      createdAt
      id
      hashTagID
      hashTag {
        createdAt
        id
        name
        updatedAt
      }
      postID
      post {
        brand
        category
        createdAt
        description
        id
        likes
        songID
        thumbnail
        updatedAt
        userID
        videoUri
        views
      }
      updatedAt
    }
  }
`;
export const listPostHashTags = /* GraphQL */ `
  query ListPostHashTags(
    $filter: ModelPostHashTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostHashTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        id
        hashTagID
        postID
        updatedAt
      }
      nextToken
    }
  }
`;
