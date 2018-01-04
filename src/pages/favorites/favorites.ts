import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, MenuController } from 'ionic-angular';
import { QuotesService } from '../../services/quotes.service';
import { Quote } from '../../data/quote.interface';
import { QuotePage } from '../quote/quote';
import { SettingsService } from '../../services/settings.service';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  quotes: Quote[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private service: QuotesService, private modaleCtrl: ModalController,
              private menuCtrl: MenuController, private setings: SettingsService) {
  }

  onRemoveFromFavorite(quote: Quote){
    this.service.removeQuoteFromFavorites(quote);
    //this.quotes = this.service.getFavoriteQuotes();
    const position= this.quotes.findIndex((quoteEl: Quote)=>{
      return quoteEl.id == quote.id;
    });
    this.quotes.splice(position,1);
  }

  onViewQuote(quote: Quote){
    const modal = this.modaleCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove: boolean) => {
      if(remove){
        this.service.removeQuoteFromFavorites(quote);
        //this.quotes = this.service.getFavoriteQuotes();
        const position= this.quotes.findIndex((quoteEl: Quote)=>{
          return quoteEl.id == quote.id;
        });
        this.quotes.splice(position,1);
      }
    });
  }

  openMenu(){
    this.menuCtrl.open();
  }

  getBackground(){
    return this.setings.isAlt() ? 'alt' : 'quote';
  }

  ionViewWillEnter() {
    this.quotes = this.service.getFavoriteQuotes();
    console.log(this.quotes);
  }

}
