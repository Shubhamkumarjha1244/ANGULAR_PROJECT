import { Component, Input, OnInit,ViewChild ,Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { baseURL } from '../shared/baseurl';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

    dish:Dish;
    baseURL=baseURL;
    errMess: string;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,) {
      this.createForm();
     }

    commentForm: FormGroup;
    dishIds: string[];
    prev: string;
    next: string;



    formErrors = {
      'author': '',
      'comment': '',

    };
  
    validationMessages = {
      'author': {
        'required':      'Author is required.',
        'minlength':     'Author must be at least 2 characters long.',
        
      },
      
      'comment': {
        'required':      'comment is required.',
        'minlength':     'comment must be at least 2 characters long.',
        
      },

      
    };

    @ViewChild('fform') feedbackFormDirective:any;

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];
    //  this.dishservice.getDish(id)
    // .subscribe(dish => this.dish = dish)

    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds,errmess => this.errMess = <any>errmess);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); },errmess => this.errMess = <any>errmess);
    

  }
  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];   //for setting prev and next value
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)] ],
      
      comment: ['',[Validators.required]],

      rating: ['1'],

      date: Date(),


    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

  this.onValueChanged(); // 
    
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
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

  onSubmit() {
    
    console.log(this.dish.comments);
   
    console.log(this.commentForm.value);
    this.dish.comments.push(this.commentForm.value);
    
    this.feedbackFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      rating: ['5'],
      date:Date(),
      comment: ''
      
    });
  }

}
