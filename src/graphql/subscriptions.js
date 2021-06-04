/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateSong = /* GraphQL */ `
  subscription OnCreateSong {
    onCreateSong {
      createdAt
      id
      imageUri
      name
      updatedAt
    }
  }
`;
export const onUpdateSong = /* GraphQL */ `
  subscription OnUpdateSong {
    onUpdateSong {
      createdAt
      id
      imageUri
      name
      updatedAt
    }
  }
`;
export const onDeleteSong = /* GraphQL */ `
  subscription OnDeleteSong {
    onDeleteSong {
      createdAt
      id
      imageUri
      name
      updatedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification {
    onCreateNotification {
      createdAt
      id
      message
      updatedAt
    }
  }
`;
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification {
    onUpdateNotification {
      createdAt
      id
      message
      updatedAt
    }
  }
`;
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification {
    onDeleteNotification {
      createdAt
      id
      message
      updatedAt
    }
  }
`;
export const onCreateUserNotification = /* GraphQL */ `
  subscription OnCreateUserNotification {
    onCreateUserNotification {
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
export const onUpdateUserNotification = /* GraphQL */ `
  subscription OnUpdateUserNotification {
    onUpdateUserNotification {
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
export const onDeleteUserNotification = /* GraphQL */ `
  subscription OnDeleteUserNotification {
    onDeleteUserNotification {
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
