import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Quote } from '../../data/quote.interface';
import { QuotesService } from '../../services/quotes.service';

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit {

  collect: {category: string, quotes: Quote[], icon: string};
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private alertCtrl: AlertController, private service: QuotesService) {

  }

  // ionViewDidLoad() {
  //   this.collect = this.navParams.data;
  // }

  onAddToFavorite(quote: Quote){
    const alert = this.alertCtrl.create({
      title: 'Add Quote',
      subTitle: 'Are you Sure?',
      message: 'Are you sure to add the quote?',
      buttons: [
        { text: 'Ok', handler: ()=>{ this.service.addQuoteToFavorites(quote) } },
        { text: 'Cancel', role: 'cancel', handler: ()=>{console.log('Cancel');} } 
      ]
    });
    alert.present();
  }

  onRemoveFromFavorite(quote: Quote){
    this.service.removeQuoteFromFavorites(quote);
  }

  isFavorite(quote: Quote){
    return this.service.isQuoteFavorite(quote);
  }

  ngOnInit(){
    this.collect = this.navParams.data;
  }

}
