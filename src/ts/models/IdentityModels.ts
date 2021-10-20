/**
* IdentityModels.tsx
* Copyright: Microsoft 2018
*
* Type definitions for user identities.
*/

export interface User {
    id: string;
    bio: string
    email: string
    name: string
    createdAt:string
    updatedAt:string
    emailVerified:boolean;
    photo_1: string
    photo_2: string
    photo_3: string
    token:string
    photo_4: string
    type: string    
    latitud:number
    longitud:number
    plan:string
    Post:Post[]
    Favorite:Favorite[]
}

export interface Post {
    content: string
    id: number
    photo_1: string
    photo_2: string
    photo_3: string
    photo_4: string
    quantity:number
    price: number
    published: boolean
    title: string
    authorId:  number
  }
   
export interface  Favorite {
    id       : number
    photo_1  : string
    name     : string
    follower : string
    bio      : string
    userId   : number
  }
  
export interface  Guardado {
  id       : number
  photo_1  : string
  title     : string
  follower : string
  content      : string
  userId   : number
}
export interface  Message {
  id       : number
  timestamp: number
  text :  Text
  authorId:string
  type   : string
  status   : string
}
export interface  Chat {
  id       : number
  receiver: string
  sender  : string
  Message : []
}
