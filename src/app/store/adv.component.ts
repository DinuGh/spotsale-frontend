/**
  Title:       SpotSale
  IDs:         301208156, 301236904, 301251832, 301313468, 301268678
  Description: logic for creating and editing a product ad.
*/
import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
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

    //Saving (created or adited ad)
    submitProduct(form: NgForm) {
        this.submitted = true;
        if (form.valid) {
            this.repository.saveProduct(this.product);
            this.router.navigateByUrl("/store");
        }
    }
}