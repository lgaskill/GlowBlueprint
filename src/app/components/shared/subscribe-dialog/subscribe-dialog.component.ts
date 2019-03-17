import { Component, Inject } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import {
  MatSnackBar,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from "@angular/material";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "subscribe-dialog",
  templateUrl: "./subscribe-dialog.component.html",
  styleUrls: ["./subscribe-dialog.component.scss"]
})
export class SubscribeDialogComponent {
  emailForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SubscribeDialogComponent>,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      email: ["", Validators.email]
    });
  }

  getEmailErrorMessage() {
    return this.emailForm.controls.email.hasError("email")
      ? "Not a valid email"
      : "";
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  async onSubmit(): Promise<void> {
    if (!this.emailForm.controls.email.value || !this.emailForm.valid) {
      return;
    }

    try {
      await this.apiService.put<any>(
        "/user_group/add/5c7897d8064ee548906faee3",
        { value: this.emailForm.controls.email.value }
      );
    } catch (err) {
      console.error(err);
      this.snackBar.open("Failed to subscribe", "", {
        duration: 2000
      });
    }

    this.snackBar.open("You did it!", "", {
      duration: 2000
    });

    this.dialogRef.close({ subscribed: true });
  }
}