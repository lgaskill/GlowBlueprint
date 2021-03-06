import { NgModule } from "@angular/core";
import { AdminViewComponent } from "./admin-view.component";
import { SharedModule } from "../../shared/shared.module";
import { AppBarModule } from "../../shared/app-bar/app-bar.module";
import { BlogPostCreatorModule } from "../blog-post-creator/blog-post-creator.module";
import { UserListModule } from "../user-list/user-list.module";

@NgModule({
  imports: [SharedModule, AppBarModule, BlogPostCreatorModule, UserListModule],
  declarations: [AdminViewComponent],
  providers: []
})
export class AdminViewModule {}
