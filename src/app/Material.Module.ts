import { NgModule } from "@angular/core";
import {MatButtonModule} from "@angular/material/button"
import {MatCardModule} from "@angular/material/card"
import {MatInputModule} from "@angular/material/input"
import {MatSelectModule} from "@angular/material/select"
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatDialogModule} from "@angular/material/dialog"
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatIconModule} from "@angular/material/icon"
import {MatMenuModule} from "@angular/material/menu"
import {MatSnackBarModule} from "@angular/material/snack-bar"
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner"
@NgModule({
    exports: [
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatDialogModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatSnackBarModule,
        MatProgressSpinnerModule
    ]
})
export class MaterialModule{

}