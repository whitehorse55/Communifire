import { Component, Input, NgZone } from '@angular/core';
import { ContentProvider } from '../../providers/content';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { TranslateService } from '@ngx-translate/core';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File, FileEntry, IFile } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { ToastController, Platform, ActionSheetController } from 'ionic-angular';
/**
 * Generated class for the ShowAttachmentsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'show-attachments',
  templateUrl: 'show-attachments.html'
})
export class ShowAttachmentsComponent {

  text: string;
  attachments: any = [];
  contentid: any;
  contenttype: any;
  @Input()
  set entity(entity: any){
    this.contentid = entity.id;
    this.contenttype = entity.type;
    this.getAttachments();
  }

  constructor(
    private content: ContentProvider,
    public iab: InAppBrowser,
    private transfer: FileTransfer,
    private file: File,
    private toastCtrl: ToastController,
    private zone: NgZone,
    private document: DocumentViewer,    
    public platform: Platform,
    public translate: TranslateService,
    private fileOpener: FileOpener,
    private actionSheetCtrl: ActionSheetController,
  ) {
  }

  getAttachments(){
    this.content.getAttachmentsById(this.contentid, this.contenttype).subscribe((res) => {
      console.log(res);
      if(!res.IsError){        
        this.attachments = res.ResponseData;
      }
    })
  }

  dest = '';

  downloadFile2(root, name, caption) {
    let link = root+'/'+name;
    let fileTransfer: FileTransferObject = this.transfer.create();    
    
    if(this.platform.is("android")){
      this.dest = this.file.externalDataDirectory + caption;
    } else if(this.platform.is("ios")) {
      this.dest = this.file.documentsDirectory + caption;
    }    
    
    this.translate.get("COMMONS.DOWNLOADSTART").subscribe(res => {
      this.presentToast(caption + ' ' + res);
    });

    let url = localStorage.getItem('community_url');
    let apiKey = localStorage.getItem('communifire_token');
    let options = {
      headers: {
        "Rest-Api-Key": apiKey        
      }
    }

    fileTransfer.download(encodeURI(link), this.dest, true, options).then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.translate.get("COMMONS.DOWNLOADED").subscribe(res => {
        this.presentToast(caption + ' ' + res);
      });

      const options: DocumentViewerOptions = {
        title: name
      }
      const onShow = () => {
        console.log('show');
      }
      const onClose = () => {
        console.log('close');
      }
      const onMissingApp = (appId, installer) => {
        this.translate.get("COMMONS.INSTALLWARNING").subscribe(res => {
          if(confirm("Do you want to install to Viewer App "
            + appId + " ?"))
          {
              installer();
          }
        });        
      }
      const onError = (err) => {
        console.log(err);
      }
      let m_type;
      this.file.resolveLocalFilesystemUrl(this.dest)
      .then((entry: FileEntry) => {
        return new Promise((resolve, reject) => {
          entry.file(meta => resolve(meta), error => reject(error));
        });
      })
      .then((meta: IFile) => {        
        m_type = meta.type; // This is a value compatible with the 'Content-Type' HTTP header
        console.log(m_type);
        this.fileOpener.open(this.dest, m_type)
        .then(() => console.log('File is opened'))
        .catch(e => console.log('Error opening file', e));
        // this.document.viewDocument(this.dest, m_type, options, onShow, onClose, onMissingApp, onError);
      })
      
    }, (error) => {
      console.log(error);
      this.translate.get("COMMONS.DOWNLOADERROR").subscribe(res => {
        this.presentToast(name + ' ' + res);
      });
    })
    .catch(err => {
      console.log(err);
      this.translate.get("COMMONS.DOWNLOADERROR").subscribe(res => {
        this.presentToast(name + ' ' + res);
      });
    });
  }

  downloadFile(root, name, caption){
    this.translate.get(["EXTRA.DOWNLOAD", "COMPONENT.CANCEL"]).subscribe((res) => {
      let actionSheet = this.actionSheetCtrl.create({
        title: res['EXTRA.DOWNLOAD'],
        buttons: [
          {
            text: res['EXTRA.DOWNLOAD'],
            handler: () => {
              this.downloadFile2(root, name, caption);
            }
          },
          {
            text: res['COMPONENT.CANCEL'],
            role: 'cancel'
          }
        ]
      });
      actionSheet.present();
    });
  }

  private presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
