/**
  Title:       SpotSale
  IDs:         301208156, 301236904, 301251832, 301313468, 301268678
  Description: logic for creating and editing a product ad.
*/
import {Component, ElementRef, ViewChild} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductRepository } from "../model/product.repository";
import { Product } from "../model/product.model";
import { RestDataSource } from "../model/rest.datasource";


@Component({
    templateUrl: "adv.component.html",
    styleUrls: ["adv.component.css"]
})

export class AdvComponent {
    pageTitle: string = 'Ads';
    submitted: boolean = false;
    public product: Product = new Product();
    @ViewChild('btnAddQuestion') btnAddQuestion: ElementRef;
    @ViewChild('Q&A') QA: ElementRef;


    constructor(private repository: ProductRepository,
        private router: Router,
        activeRoute: ActivatedRoute,
        private dataSource: RestDataSource) {

        Object.assign(this.product,
                repository.getProduct(activeRoute.snapshot.params["id"]));
    }

    belongsToThisSessionUser(product: Product): boolean {
        return (product.owner == this.dataSource.user_id);
    }

    addQuestion(){
        var newBalloon = document.createElement("div");
        newBalloon.className="commentl";
        var newQuestion = document.createElement("textarea");
        newBalloon.appendChild(newQuestion);
        newQuestion.style.width = "80%";
        newQuestion.style.marginLeft = "2.5%";
        var send = document.createElement("button");
        newBalloon.appendChild(send);
        send.innerHTML = "Send";
        send.className = "badge badge-warning align-self-end float-right send";
        send.addEventListener("click",
            ()=>{
                this.btnAddQuestion.nativeElement.style.display = "block";
                var questionText = this.QA.nativeElement.firstChild.firstChild.value;
                this.QA.nativeElement.removeChild(this.QA.nativeElement.firstChild);
                // console.log(questionText);
                // this.QA.nativeElement.firstChild.innerHTML = "<p>" + questionText + "</p>";
                this.product.questionAnswer.unshift({
                    question: questionText,
                    answer: ""
                })
                console.log(this.product)

                this.repository.sendQuestion(this.product);
            }
        );
        this.btnAddQuestion.nativeElement.style.display = "none";
        this.QA.nativeElement.insertBefore(newBalloon, this.QA.nativeElement.firstChild);
        console.log(this.QA);
    }
}