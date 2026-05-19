import { Component } from "@angular/core";
import { IonIcon, IonTabBar, IonTabButton, IonTabs, IonLabel } from "@ionic/angular/standalone";

import { addIcons } from "ionicons";
import { home, gameController, settings, personOutline, statsChart } from "ionicons/icons";

@Component({
    selector: "app-tabs",
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.scss"],
    imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsComponent {
    constructor() {
        addIcons({ home, gameController, settings, personOutline, statsChart });
    }
}