import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {
 private posts: Post[] = [];
 private postsUpdated =  new Subject<Post[]>();

getPost() {
  return [...this.posts];
}

getpostUpdateListener() {
  return this.postsUpdated.asObservable();
}
 addPost(titleS: string, contentS: string) {
   const post: Post = {title: titleS, content: contentS};
   this.posts.push(post);
   this.postsUpdated.next([...this.posts]);
 }
}
