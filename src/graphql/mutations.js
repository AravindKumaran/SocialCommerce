/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      imageUri
      bio
      posts {
        items {
          id
          videoUri
          description
          likes
          thumbnail
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      imageUri
      bio
      posts {
        items {
          id
          videoUri
          description
          likes
          thumbnail
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      videoUri
      description
      likes
      thumbnail
      category
      brand
      userID
      createdAt
      updatedAt
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      videoUri
      description
      likes
      thumbnail
      userID
      user {
        id
        username
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      videoUri
      description
      likes
      thumbnail
      userID
      user {
        id
        username
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      postId
      userID
      text
      likes
      user {
        id
        username
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
        userID
        user {
          id
          username
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      postId
      userID
      text
      likes
      user {
        id
        username
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
        userID
        user {
          id
          username
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      postId
      userID
      text
      likes
      user {
        id
        username
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
        userID
        user {
          id
          username
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
export const createSong = /* GraphQL */ `
  mutation CreateSong(
    $input: CreateSongInput!
    $condition: ModelSongConditionInput
  ) {
    createSong(input: $input, condition: $condition) {
      id
      name
      imageUri
      createdAt
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
      id
      name
      imageUri
      createdAt
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
      id
      name
      imageUri
      createdAt
      updatedAt
    }
  }
`;
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
      id
      message
      createdAt
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
      id
      message
      createdAt
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
      id
      message
      createdAt
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
      id
      userID
      ownerID
      postID
      user {
        id
        username
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
        userID
        user {
          id
          username
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
export const updateUserNotification = /* GraphQL */ `
  mutation UpdateUserNotification(
    $input: UpdateUserNotificationInput!
    $condition: ModelUserNotificationConditionInput
  ) {
    updateUserNotification(input: $input, condition: $condition) {
      id
      userID
      ownerID
      postID
      user {
        id
        username
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
        userID
        user {
          id
          username
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
export const deleteUserNotification = /* GraphQL */ `
  mutation DeleteUserNotification(
    $input: DeleteUserNotificationInput!
    $condition: ModelUserNotificationConditionInput
  ) {
    deleteUserNotification(input: $input, condition: $condition) {
      id
      userID
      ownerID
      postID
      user {
        id
        username
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
        userID
        user {
          id
          username
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
