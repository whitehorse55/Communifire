import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CommentModalComponent } from '../../comment-modal/comment-modal';

@Component({
  selector: 'idea-card',
  templateUrl: 'idea-card.html'
})
export class IdeaCardComponent implements OnChanges{
  @Input() activity;
  private checkUrl: RegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  private communityUrl: string = localStorage.getItem('community_url');
  likesCount: any;

  constructor ( 
    public navCtrl: NavController,  
    public modalCtrl: ModalController
  ) {}

  ngOnChanges (changes: SimpleChanges) {
    if (changes.activity.currentValue) {
      const activityImage = this.activity.TitleImageURL;

      if (activityImage && activityImage.length) {
        if (!this.checkUrl.test(activityImage)) {
          this.activity.TitleImageURL = this.communityUrl + activityImage;
        }
      }
    }
  }

  setCount($event){
    this.likesCount = $event;
  }

  goToIdea() {
    this.navCtrl.push('ideas', {
      id: this.activity.ActivityEntityID
    });
  }

  goToProfile() {
    this.navCtrl.push('profile', {
      id: this.activity.UserID
    });
  }

  openComment() {
    let modal = this.modalCtrl.create(CommentModalComponent, { entity: this.activity });
    modal.present();
  }
}
