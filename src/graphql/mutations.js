/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $condition: ModelCommentConditionInput
    $input: CreateCommentInput!
  ) {
    createComment(condition: $condition, input: $input) {
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
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $condition: ModelNotificationConditionInput
    $input: CreateNotificationInput!
  ) {
    createNotification(condition: $condition, input: $input) {
      createdAt
      id
      message
      updatedAt
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $condition: ModelPostConditionInput
    $input: CreatePostInput!
  ) {
    createPost(condition: $condition, input: $input) {
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
    }
  }
`;
export const createSong = /* GraphQL */ `
  mutation CreateSong(
    $condition: ModelSongConditionInput
    $input: CreateSongInput!
  ) {
    createSong(condition: $condition, input: $input) {
      createdAt
      id
      imageUri
      name
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $condition: ModelUserConditionInput
    $input: CreateUserInput!
  ) {
    createUser(condition: $condition, input: $input) {
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
export const createUserNotification = /* GraphQL */ `
  mutation CreateUserNotification(
    $condition: ModelUserNotificationConditionInput
    $input: CreateUserNotificationInput!
  ) {
    createUserNotification(condition: $condition, input: $input) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $condition: ModelCommentConditionInput
    $input: DeleteCommentInput!
  ) {
    deleteComment(condition: $condition, input: $input) {
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
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $condition: ModelNotificationConditionInput
    $input: DeleteNotificationInput!
  ) {
    deleteNotification(condition: $condition, input: $input) {
      createdAt
      id
      message
      updatedAt
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $condition: ModelPostConditionInput
    $input: DeletePostInput!
  ) {
    deletePost(condition: $condition, input: $input) {
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
    }
  }
`;
export const deleteSong = /* GraphQL */ `
  mutation DeleteSong(
    $condition: ModelSongConditionInput
    $input: DeleteSongInput!
  ) {
    deleteSong(condition: $condition, input: $input) {
      createdAt
      id
      imageUri
      name
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $condition: ModelUserConditionInput
    $input: DeleteUserInput!
  ) {
    deleteUser(condition: $condition, input: $input) {
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
export const deleteUserNotification = /* GraphQL */ `
  mutation DeleteUserNotification(
    $condition: ModelUserNotificationConditionInput
    $input: DeleteUserNotificationInput!
  ) {
    deleteUserNotification(condition: $condition, input: $input) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $condition: ModelCommentConditionInput
    $input: UpdateCommentInput!
  ) {
    updateComment(condition: $condition, input: $input) {
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
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $condition: ModelNotificationConditionInput
    $input: UpdateNotificationInput!
  ) {
    updateNotification(condition: $condition, input: $input) {
      createdAt
      id
      message
      updatedAt
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $condition: ModelPostConditionInput
    $input: UpdatePostInput!
  ) {
    updatePost(condition: $condition, input: $input) {
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
    }
  }
`;
export const updateSong = /* GraphQL */ `
  mutation UpdateSong(
    $condition: ModelSongConditionInput
    $input: UpdateSongInput!
  ) {
    updateSong(condition: $condition, input: $input) {
      createdAt
      id
      imageUri
      name
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $condition: ModelUserConditionInput
    $input: UpdateUserInput!
  ) {
    updateUser(condition: $condition, input: $input) {
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
export const updateUserNotification = /* GraphQL */ `
  mutation UpdateUserNotification(
    $condition: ModelUserNotificationConditionInput
    $input: UpdateUserNotificationInput!
  ) {
    updateUserNotification(condition: $condition, input: $input) {
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
export const createHashTag = /* GraphQL */ `
  mutation CreateHashTag(
    $input: CreateHashTagInput!
    $condition: ModelHashTagConditionInput
  ) {
    createHashTag(input: $input, condition: $condition) {
      createdAt
      id
      name
      updatedAt
    }
  }
`;
export const updateHashTag = /* GraphQL */ `
  mutation UpdateHashTag(
    $input: UpdateHashTagInput!
    $condition: ModelHashTagConditionInput
  ) {
    updateHashTag(input: $input, condition: $condition) {
      createdAt
      id
      name
      updatedAt
    }
  }
`;
export const deleteHashTag = /* GraphQL */ `
  mutation DeleteHashTag(
    $input: DeleteHashTagInput!
    $condition: ModelHashTagConditionInput
  ) {
    deleteHashTag(input: $input, condition: $condition) {
      createdAt
      id
      name
      updatedAt
    }
  }
`;
export const createPostHashTag = /* GraphQL */ `
  mutation CreatePostHashTag(
    $input: CreatePostHashTagInput!
    $condition: ModelPostHashTagConditionInput
  ) {
    createPostHashTag(input: $input, condition: $condition) {
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
export const updatePostHashTag = /* GraphQL */ `
  mutation UpdatePostHashTag(
    $input: UpdatePostHashTagInput!
    $condition: ModelPostHashTagConditionInput
  ) {
    updatePostHashTag(input: $input, condition: $condition) {
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
export const deletePostHashTag = /* GraphQL */ `
  mutation DeletePostHashTag(
    $input: DeletePostHashTagInput!
    $condition: ModelPostHashTagConditionInput
  ) {
    deletePostHashTag(input: $input, condition: $condition) {
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
