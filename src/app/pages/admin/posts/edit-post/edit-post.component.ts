import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { PostsService } from 'src/app/services/api/posts/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  title: string = '';
  postImage: string = '';
  postContent: string = '';
  buttonDisabled: boolean = true;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    const id: any = this.route.snapshot.paramMap.get('id');
    this.subscription = this.postsService
      .getPost(id)
      .subscribe((post: Post) => {
        console.log(post);
        this.title = post.title;
        this.postImage = post.image;
        this.postContent = post.content;
      });
  }

  openBackDropCustomClass(content: any) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  openWindowCustomClass(content: any) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  onAddImage(): void {}
}
