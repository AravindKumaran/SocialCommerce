/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      username
      name
      imageUri
      bio
      languages
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      username
      name
      imageUri
      bio
      languages
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      username
      name
      imageUri
      bio
      languages
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
        languages
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
        languages
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
        languages
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
        languages
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
          languages
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
        languages
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
          languages
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
        languages
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
          languages
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
export const onCreateSong = /* GraphQL */ `
  subscription OnCreateSong {
    onCreateSong {
      id
      name
      imageUri
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSong = /* GraphQL */ `
  subscription OnUpdateSong {
    onUpdateSong {
      id
      name
      imageUri
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSong = /* GraphQL */ `
  subscription OnDeleteSong {
    onDeleteSong {
      id
      name
      imageUri
      createdAt
      updatedAt
    }
  }
`;
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification {
    onCreateNotification {
      id
      message
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification {
    onUpdateNotification {
      id
      message
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification {
    onDeleteNotification {
      id
      message
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUserNotification = /* GraphQL */ `
  subscription OnCreateUserNotification {
    onCreateUserNotification {
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
        languages
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
          languages
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
export const onUpdateUserNotification = /* GraphQL */ `
  subscription OnUpdateUserNotification {
    onUpdateUserNotification {
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
        languages
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
          languages
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
export const onDeleteUserNotification = /* GraphQL */ `
  subscription OnDeleteUserNotification {
    onDeleteUserNotification {
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
        languages
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
          languages
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
