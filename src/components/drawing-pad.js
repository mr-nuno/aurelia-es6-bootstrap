import {EventAggregator} from 'aurelia-event-aggregator';
import "signature-pad";

export class DrawingPad{

  static inject() { return [EventAggregator]; }

  constructor(eventAggregator){
    this.eventAggregator = eventAggregator;
  }

  attached(){
    this.pad = new SignaturePad(this.canvas);
    this.pad.onEnd = () => {
      this.drawDone();
    };
  }

  clear(){
    this.pad.clear();
  }

  drawDone(){
    this.eventAggregator.publish('drawing-done', this.pad.toDataURL());
  }
}