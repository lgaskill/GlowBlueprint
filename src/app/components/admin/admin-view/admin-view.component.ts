import { Component } from "@angular/core";

const VIEWS: any = {
  BLOG: "",
  USERS: "",
  OTHER: ""
};

@Component({
  selector: "admin-view",
  templateUrl: "./admin-view.component.html",
  styleUrls: ["./admin-view.component.scss"]
})
export class AdminViewComponent {
  selectedView: string = "BLOG";

  onSelectedViewChange(selected: string) {
    this.selectedView = selected;
  }
}
