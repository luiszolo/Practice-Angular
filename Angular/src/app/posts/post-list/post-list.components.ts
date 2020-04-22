import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../post.service';

import { post } from '../../../../node_modules/@types/selenium-webdriver/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.components.html',
  styleUrls : ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postService: PostsService) {

  }
  ngOnInit() {
    this.postService.getPost();
    this.postsSub = this.postService.getpostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
    }

    onDelete(postId: string) {
      this.postService.deletePost(postId);
    }

    ngOnDestroy() {
      this.postsSub.unsubscribe();
    }
}
