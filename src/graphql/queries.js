/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      createdAt
      id
      likes
      post {
        brand
        category
        comments {
          nextToken
        }
        createdAt
        description
        id
        likes
        song {
          createdAt
          id
          imageUri
          name
          updatedAt
        }
        songID
        thumbnail
        updatedAt
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
        userID
        videoUri
        views
      }
      postId
      text
      updatedAt
      user {
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
      userID
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
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      brand
      category
      comments {
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
      createdAt
      description
      id
      likes
      song {
        createdAt
        id
        imageUri
        name
        updatedAt
      }
      songID
      thumbnail
      updatedAt
      user {
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
      userID
      videoUri
      views
      hashTag
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
      posts {
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
      updatedAt
      username
      youtube
    }
  }
`;
export const getUserNotification = /* GraphQL */ `
  query GetUserNotification($id: ID!) {
    getUserNotification(id: $id) {
      createdAt
      id
      notification {
        createdAt
        id
        message
        updatedAt
      }
      notificationID
      ownerID
      post {
        brand
        category
        comments {
          nextToken
        }
        createdAt
        description
        id
        likes
        song {
          createdAt
          id
          imageUri
          name
          updatedAt
        }
        songID
        thumbnail
        updatedAt
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
        userID
        videoUri
        views
      }
      postID
      read
      updatedAt
      user {
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
      userID
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
        postId
        text
        updatedAt
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
        userID
      }
      nextToken
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
        comments {
          nextToken
        }
        createdAt
        description
        id
        likes
        song {
          createdAt
          id
          imageUri
          name
          updatedAt
        }
        songID
        thumbnail
        updatedAt
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
        userID
        videoUri
        views
        hashTag
      }
      nextToken
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
        notification {
          createdAt
          id
          message
          updatedAt
        }
        notificationID
        ownerID
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
        postID
        read
        updatedAt
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
        userID
      }
      nextToken
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
      nextToken
    }
  }
`;
