import { Component, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BlogService } from "src/app/services/blog.service";
import {
  DropzoneConfigInterface,
  DropzoneComponent
} from "ngx-dropzone-wrapper";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "blog-post-creator",
  templateUrl: "./blog-post-creator.component.html",
  styleUrls: ["./blog-post-creator.component.scss"]
})
export class BlogPostCreatorComponent {
  categories: String[] = [];
  form: FormGroup;
  isDraft: boolean = true;

  dropzoneConfig: DropzoneConfigInterface = {
    autoProcessQueue: false,
    clickable: true,
    maxFiles: 1,
    maxFilesize: 50000000,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    addRemoveLinks: true,
    headers: {
      Authorization: `Token ${this.authService.getCurrentUser().token}`
    }
  };

  @ViewChild(DropzoneComponent) dropzoneRef?: DropzoneComponent;

  constructor(
    private blogService: BlogService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.form = this.formBuilder.group({
      category: ["", Validators.required],
      editor: [""],
      title: ["", Validators.required]
    });

    // Get all known categories
    this.categories = await this.blogService.getCategories();
  }

  onUploadSuccess([ev, res]) {
    this.postBlogPost(res._id);
  }

  async onCreate(isDraft: boolean = false) {
    if (!this.form.valid) {
      this.snackBar.open("Whoops...You missed a field :b", "", {
        duration: 2000
      });
      return;
    }

    this.isDraft = isDraft;

    // Upload image if one is specified
    const files = this.dropzoneRef.directiveRef.dropzone().getQueuedFiles();

    if (files && files.length) {
      this.dropzoneRef.directiveRef.dropzone().processQueue();

      // This kicks-off a processing event in the dropzone component.
      // When the upload completes, it will trigger "onUploadSuccess()"
      // which will call the post method and complete the creation.
      // (Doing it this way because dropzone doesn't beleive in callbacks or Promises :/)
      return;
    }

    this.postBlogPost();
  }

  async postBlogPost(imageId: string = null) {
    try {
      const res = await this.blogService.createBlogPost({
        isDraft: this.isDraft,
        title: this.form.controls.title.value,
        body: this.form.controls.editor.value,
        category: this.form.controls.category.value,
        mainImageId: imageId
      });

      this.router.navigate([`/blog/${res._id}`]);
    } catch (err) {
      this.snackBar.open("Dang, something went wrong :/", "", {
        duration: 2000
      });
      console.log(err);
    }
  }
}
