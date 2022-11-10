import { Component, OnInit } from '@angular/core';
import { Plans } from '../../entities/plans/plans';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonpClientBackend } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {


  constructor(private router: ActivatedRoute, private myroute: Router, private snack: MatSnackBar, private auth: AuthService, private user: UsersService) { }

  plan: Plans;
  id: any;
  Quantity: any;
  password: any;

  subscription_plan: string;

  ngOnInit(): void {
    // console.log(this.auth.isSubscribed());
    if (!(this.auth.isSignedIn())) {
      this.snack.open('You\'re not an SignedIn', "Dismiss", { duration: 3000 });
      this.myroute.navigate(['/home'])
      return
    }


    this.router.queryParams.subscribe(params => {
      this.id = (params).id;
      //console.log(this.id)

      const getData = JSON.parse(window.localStorage.getItem("plans"));
      //console.log(getData)
      getData.forEach(el => {
        if (el._id == this.id) {
          this.plan = el;
        }
      });
      //console.log(this.plan)
    },
      err => {
        this.snack.open("Error" + err.error?.message, "Dismiss", { duration: 1000 });
        console.error('Error ', err.err?.message);
        this.myroute.navigate(['/plans']);
      });
  }
  userdata: any;

  Pay() {
    let mon = 30;
    let res: number = mon * this.Quantity;

    //get user id 
    let userID = JSON.parse(localStorage.getItem('user'))._id;

    //update user
    this.user.updateUser(userID, { subscription_plan: this.id, password: this.password }).subscribe(
      (res) => {
        this.snack.open("Plan Purchased Successful", "Dismiss", { duration: 1000 });
      },
      (err) => {
        this.snack.open("Plan Purchase Failed" + err.error?.message, "Dismiss", { duration: 1000 });
        console.log(err ? err : err.message);
      });

    //get updated  details
    this.user.getUser(userID).subscribe((res) => {
      this.userdata = res;
      localStorage.setItem('user', JSON.stringify(this.userdata));
    }, (err) => {
      this.snack.open("Update User " + err.error?.message, "Dismiss", { duration: 1000 });
    });
  }
}
