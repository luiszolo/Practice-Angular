import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.components.html',
  styleUrls : ['./post-list.component.css']
})
export class PostListComponent {
  @Input() posts = [];

}
