import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  today: Date = new Date();

  constructor(private usersService: UsersService) {}
  userForm!: FormGroup;
  ngOnInit(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      passportNumber: new FormControl('', [
        Validators.required,
        this.checkPassportValidation,
        this.checkBannedPassport.bind(this),
      ]),
      birthday: new FormControl(null, [Validators.required]),
      jobPosition: new FormControl(null, [Validators.required]),
      hireDate: new FormControl(null, [
        Validators.required,
        this.checkHireDateValidation.bind(this),
      ]),
    });
  }
  public onSubmit() {
    this.usersService.postUsers(this.userForm.value);
    this.userForm.reset();
  }

  public valid(input: string) {
    return (
      !this.userForm.get(input)?.valid && this.userForm.get(input)?.touched
    );
  }
  public isRequired(input: string) {
    return (
      this.userForm.hasError('required', input) &&
      this.userForm.get(input)!.touched
    );
  }
  public isValid(input: string, validator: string) {
    return (
      !this.userForm.hasError('required', input) &&
      this.userForm.get(input)!.touched &&
      this.userForm.hasError(validator, input)
    );
  }
  public checkBannedPassport(
    control: FormControl
  ): { [e: string]: boolean } | null {
    if (
      this.usersService.users
        .map((user) => user.passportNumber)
        .indexOf(control.value) !== -1
    )
      return { isBanned: true };

    return null;
  }
  public checkPassportValidation(
    control: FormControl
  ): { [e: string]: boolean } | null {
    if (control.value == null) return { isInvalid: true };

    let code: string[] = control.value.toString().split('').reverse();
    if (code.length > 11 || code.length < 8) return { isInvalid: true };
    while (code.length < 10) {
      code.unshift('0');
    }
    const controlNumber = +code[0];

    code = code.slice(1);
    let sum = 0;

    code.map((el: string, i: number) => {
      sum = sum + +el * (i + 2);
    });

    const r = sum % 11;
    if ((r < 2 && controlNumber === r) || (r >= 2 && controlNumber === 11 - r))
      return null;
    return { isInvalid: true };
  }
  public checkHireDateValidation(
    control: FormControl
  ): { [e: string]: boolean } | null {
    if (control.value == null) return { isInvalid: true };
    if (
      this.dateToDey(this.userForm.value.birthday) >=
      this.dateToDey(control.value)
    ) {
      return { isInvalid: true };
    }

    return null;
  }
  public dateToDey(date: string): number {
    return (
      +date.split('-')[0] * 365 + +date.split('-')[1] * 30 + +date.split('-')[2]
    );
  }
}
