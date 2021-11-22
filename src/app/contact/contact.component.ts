import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { expand, flyInOut, visibility } from '../animation/app.animation';
import { Feedback, ContactType } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),visibility(),expand()
    ]
})
export class ContactComponent implements OnInit {

  

  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbackcopy:Feedback;
  contactType = ContactType;
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };
 

  @ViewChild('fform') feedbackFormDirective!:any;
  errMess: any;
  suceesmsg: boolean=false;
  openfeed:boolean=false ;
  feedbacks: Feedback[];
fback:Feedback[];



  constructor(private fb: FormBuilder,private feedbackservice: FeedbackService,) { 
    this.createForm();
  }

  ngOnInit(): void {
    
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

  this.onValueChanged(); // (re)set validation messages now
    
  }
  onSubmit() {
    this.suceesmsg=true;
    this.feedback = this.feedbackForm.value;
    this.feedbackcopy=this.feedbackForm.value;
    this.feedbackservice.submitFeedback(this.feedbackcopy)
      .subscribe(feedback => {
        this.feedback = feedback; 
        this.feedbackcopy = feedback;
        this.suceesmsg=false;
        this.openfeed=true;
        setTimeout(()=>{this.openfeed=false;console.log("hi");},5000);

        this.feedbacks.push(this.feedbackForm.value);
      },
      
      errmess => { this.feedback = null;this.feedbackcopy=null; this.errMess = <any>errmess; }
      );

     
      
    console.log(this.feedback);
    console.log("feedback copy data",this.feedbackcopy);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }

  
  
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' '; 
            }
          }
        }
      }
    }
  }

}
