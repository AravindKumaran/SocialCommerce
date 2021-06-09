/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      createdAt
      id
      likes
      post {
        brand
        category
        languages
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      brand
      category
      languages
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
          languages
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
      supports {
        nextToken
      }
    }
  }
`;
export const onCreateUserNotification = /* GraphQL */ `
  subscription OnCreateUserNotification {
    onCreateUserNotification {
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
        languages
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      createdAt
      id
      likes
      post {
        brand
        category
        languages
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
      brand
      category
      languages
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
          languages
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
      supports {
        nextToken
      }
    }
  }
`;
export const onDeleteUserNotification = /* GraphQL */ `
  subscription OnDeleteUserNotification {
    onDeleteUserNotification {
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
        languages
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      createdAt
      id
      likes
      post {
        brand
        category
        languages
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      brand
      category
      languages
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
          languages
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
      supports {
        nextToken
      }
    }
  }
`;
export const onUpdateUserNotification = /* GraphQL */ `
  subscription OnUpdateUserNotification {
    onUpdateUserNotification {
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
        languages
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
export const onCreateHashTag = /* GraphQL */ `
  subscription OnCreateHashTag {
    onCreateHashTag {
      createdAt
      id
      name
      updatedAt
    }
  }
`;
export const onUpdateHashTag = /* GraphQL */ `
  subscription OnUpdateHashTag {
    onUpdateHashTag {
      createdAt
      id
      name
      updatedAt
    }
  }
`;
export const onDeleteHashTag = /* GraphQL */ `
  subscription OnDeleteHashTag {
    onDeleteHashTag {
      createdAt
      id
      name
      updatedAt
    }
  }
`;
export const onCreatePostHashTag = /* GraphQL */ `
  subscription OnCreatePostHashTag {
    onCreatePostHashTag {
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
        languages
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
export const onUpdatePostHashTag = /* GraphQL */ `
  subscription OnUpdatePostHashTag {
    onUpdatePostHashTag {
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
        languages
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
export const onDeletePostHashTag = /* GraphQL */ `
  subscription OnDeletePostHashTag {
    onDeletePostHashTag {
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
        languages
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
export const onCreateSupport = /* GraphQL */ `
  subscription OnCreateSupport {
    onCreateSupport {
      createdAt
      id
      query
      message
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
      updatedAt
    }
  }
`;
export const onUpdateSupport = /* GraphQL */ `
  subscription OnUpdateSupport {
    onUpdateSupport {
      createdAt
      id
      query
      message
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
      updatedAt
    }
  }
`;
export const onDeleteSupport = /* GraphQL */ `
  subscription OnDeleteSupport {
    onDeleteSupport {
      createdAt
      id
      query
      message
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
      updatedAt
    }
  }
`;
