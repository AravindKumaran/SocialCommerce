/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createSong = /* GraphQL */ `
  mutation CreateSong(
    $input: CreateSongInput!
    $condition: ModelSongConditionInput
  ) {
    createSong(input: $input, condition: $condition) {
      createdAt
      id
      imageUri
      name
      updatedAt
    }
  }
`;
export const updateSong = /* GraphQL */ `
  mutation UpdateSong(
    $input: UpdateSongInput!
    $condition: ModelSongConditionInput
  ) {
    updateSong(input: $input, condition: $condition) {
      createdAt
      id
      imageUri
      name
      updatedAt
    }
  }
`;
export const deleteSong = /* GraphQL */ `
  mutation DeleteSong(
    $input: DeleteSongInput!
    $condition: ModelSongConditionInput
  ) {
    deleteSong(input: $input, condition: $condition) {
      createdAt
      id
      imageUri
      name
      updatedAt
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
      createdAt
      id
      message
      updatedAt
    }
  }
`;
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
      createdAt
      id
      message
      updatedAt
    }
  }
`;
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
      createdAt
      id
      message
      updatedAt
    }
  }
`;
export const createUserNotification = /* GraphQL */ `
  mutation CreateUserNotification(
    $input: CreateUserNotificationInput!
    $condition: ModelUserNotificationConditionInput
  ) {
    createUserNotification(input: $input, condition: $condition) {
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
export const updateUserNotification = /* GraphQL */ `
  mutation UpdateUserNotification(
    $input: UpdateUserNotificationInput!
    $condition: ModelUserNotificationConditionInput
  ) {
    updateUserNotification(input: $input, condition: $condition) {
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
export const deleteUserNotification = /* GraphQL */ `
  mutation DeleteUserNotification(
    $input: DeleteUserNotificationInput!
    $condition: ModelUserNotificationConditionInput
  ) {
    deleteUserNotification(input: $input, condition: $condition) {
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
