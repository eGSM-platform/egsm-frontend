import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
  SimpleChanges,
} from '@angular/core';

import * as BpmnModeler from 'bpmn-js/dist/bpmn-modeler.production.min.js';
import { BpmnBlockOverlayReport, ProcessPerspectiveStatistic } from '../primitives/primitives';


@Component({
  selector: 'app-bpmn',
  template: `<h1>{{model_id}}</h1>
    <div #ref class="diagram-container"></div>
  `,
  styles: [
    `
      .diagram-container {
        margin-left: auto;
        margin-right: auto;
        height: 100%;
        width: 80%;
      }
    `
  ]
})
export class BpmnComponent implements AfterContentInit, OnDestroy {
  bpmnJS: BpmnModeler = undefined
  @ViewChild('ref', { static: true }) private el: ElementRef;

  @Input() show_statistics: boolean;
  @Input() public model_id: string;
  @Input() public model_xml: string;

  blockStatistics = new Map()
  blockProperties = new Map() //Block name -> {BpmnBlockOverlayReport}

  visibleOverlays = new Map() //Block name where the overlay attached to AND/OR unique role ID -> Library generated Overlay ID (needed to make possible removals)

  constructor() {
    this.bpmnJS = new BpmnModeler();
  }

  ngAfterContentInit(): void {
    // attach BpmnJS instance to DOM element
    this.bpmnJS.attachTo(this.el.nativeElement);
    if (this.model_xml) {
      this.updateModelXml(this.model_xml)
    }

    var eventBus = this.bpmnJS.get('eventBus');
    var bpmnJsRef = this.bpmnJS

    if (this.show_statistics) {
      var visibleOveraysCopy = this.visibleOverlays
      var statisticsCopy = this.blockStatistics
      eventBus.on('element.hover', function (e) {
        var elementId = e.element.id
        if (statisticsCopy.has(elementId)) {
          var overlay = bpmnJsRef.get('overlays');
          if (visibleOveraysCopy.has('statisctic-overlay')) {
            overlay.remove(visibleOveraysCopy.get('statisctic-overlay'))
            visibleOveraysCopy.delete('statisctic-overlay')
          }
          visibleOveraysCopy.set('statisctic-overlay', overlay.add(elementId, {
            position: {
              top: -25,
              right: 0
            },
            html: `<div style="background-color:#ffcc66;"><h1>${elementId}</h1>` +
              `<p>Opened: ${statisticsCopy.get(elementId).opened}</p>` +
              `<p>Completed: ${statisticsCopy.get(elementId).completed}</p></div>`
          }));
        }
      })
    }
  }

  updateModelXml(value: string) {
    if (value) {
      this.blockStatistics.clear()
      this.blockProperties.clear()
      this.visibleOverlays.clear()
      this.bpmnJS.importXML(value)
      this.bpmnJS.on('import.done', ({ error }) => {
        console.log('import done')
        if (!error) {
          this.bpmnJS.get('canvas').zoom('fit-viewport');
        }
      });
    }
  }

  applyStatusReport(overlayreport: BpmnBlockOverlayReport[]) {
    var overlay = this.bpmnJS.get('overlays');
    overlayreport.forEach(element => {
      //Check if the element.id exists in this.visibleOverlays
      //If yes then check if the new overlay introduces any changes
      if (this.blockProperties.has(element.id)) {
        if (this.blockProperties.get(element.id).color != element.color) {
          this.setTaskColor(element.id, element.color)
          this.blockProperties.get(element.id).color = element.color
        }
        this.blockProperties.get(element.id).flags.forEach(flag => {
          if (!element.flags.includes(flag)) {
            console.log('remove flag: ' + flag)
            //Remove flag, since it is not longer part of the report
            overlay.remove(this.visibleOverlays.get(element.id + flag))
            this.visibleOverlays.delete(element.id + flag)
            this.blockProperties.get(element.id).flags.delete(flag)
          }
        })
        element.flags.forEach(flag => {
          if (!this.visibleOverlays.has(element.id + "_" + flag)) {
            this.addFlagToOverlay(element.id, flag)
          }
        });

      }
      else {
        this.blockProperties.set(element.id, { color: element.color, flags: new Set(element.flags) })
        this.setTaskColor(element.id, element.color)
        element.flags.forEach(flag => {
          this.addFlagToOverlay(element.id, flag)
        });
      }
    });
  }

  addFlagToOverlay(elementId: string, flag: string) {
    var overlay = this.bpmnJS.get('overlays');
    var flagNumber = 0
    for (const [key, value] of this.visibleOverlays.entries()) {
      if (key.includes(elementId)) {
        flagNumber++
      }
    }

    switch (flag) {
      case 'WARNING':
        var html = `<img width="25" height="25" src="assets/hazard.png"> `
        break;
      case 'REPEATED':
        var html = `<img width="25" height="25" src="assets/repeat.png"> `
        break
    }
    this.visibleOverlays.set(elementId + "_" + flag, overlay.add(elementId, {
      position: {
        top: -28,
        right: 30 * flagNumber
      },
      html: html
    }));
  }

  updateStatistics(perspectiveStatistic: ProcessPerspectiveStatistic) {
    if (this.show_statistics) {
      this.blockStatistics.clear()
      perspectiveStatistic.statistics.forEach(element => {
        this.blockStatistics.set(element.id, element)
      });
    }
    else {
      console.warn("updateStatistics is not enabled since showStatistics is False")
    }
  }


  ngOnDestroy(): void {
    this.bpmnJS.destroy();
  }

  importDiagram(xml: string): any {
    throw new Error('Method not implemented.');
  }

  setTaskColor(taskId, color) {
    console.log('Set Task color')
    var modeling = this.bpmnJS.get('modeling');
    var elementRegistry = this.bpmnJS.get('elementRegistry');
    var element = elementRegistry.get(taskId)
    if(color == undefined){
      modeling.setColor([element], null);
      return
    }
    modeling.setColor([element], { stroke: "#000000", fill: color });
  }
}