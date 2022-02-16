import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { PostsService } from 'src/app/services/api/posts/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  isLoading: boolean = true;
  posts: Post[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.subscription = this.postsService
      .getPosts()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
      });

      this.subscription = this.postsService.onDeletePost().subscribe((id: any) => {
        this.posts = this.posts.filter(post => post._id !== id);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
