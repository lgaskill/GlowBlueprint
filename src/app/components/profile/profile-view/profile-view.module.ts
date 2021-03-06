import { NgModule } from "@angular/core";
import { ProfileViewComponent } from "./profile-view.component";
import { SharedModule } from "../../shared/shared.module";
import { AppBarModule } from "../../shared/app-bar/app-bar.module";
import { ContactInfoPanelModule } from "../contact-info-panel/contact-info-panel.module";
import { NavMenuButtonModule } from "../../shared/nav-menu-button/nav-menu-button.module";
import { HealthHistoryPanelModule } from "../health-history-panel/health-history-panel.module";

@NgModule({
  imports: [
    SharedModule,
    AppBarModule,
    ContactInfoPanelModule,
    HealthHistoryPanelModule,
    NavMenuButtonModule
  ],
  declarations: [ProfileViewComponent],
  providers: []
})
export class ProfileViewModule {}
