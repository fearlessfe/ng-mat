import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // this.form = new FormGroup({
    //   email: new FormControl('wang@163.com',Validators.compose([Validators.required,Validators.email]) ),
    //   password: new FormControl('',Validators.required)
    // });
    this.form = this.fb.group({
      email: ['wang@163.com',Validators.compose([Validators.required, Validators.email, this.validate])],
      password: ['',Validators.required]
    })
  }

  onSubmit({value,valid}, ev: Event){
    ev.preventDefault();
    console.log(JSON.stringify(value));
    console.log(JSON.stringify(valid));
    //动态验证
    //this.form.controls['email'].setValidators(this.validate);
  }

  //自定义验证
  validate(fc: FormControl): {[key: string] : any} {
    if(!fc.value) {
      return null;
    }
    const pattern = /^wang+/;
    if(pattern.test(fc.value)) {
      return null;
    }
    return {
      emailNotValid: 'The email must start with wang'
    }
  }
}
