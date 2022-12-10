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
                var questionText = this.QA.nativeElement.firstChild.firstChild.value;
                if(questionText != ""){
                    this.btnAddQuestion.nativeElement.style.display = "block";
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
            }
        );
        this.btnAddQuestion.nativeElement.style.display = "none";
        this.QA.nativeElement.insertBefore(newBalloon, this.QA.nativeElement.firstChild);
        console.log(this.QA);
    }

    answer(questionIndex: number){
        this.QA.nativeElement.children[questionIndex].getElementsByTagName("button")[0].style.display = "none";
        // console.log(questionIndex);


        var newBalloon = document.createElement("div");
        newBalloon.className="commentr";
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
                var answerText = this.QA.nativeElement.children[questionIndex].children[1].firstChild.value;
                if(answerText != ""){
                // this.btnAddQuestion.nativeElement.style.display = "block";
                // console.log(this.QA.nativeElement.children[questionIndex].getElementsByTagName("button"));
                // console.log(this.QA.nativeElement.children[questionIndex].getElementsByTagName("button")[0]);
                this.QA.nativeElement.children[questionIndex].removeChild(this.QA.nativeElement.children[questionIndex].children[1]);
                // console.log(answerText);
                // this.QA.nativeElement.children[questionIndex].children[1].innerHTML = "<p>" + answerText + "</p>";
                // this.product.questionAnswer.unshift({
                //     question: questionText,
                //     answer: ""
                // })
                this.product.questionAnswer[questionIndex].answer = answerText;
                // console.log(this.product)
                // console.log(this.product.questionAnswer[questionIndex]._id);

                this.repository.sendAnswer(this.product, this.product.questionAnswer[questionIndex]._id, answerText);
                }
            }
        );
        // console.log(this.QA.nativeElement.getElementsByClassName('commentl'));
        // this.QA.nativeElement.insertBefore(newBalloon, this.QA.nativeElement.getElementsByClassName('commentl')[0]);
        // console.log(this.QA.nativeElement);
        // console.log(this.QA.nativeElement.getElementsByClassName('commentl'))
        // console.log(this.QA.nativeElement.getElementsByClassName('commentl')[0])
        // this.QA.nativeElement.insertBefore(newBalloon, this.QA.nativeElement.children[1]);
        this.QA.nativeElement.children[questionIndex].insertBefore(newBalloon, this.QA.nativeElement.children[questionIndex].children[1]);

    }
}