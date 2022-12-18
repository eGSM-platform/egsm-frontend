import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild,
  SimpleChanges,
  EventEmitter
} from '@angular/core';

import { HttpClient } from '@angular/common/http';

/**
 * You may include a different variant of BpmnJS:
 *
 * bpmn-viewer  - displays BPMN diagrams without the ability
 *                to navigate them
 * bpmn-modeler - bootstraps a full-fledged BPMN editor
 */
import * as BpmnModeler from 'bpmn-js/dist/bpmn-modeler.production.min.js';
import * as BpmnViewer from 'bpmn-js/dist/bpmn-viewer.production.min.js';
//import { map, Subscription, switchMap } from 'rxjs';


@Component({
  selector: 'app-bpmn',
  template: `
    <div #ref class="diagram-container"></div>
  `,
  styles: [
    `
      .diagram-container {
        height: 100%;
        width: 100%;
      }
    `
  ]
})
export class BpmnComponent implements AfterContentInit, OnChanges, OnDestroy {

  // instantiate BpmnJS with component
  private viewer: BpmnModeler

  // retrieve DOM element reference
  @ViewChild('ref', { static: true }) private el: ElementRef;
  importDone: any;

  //@Output() private importDone: EventEmitter<any> = new EventEmitter();

  //@Input() private url: string;

  constructor(private http: HttpClient) {

    this.viewer = new BpmnModeler();
    this.viewer.importXML(DIAGRAM)
    this.viewer.on('import.done', ({ }) => {
      this.viewer.get('canvas').zoom('fit-viewport');
      var elementRegistry = this.viewer.get('elementRegistry');
      console.log(elementRegistry)
    
      var modeling = this.viewer.get('modeling');
      var elementsToColor = [elementRegistry.get('sid-4DC479E5-5C20-4948-BCFC-9EC5E2F66D8D')];
      modeling.setColor(elementsToColor, {
        stroke: '#00ff00',
        fill: '#ffff00'
      });

    });
    this.viewer.on('element.changed', (event) => {
      const element = event.element;
      console.log(element)
    
      // the element was changed by the user
    });
    // setting colors
    //var elementRegistry = this.viewer.get('elementRegistry');
    //console.log(elementRegistry)
  }

  ngAfterContentInit(): void {
    // attach BpmnJS instance to DOM element
    this.viewer.attachTo(this.el.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges) {
    // re-import whenever the url changes
    //if (changes.url) {
    //  this.loadUrl(changes.url.currentValue);
    //}
  }

  ngOnDestroy(): void {
    // destroy BpmnJS instance
    //this.bpmnJS.destroy();

    //this.viewer.attachTo(this.el.nativeElement);
  }

  importDiagram(xml: string): any {
    throw new Error('Method not implemented.');
  }
}

const DIAGRAM = `<?xml version="1.0" encoding="UTF-8"?>
<!-- origin at X=0.0 Y=0.0 -->
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:ext="http://org.eclipse.bpmn2/ext" xmlns:xs="http://www.w3.org/2001/XMLSchema" id="Definitions_1" exporter="org.eclipse.bpmn2.modeler.core" exporterVersion="1.1.2.201502162150" targetNamespace="http://org.eclipse.bpmn2/default/collaboration">
  <bpmn2:message id="m_portion_started" name="Manufacturer portion started">
    <bpmn2:extensionElements>
      <ext:style />
    </bpmn2:extensionElements>
  </bpmn2:message>
  <bpmn2:message id="c_portion_started" name="Carrier portion started">
    <bpmn2:extensionElements>
      <ext:style />
    </bpmn2:extensionElements>
  </bpmn2:message>
  <bpmn2:message id="t_portion_started" name="Terminal portion started">
    <bpmn2:extensionElements>
      <ext:style />
    </bpmn2:extensionElements>
  </bpmn2:message>
  <bpmn2:message id="truck_reached_m" name="Truck reached manufacturer">
    <bpmn2:extensionElements>
      <ext:style />
    </bpmn2:extensionElements>
  </bpmn2:message>
  <bpmn2:message id="container_attached" name="Container attached">
    <bpmn2:extensionElements>
      <ext:style />
    </bpmn2:extensionElements>
  </bpmn2:message>
  <bpmn2:message id="m_portion_ended" name="Manufacturer portion ended">
    <bpmn2:extensionElements>
      <ext:style />
    </bpmn2:extensionElements>
  </bpmn2:message>
  <bpmn2:message id="truck_reached_t" name="Truck reached inland terminal">
    <bpmn2:extensionElements>
      <ext:style />
    </bpmn2:extensionElements>
  </bpmn2:message>
  <bpmn2:message id="container_detached" name="Container detached">
    <bpmn2:extensionElements>
      <ext:style />
    </bpmn2:extensionElements>
  </bpmn2:message>
  <bpmn2:message id="c_portion_ended" name="Carrier portion ended">
    <bpmn2:extensionElements>
      <ext:style />
    </bpmn2:extensionElements>
  </bpmn2:message>
  <bpmn2:message id="process_failed" name="Process failed">
    <bpmn2:extensionElements>
      <ext:style />
    </bpmn2:extensionElements>
  </bpmn2:message>
  <bpmn2:message id="t_portion_ended" name="Terminal portion ended">
    <bpmn2:extensionElements>
      <ext:style />
    </bpmn2:extensionElements>
  </bpmn2:message>
  <bpmn2:collaboration id="Collaboration_1" name="Default Collaboration">
    <bpmn2:participant id="p_container" name="Container" processRef="containerprocess" />
  </bpmn2:collaboration>
  <bpmn2:process id="containerprocess" name="Container Process" definitionalCollaborationRef="Collaboration_1" isExecutable="false">
    <bpmn2:dataObject id="container" name="Container" />
    <bpmn2:dataObjectReference id="container_openedunhooked" name="Container" dataObjectRef="container">
      <bpmn2:dataState id="opened_unhooked" name="OpenedUnhooked" />
    </bpmn2:dataObjectReference>
    <bpmn2:dataObjectReference id="container_closedunhooked" name="Container" dataObjectRef="container">
      <bpmn2:dataState id="closed_unhooked" name="ClosedUnhooked" />
    </bpmn2:dataObjectReference>
    <bpmn2:dataObjectReference id="container_closedhooked" name="Container" dataObjectRef="container">
      <bpmn2:dataState id="closed_hooked" name="ClosedHooked" />
    </bpmn2:dataObjectReference>
    <bpmn2:dataObjectReference id="container_openedhooked" name="Container" dataObjectRef="container">
      <bpmn2:dataState id="opened_hooked" name="OpenedHooked" />
    </bpmn2:dataObjectReference>
    <bpmn2:dataObjectReference id="container_overheated" name="Container" dataObjectRef="container">
      <bpmn2:dataState id="overheated" name="Overheated" />
    </bpmn2:dataObjectReference>
    <bpmn2:dataObject id="truck" name="Truck" />
    <bpmn2:dataObjectReference id="truck_manufacturerstill" name="Truck" dataObjectRef="truck">
      <bpmn2:dataState id="manufacturer_still" name="ManufacturerStill" />
    </bpmn2:dataObjectReference>
    <bpmn2:dataObjectReference id="truck_manufacturermoving" name="Truck" dataObjectRef="truck">
      <bpmn2:dataState id="manufacturer_moving" name="ManufacturerMoving" />
    </bpmn2:dataObjectReference>
    <bpmn2:dataObjectReference id="truck_terminalstill" name="Truck" dataObjectRef="truck">
      <bpmn2:dataState id="terminal_still" name="TerminalStill" />
    </bpmn2:dataObjectReference>
    <bpmn2:dataObjectReference id="truck_terminalmoving" name="Truck" dataObjectRef="truck">
      <bpmn2:dataState id="terminal_moving" name="TerminalMoving" />
    </bpmn2:dataObjectReference>
    <bpmn2:task id="attach_container" name="Attach container">
      <bpmn2:incoming>SequenceFlow_6</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_7</bpmn2:outgoing>
      <bpmn2:ioSpecification id="InputOutputSpecification_2">
        <bpmn2:dataInput id="DataInput_3" name="input1" />
        <bpmn2:dataInput id="DataInput_7" name="input2" />
        <bpmn2:dataOutput id="DataOutput_3" name="output1" />
        <bpmn2:inputSet id="InputSet_10">
          <bpmn2:dataInputRefs>DataInput_3</bpmn2:dataInputRefs>
          <bpmn2:dataInputRefs>DataInput_7</bpmn2:dataInputRefs>
        </bpmn2:inputSet>
        <bpmn2:outputSet id="OutputSet_9">
          <bpmn2:dataOutputRefs>DataOutput_3</bpmn2:dataOutputRefs>
        </bpmn2:outputSet>
      </bpmn2:ioSpecification>
      <bpmn2:dataInputAssociation id="DataInputAssociation_10">
        <bpmn2:sourceRef>container_closedunhooked</bpmn2:sourceRef>
        <bpmn2:targetRef>DataInput_3</bpmn2:targetRef>
      </bpmn2:dataInputAssociation>
      <bpmn2:dataInputAssociation id="DataInputAssociation_12">
        <bpmn2:sourceRef>truck_manufacturerstill</bpmn2:sourceRef>
        <bpmn2:targetRef>DataInput_7</bpmn2:targetRef>
      </bpmn2:dataInputAssociation>
      <bpmn2:dataOutputAssociation id="DataOutputAssociation_9">
        <bpmn2:sourceRef>DataOutput_3</bpmn2:sourceRef>
        <bpmn2:targetRef>container_closedhooked</bpmn2:targetRef>
      </bpmn2:dataOutputAssociation>
    </bpmn2:task>
    <bpmn2:task id="fill_in_container" name="Fill in container">
      <bpmn2:incoming>SequenceFlow_2</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_3</bpmn2:outgoing>
      <bpmn2:ioSpecification id="InputOutputSpecification_1">
        <bpmn2:dataInput id="DataInput_1" name="input1" />
        <bpmn2:dataOutput id="DataOutput_1" name="output1" />
        <bpmn2:inputSet id="InputSet_9">
          <bpmn2:dataInputRefs>DataInput_1</bpmn2:dataInputRefs>
        </bpmn2:inputSet>
        <bpmn2:outputSet id="OutputSet_8">
          <bpmn2:dataOutputRefs>DataOutput_1</bpmn2:dataOutputRefs>
        </bpmn2:outputSet>
      </bpmn2:ioSpecification>
      <bpmn2:dataInputAssociation id="DataInputAssociation_9">
        <bpmn2:sourceRef>container_openedunhooked</bpmn2:sourceRef>
        <bpmn2:targetRef>DataInput_1</bpmn2:targetRef>
      </bpmn2:dataInputAssociation>
      <bpmn2:dataOutputAssociation id="DataOutputAssociation_8">
        <bpmn2:sourceRef>DataOutput_1</bpmn2:sourceRef>
        <bpmn2:targetRef>container_closedunhooked</bpmn2:targetRef>
      </bpmn2:dataOutputAssociation>
    </bpmn2:task>
    <bpmn2:task id="drive_to_terminal" name="Drive to Inland Terminal">
      <bpmn2:incoming>SequenceFlow_7</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_8</bpmn2:outgoing>
      <bpmn2:ioSpecification id="InputOutputSpecification_4">
        <bpmn2:dataInput id="DataInput_9" name="input1" />
        <bpmn2:dataInput id="DataInput_11" name="input2" />
        <bpmn2:dataOutput id="DataOutput_7" name="output1" />
        <bpmn2:inputSet id="InputSet_12">
          <bpmn2:dataInputRefs>DataInput_9</bpmn2:dataInputRefs>
          <bpmn2:dataInputRefs>DataInput_11</bpmn2:dataInputRefs>
        </bpmn2:inputSet>
        <bpmn2:outputSet id="OutputSet_11">
          <bpmn2:dataOutputRefs>DataOutput_7</bpmn2:dataOutputRefs>
        </bpmn2:outputSet>
      </bpmn2:ioSpecification>
      <bpmn2:dataInputAssociation id="DataInputAssociation_13">
        <bpmn2:sourceRef>truck_manufacturermoving</bpmn2:sourceRef>
        <bpmn2:targetRef>DataInput_9</bpmn2:targetRef>
      </bpmn2:dataInputAssociation>
      <bpmn2:dataInputAssociation id="DataInputAssociation_14">
        <bpmn2:sourceRef>container_closedhooked</bpmn2:sourceRef>
        <bpmn2:targetRef>DataInput_11</bpmn2:targetRef>
      </bpmn2:dataInputAssociation>
      <bpmn2:dataOutputAssociation id="DataOutputAssociation_11">
        <bpmn2:sourceRef>DataOutput_7</bpmn2:sourceRef>
        <bpmn2:targetRef>truck_terminalstill</bpmn2:targetRef>
      </bpmn2:dataOutputAssociation>
    </bpmn2:task>
    <bpmn2:task id="inspect_goods" name="Inspect goods">
      <bpmn2:incoming>SequenceFlow_8</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_15</bpmn2:outgoing>
      <bpmn2:ioSpecification id="InputOutputSpecification_6">
        <bpmn2:dataInput id="DataInput_15" name="input1" />
        <bpmn2:dataOutput id="DataOutput_11" name="output1" />
        <bpmn2:inputSet id="InputSet_14">
          <bpmn2:dataInputRefs>DataInput_15</bpmn2:dataInputRefs>
        </bpmn2:inputSet>
        <bpmn2:outputSet id="OutputSet_13">
          <bpmn2:dataOutputRefs>DataOutput_11</bpmn2:dataOutputRefs>
        </bpmn2:outputSet>
      </bpmn2:ioSpecification>
      <bpmn2:dataInputAssociation id="DataInputAssociation_16">
        <bpmn2:sourceRef>container_openedhooked</bpmn2:sourceRef>
        <bpmn2:targetRef>DataInput_15</bpmn2:targetRef>
      </bpmn2:dataInputAssociation>
      <bpmn2:dataOutputAssociation id="DataOutputAssociation_13">
        <bpmn2:sourceRef>DataOutput_11</bpmn2:sourceRef>
        <bpmn2:targetRef>container_closedhooked</bpmn2:targetRef>
      </bpmn2:dataOutputAssociation>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="SequenceFlow_15" sourceRef="inspect_goods" targetRef="detach_container" />
    <bpmn2:task id="detach_container" name="Detach container">
      <bpmn2:incoming>SequenceFlow_15</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_17</bpmn2:outgoing>
      <bpmn2:ioSpecification id="InputOutputSpecification_5">
        <bpmn2:dataInput id="DataInput_13" name="input1" />
        <bpmn2:dataInput id="DataInput_17" name="input2" />
        <bpmn2:dataOutput id="DataOutput_9" name="output1" />
        <bpmn2:inputSet id="InputSet_13">
          <bpmn2:dataInputRefs>DataInput_13</bpmn2:dataInputRefs>
          <bpmn2:dataInputRefs>DataInput_17</bpmn2:dataInputRefs>
        </bpmn2:inputSet>
        <bpmn2:outputSet id="OutputSet_12">
          <bpmn2:dataOutputRefs>DataOutput_9</bpmn2:dataOutputRefs>
        </bpmn2:outputSet>
      </bpmn2:ioSpecification>
      <bpmn2:dataInputAssociation id="DataInputAssociation_15">
        <bpmn2:sourceRef>truck_terminalstill</bpmn2:sourceRef>
        <bpmn2:targetRef>DataInput_13</bpmn2:targetRef>
      </bpmn2:dataInputAssociation>
      <bpmn2:dataInputAssociation id="DataInputAssociation_17">
        <bpmn2:sourceRef>container_closedhooked</bpmn2:sourceRef>
        <bpmn2:targetRef>DataInput_17</bpmn2:targetRef>
      </bpmn2:dataInputAssociation>
      <bpmn2:dataOutputAssociation id="DataOutputAssociation_12">
        <bpmn2:sourceRef>DataOutput_9</bpmn2:sourceRef>
        <bpmn2:targetRef>truck_terminalmoving</bpmn2:targetRef>
      </bpmn2:dataOutputAssociation>
    </bpmn2:task>
    <bpmn2:parallelGateway id="ParallelGateway_1" name="Parallel Gateway 1" gatewayDirection="Diverging">
      <bpmn2:incoming>SequenceFlow_1</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_2</bpmn2:outgoing>
      <bpmn2:outgoing>SequenceFlow_4</bpmn2:outgoing>
    </bpmn2:parallelGateway>
    <bpmn2:parallelGateway id="ParallelGateway_2" name="Parallel Gateway 2" gatewayDirection="Converging">
      <bpmn2:incoming>SequenceFlow_3</bpmn2:incoming>
      <bpmn2:incoming>SequenceFlow_5</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_6</bpmn2:outgoing>
    </bpmn2:parallelGateway>
    <bpmn2:startEvent id="s_processstarted" name="Process started">
      <bpmn2:outgoing>SequenceFlow_1</bpmn2:outgoing>
    </bpmn2:startEvent>
    <bpmn2:intermediateCatchEvent id="ce_c_portion_started" name="Carrier portion started">
      <bpmn2:incoming>SequenceFlow_4</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_5</bpmn2:outgoing>
      <bpmn2:dataOutput id="DataOutput_5" name="output1" />
      <bpmn2:dataOutputAssociation id="DataOutputAssociation_1">
        <bpmn2:sourceRef>DataOutput_5</bpmn2:sourceRef>
        <bpmn2:targetRef>truck</bpmn2:targetRef>
      </bpmn2:dataOutputAssociation>
      <bpmn2:outputSet id="_OutputSet_2" name="Output Set 2">
        <bpmn2:dataOutputRefs>DataOutput_5</bpmn2:dataOutputRefs>
      </bpmn2:outputSet>
      <bpmn2:messageEventDefinition id="MessageEventDefinition_1" messageRef="c_portion_started" />
    </bpmn2:intermediateCatchEvent>
    <bpmn2:sequenceFlow id="SequenceFlow_1" sourceRef="s_processstarted" targetRef="ParallelGateway_1" />
    <bpmn2:sequenceFlow id="SequenceFlow_2" sourceRef="ParallelGateway_1" targetRef="fill_in_container" />
    <bpmn2:sequenceFlow id="SequenceFlow_3" sourceRef="fill_in_container" targetRef="ParallelGateway_2" />
    <bpmn2:sequenceFlow id="SequenceFlow_4" sourceRef="ParallelGateway_1" targetRef="ce_c_portion_started" />
    <bpmn2:sequenceFlow id="SequenceFlow_5" sourceRef="ce_c_portion_started" targetRef="ParallelGateway_2" />
    <bpmn2:sequenceFlow id="SequenceFlow_6" sourceRef="ParallelGateway_2" targetRef="attach_container" />
    <bpmn2:sequenceFlow id="SequenceFlow_7" sourceRef="attach_container" targetRef="drive_to_terminal" />
    <bpmn2:sequenceFlow id="SequenceFlow_8" sourceRef="drive_to_terminal" targetRef="inspect_goods" />
    <bpmn2:intermediateThrowEvent id="te_c_portion_ended" name="Carrier portion ended">
      <bpmn2:incoming>SequenceFlow_17</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_18</bpmn2:outgoing>
      <bpmn2:dataInput id="DataInput_5" name="input1" />
      <bpmn2:dataInputAssociation id="DataInputAssociation_1">
        <bpmn2:sourceRef>truck</bpmn2:sourceRef>
        <bpmn2:targetRef>DataInput_5</bpmn2:targetRef>
      </bpmn2:dataInputAssociation>
      <bpmn2:inputSet id="_InputSet_2" name="Input Set 2">
        <bpmn2:dataInputRefs>DataInput_5</bpmn2:dataInputRefs>
      </bpmn2:inputSet>
      <bpmn2:messageEventDefinition id="MessageEventDefinition_2" messageRef="c_portion_ended" />
    </bpmn2:intermediateThrowEvent>
    <bpmn2:intermediateThrowEvent id="te_process_failed" name="Process failed">
      <bpmn2:incoming>SequenceFlow_13</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_14</bpmn2:outgoing>
      <bpmn2:dataInput id="DataInput_6" name="input1" />
      <bpmn2:dataInputAssociation id="DataInputAssociation_2">
        <bpmn2:sourceRef>truck</bpmn2:sourceRef>
        <bpmn2:targetRef>DataInput_6</bpmn2:targetRef>
      </bpmn2:dataInputAssociation>
      <bpmn2:inputSet id="_InputSet_3" name="Input Set 3">
        <bpmn2:dataInputRefs>DataInput_6</bpmn2:dataInputRefs>
      </bpmn2:inputSet>
      <bpmn2:messageEventDefinition id="MessageEventDefinition_3" messageRef="process_failed" />
    </bpmn2:intermediateThrowEvent>
    <bpmn2:boundaryEvent id="b_container_overheated" name="Container overheated" attachedToRef="drive_to_terminal">
      <bpmn2:outgoing>SequenceFlow_13</bpmn2:outgoing>
      <bpmn2:dataOutput id="DataOutput_4" name="output1" />
      <bpmn2:dataOutputAssociation id="DataOutputAssociation_2">
        <bpmn2:sourceRef>DataOutput_4</bpmn2:sourceRef>
        <bpmn2:targetRef>container_overheated</bpmn2:targetRef>
      </bpmn2:dataOutputAssociation>
      <bpmn2:outputSet id="_OutputSet_3" name="Output Set 3">
        <bpmn2:dataOutputRefs>DataOutput_4</bpmn2:dataOutputRefs>
      </bpmn2:outputSet>
    </bpmn2:boundaryEvent>
    <bpmn2:exclusiveGateway id="ExclusiveGateway_1" name="Exclusive Gateway 1" gatewayDirection="Converging">
      <bpmn2:incoming>SequenceFlow_14</bpmn2:incoming>
      <bpmn2:incoming>SequenceFlow_18</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_16</bpmn2:outgoing>
    </bpmn2:exclusiveGateway>
    <bpmn2:endEvent id="e_processended" name="Process ended">
      <bpmn2:incoming>SequenceFlow_16</bpmn2:incoming>
    </bpmn2:endEvent>
    <bpmn2:sequenceFlow id="SequenceFlow_13" sourceRef="b_container_overheated" targetRef="te_process_failed" />
    <bpmn2:sequenceFlow id="SequenceFlow_14" sourceRef="te_process_failed" targetRef="ExclusiveGateway_1" />
    <bpmn2:sequenceFlow id="SequenceFlow_16" sourceRef="ExclusiveGateway_1" targetRef="e_processended" />
    <bpmn2:sequenceFlow id="SequenceFlow_17" sourceRef="detach_container" targetRef="te_c_portion_ended" />
    <bpmn2:sequenceFlow id="SequenceFlow_18" sourceRef="te_c_portion_ended" targetRef="ExclusiveGateway_1" />
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1" name="Default Collaboration Diagram">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_1">
      <bpmndi:BPMNShape id="BPMNShape_Participant_2" bpmnElement="p_container" isHorizontal="true">
        <dc:Bounds height="371.0" width="1371.0" x="20.0" y="110.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_58" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="35.0" width="14.0" x="26.0" y="278.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_Task_1" bpmnElement="fill_in_container">
        <dc:Bounds height="50.0" width="110.0" x="270.0" y="171.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_7" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="14.0" width="83.0" x="283.0" y="189.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_attach_container" bpmnElement="attach_container">
        <dc:Bounds height="50.0" width="110.0" x="481.0" y="240.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_11" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="14.0" width="88.0" x="492.0" y="258.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_Task_4" bpmnElement="drive_to_terminal">
        <dc:Bounds height="50.0" width="110.0" x="634.0" y="239.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_21" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="28.0" width="82.0" x="648.0" y="250.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_Task_5" bpmnElement="inspect_goods">
        <dc:Bounds height="50.0" width="110.0" x="810.0" y="158.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_34" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="14.0" width="76.0" x="827.0" y="176.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_Task_6" bpmnElement="detach_container">
        <dc:Bounds height="50.0" width="110.0" x="1000.0" y="158.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_36" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="14.0" width="93.0" x="1008.0" y="176.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_container" bpmnElement="container">
        <dc:Bounds height="50.0" width="36.0" x="1630.0" y="546.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_9" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="14.0" width="54.0" x="1621.0" y="596.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_DataObjectReference_1" bpmnElement="container_openedunhooked">
        <dc:Bounds height="50.0" width="36.0" x="194.0" y="0.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_10" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="52.0" width="107.0" x="159.0" y="50.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_DataObjectReference_2" bpmnElement="container_closedunhooked">
        <dc:Bounds height="50.0" width="36.0" x="361.0" y="0.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_12" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="52.0" width="102.0" x="328.0" y="50.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_DataObjectReference_3" bpmnElement="container_closedhooked">
        <dc:Bounds height="50.0" width="36.0" x="822.0" y="10.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_22" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="52.0" width="88.0" x="796.0" y="60.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_DataObjectReference_4" bpmnElement="container_openedhooked">
        <dc:Bounds height="50.0" width="36.0" x="796.0" y="502.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_52" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="52.0" width="93.0" x="768.0" y="552.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_DataObjectReference_5" bpmnElement="container_overheated">
        <dc:Bounds height="50.0" width="36.0" x="526.0" y="502.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_53" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="28.0" width="70.0" x="509.0" y="552.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_DataObject_2" bpmnElement="truck">
        <dc:Bounds height="50.0" width="36.0" x="416.0" y="502.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_54" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="14.0" width="30.0" x="419.0" y="552.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_DataObjectReference_7" bpmnElement="truck_manufacturerstill">
        <dc:Bounds height="50.0" width="36.0" x="491.0" y="1.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_56" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="52.0" width="98.0" x="460.0" y="51.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_DataObjectReference_8" bpmnElement="truck_manufacturermoving">
        <dc:Bounds height="50.0" width="36.0" x="671.0" y="502.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_57" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="52.0" width="118.0" x="630.0" y="552.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_DataObjectReference_10" bpmnElement="truck_terminalstill">
        <dc:Bounds height="50.0" width="36.0" x="940.0" y="502.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_59" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="28.0" width="73.0" x="922.0" y="552.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_DataObjectReference_11" bpmnElement="truck_terminalmoving">
        <dc:Bounds height="50.0" width="36.0" x="1100.0" y="502.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_60" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="52.0" width="93.0" x="1072.0" y="552.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_ParallelGateway_1" bpmnElement="ParallelGateway_1" isMarkerVisible="true">
        <dc:Bounds height="50.0" width="50.0" x="180.0" y="234.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_1" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="28.0" width="58.0" x="176.0" y="284.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_ParallelGateway_2" bpmnElement="ParallelGateway_2" isMarkerVisible="true">
        <dc:Bounds height="50.0" width="50.0" x="379.0" y="239.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_2" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="28.0" width="58.0" x="375.0" y="289.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_s_processstarted" bpmnElement="s_processstarted">
        <dc:Bounds height="36.0" width="36.0" x="80.0" y="221.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_4" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="28.0" width="47.0" x="75.0" y="257.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_IntermediateCatchEvent_2" bpmnElement="ce_c_portion_started">
        <dc:Bounds height="36.0" width="36.0" x="301.0" y="316.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_8" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="28.0" width="78.0" x="280.0" y="352.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_te_c_portion_ended" bpmnElement="te_c_portion_ended">
        <dc:Bounds height="36.0" width="36.0" x="1160.0" y="171.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_31" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="28.0" width="76.0" x="1140.0" y="207.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_te_process_failed" bpmnElement="te_process_failed">
        <dc:Bounds height="36.0" width="36.0" x="724.0" y="392.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_32" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="14.0" width="77.0" x="704.0" y="428.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_ExclusiveGateway_1" bpmnElement="ExclusiveGateway_1" isMarkerVisible="true">
        <dc:Bounds height="50.0" width="50.0" x="1230.0" y="214.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_35" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="28.0" width="58.0" x="1226.0" y="264.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_e_processended" bpmnElement="e_processended">
        <dc:Bounds height="36.0" width="36.0" x="1320.0" y="222.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_38" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="28.0" width="47.0" x="1315.0" y="258.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_b_container_overheated" bpmnElement="b_container_overheated">
        <dc:Bounds height="36.0" width="36.0" x="694.0" y="271.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_33" labelStyle="BPMNLabelStyle_1">
          <dc:Bounds height="28.0" width="62.0" x="681.0" y="307.0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_15" bpmnElement="SequenceFlow_15" sourceElement="BPMNShape_Task_5" targetElement="BPMNShape_Task_6">
        <di:waypoint xsi:type="dc:Point" x="920.0" y="183.0" />
        <di:waypoint xsi:type="dc:Point" x="1000.0" y="183.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_37" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_DataInputAssociation_1" bpmnElement="DataInputAssociation_9">
        <di:waypoint xsi:type="dc:Point" x="212.0" y="50.0" />
        <di:waypoint xsi:type="dc:Point" x="212.0" y="187.0" />
        <di:waypoint xsi:type="dc:Point" x="270.0" y="187.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_61" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_DataOutputAssociation_1" bpmnElement="DataOutputAssociation_8">
        <di:waypoint xsi:type="dc:Point" x="325.0" y="171.0" />
        <di:waypoint xsi:type="dc:Point" x="325.0" y="117.0" />
        <di:waypoint xsi:type="dc:Point" x="379.0" y="117.0" />
        <di:waypoint xsi:type="dc:Point" x="379.0" y="50.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_62" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_DataOutputAssociation_2" bpmnElement="DataOutputAssociation_9">
        <di:waypoint xsi:type="dc:Point" x="553.0" y="240.0" />
        <di:waypoint xsi:type="dc:Point" x="553.0" y="35.0" />
        <di:waypoint xsi:type="dc:Point" x="822.0" y="35.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_63" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_DataInputAssociation_2" bpmnElement="DataInputAssociation_10">
        <di:waypoint xsi:type="dc:Point" x="397.0" y="25.0" />
        <di:waypoint xsi:type="dc:Point" x="434.0" y="25.0" />
        <di:waypoint xsi:type="dc:Point" x="434.0" y="256.0" />
        <di:waypoint xsi:type="dc:Point" x="481.0" y="256.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_64" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_DataInputAssociation_4" bpmnElement="DataInputAssociation_12">
        <di:waypoint xsi:type="dc:Point" x="509.0" y="51.0" />
        <di:waypoint xsi:type="dc:Point" x="509.0" y="136.0" />
        <di:waypoint xsi:type="dc:Point" x="517.0" y="136.0" />
        <di:waypoint xsi:type="dc:Point" x="517.0" y="240.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_67" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_DataInputAssociation_5" bpmnElement="DataInputAssociation_13">
        <di:waypoint xsi:type="dc:Point" x="689.0" y="502.0" />
        <di:waypoint xsi:type="dc:Point" x="689.0" y="289.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_68" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_DataInputAssociation_6" bpmnElement="DataInputAssociation_14">
        <di:waypoint xsi:type="dc:Point" x="834.0" y="60.0" />
        <di:waypoint xsi:type="dc:Point" x="834.0" y="140.0" />
        <di:waypoint xsi:type="dc:Point" x="670.0" y="140.0" />
        <di:waypoint xsi:type="dc:Point" x="670.0" y="239.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_69" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_DataOutputAssociation_4" bpmnElement="DataOutputAssociation_11">
        <di:waypoint xsi:type="dc:Point" x="744.0" y="264.0" />
        <di:waypoint xsi:type="dc:Point" x="952.0" y="264.0" />
        <di:waypoint xsi:type="dc:Point" x="952.0" y="502.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_70" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_DataInputAssociation_7" bpmnElement="DataInputAssociation_15">
        <di:waypoint xsi:type="dc:Point" x="964.0" y="502.0" />
        <di:waypoint xsi:type="dc:Point" x="964.0" y="403.0" />
        <di:waypoint xsi:type="dc:Point" x="1036.0" y="403.0" />
        <di:waypoint xsi:type="dc:Point" x="1036.0" y="282.0" />
        <di:waypoint xsi:type="dc:Point" x="1036.0" y="208.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_71" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_DataOutputAssociation_5" bpmnElement="DataOutputAssociation_12">
        <di:waypoint xsi:type="dc:Point" x="1072.0" y="208.0" />
        <di:waypoint xsi:type="dc:Point" x="1072.0" y="340.0" />
        <di:waypoint xsi:type="dc:Point" x="1118.0" y="340.0" />
        <di:waypoint xsi:type="dc:Point" x="1118.0" y="502.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_72" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_DataInputAssociation_8" bpmnElement="DataInputAssociation_16">
        <di:waypoint xsi:type="dc:Point" x="832.0" y="527.0" />
        <di:waypoint xsi:type="dc:Point" x="865.0" y="527.0" />
        <di:waypoint xsi:type="dc:Point" x="865.0" y="208.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_73" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_DataInputAssociation_9" bpmnElement="DataInputAssociation_17">
        <di:waypoint xsi:type="dc:Point" x="858.0" y="35.0" />
        <di:waypoint xsi:type="dc:Point" x="1055.0" y="35.0" />
        <di:waypoint xsi:type="dc:Point" x="1055.0" y="158.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_74" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_DataOutputAssociation_6" bpmnElement="DataOutputAssociation_13">
        <di:waypoint xsi:type="dc:Point" x="865.0" y="158.0" />
        <di:waypoint xsi:type="dc:Point" x="865.0" y="114.0" />
        <di:waypoint xsi:type="dc:Point" x="846.0" y="114.0" />
        <di:waypoint xsi:type="dc:Point" x="846.0" y="60.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_75" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_DataOutputAssociation_7" bpmnElement="DataOutputAssociation_1" sourceElement="BPMNShape_IntermediateCatchEvent_2">
        <di:waypoint xsi:type="dc:Point" x="319.0" y="352.0" />
        <di:waypoint xsi:type="dc:Point" x="319.0" y="419.0" />
        <di:waypoint xsi:type="dc:Point" x="425.0" y="419.0" />
        <di:waypoint xsi:type="dc:Point" x="425.0" y="502.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_76" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_DataInputAssociation_10" bpmnElement="DataInputAssociation_1" targetElement="BPMNShape_te_c_portion_ended">
        <di:waypoint xsi:type="dc:Point" x="434.0" y="502.0" />
        <di:waypoint xsi:type="dc:Point" x="434.0" y="370.0" />
        <di:waypoint xsi:type="dc:Point" x="1178.0" y="370.0" />
        <di:waypoint xsi:type="dc:Point" x="1178.0" y="207.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_77" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_DataInputAssociation_11" bpmnElement="DataInputAssociation_2" targetElement="BPMNShape_te_process_failed">
        <di:waypoint xsi:type="dc:Point" x="443.0" y="502.0" />
        <di:waypoint xsi:type="dc:Point" x="443.0" y="410.0" />
        <di:waypoint xsi:type="dc:Point" x="724.0" y="410.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_78" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_1" bpmnElement="SequenceFlow_1" sourceElement="BPMNShape_s_processstarted" targetElement="BPMNShape_ParallelGateway_1">
        <di:waypoint xsi:type="dc:Point" x="116.0" y="239.0" />
        <di:waypoint xsi:type="dc:Point" x="144.0" y="239.0" />
        <di:waypoint xsi:type="dc:Point" x="144.0" y="259.0" />
        <di:waypoint xsi:type="dc:Point" x="180.0" y="259.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_13" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_2" bpmnElement="SequenceFlow_2" sourceElement="BPMNShape_ParallelGateway_1" targetElement="BPMNShape_Task_1">
        <di:waypoint xsi:type="dc:Point" x="205.0" y="234.0" />
        <di:waypoint xsi:type="dc:Point" x="205.0" y="203.0" />
        <di:waypoint xsi:type="dc:Point" x="270.0" y="203.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_14" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_3" bpmnElement="SequenceFlow_3" sourceElement="BPMNShape_Task_1" targetElement="BPMNShape_ParallelGateway_2">
        <di:waypoint xsi:type="dc:Point" x="380.0" y="196.0" />
        <di:waypoint xsi:type="dc:Point" x="404.0" y="196.0" />
        <di:waypoint xsi:type="dc:Point" x="404.0" y="239.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_15" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_4" bpmnElement="SequenceFlow_4" sourceElement="BPMNShape_ParallelGateway_1" targetElement="BPMNShape_IntermediateCatchEvent_2">
        <di:waypoint xsi:type="dc:Point" x="230.0" y="259.0" />
        <di:waypoint xsi:type="dc:Point" x="319.0" y="259.0" />
        <di:waypoint xsi:type="dc:Point" x="319.0" y="316.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_16" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_5" bpmnElement="SequenceFlow_5" sourceElement="BPMNShape_IntermediateCatchEvent_2" targetElement="BPMNShape_ParallelGateway_2">
        <di:waypoint xsi:type="dc:Point" x="337.0" y="334.0" />
        <di:waypoint xsi:type="dc:Point" x="404.0" y="334.0" />
        <di:waypoint xsi:type="dc:Point" x="404.0" y="289.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_17" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_6" bpmnElement="SequenceFlow_6" sourceElement="BPMNShape_ParallelGateway_2" targetElement="BPMNShape_attach_container">
        <di:waypoint xsi:type="dc:Point" x="429.0" y="264.0" />
        <di:waypoint xsi:type="dc:Point" x="452.0" y="264.0" />
        <di:waypoint xsi:type="dc:Point" x="452.0" y="272.0" />
        <di:waypoint xsi:type="dc:Point" x="481.0" y="272.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_18" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_7" bpmnElement="SequenceFlow_7" sourceElement="BPMNShape_attach_container" targetElement="BPMNShape_Task_4">
        <di:waypoint xsi:type="dc:Point" x="591.0" y="265.0" />
        <di:waypoint xsi:type="dc:Point" x="610.0" y="265.0" />
        <di:waypoint xsi:type="dc:Point" x="610.0" y="264.0" />
        <di:waypoint xsi:type="dc:Point" x="634.0" y="264.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_19" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_8" bpmnElement="SequenceFlow_8" sourceElement="BPMNShape_Task_4" targetElement="BPMNShape_Task_5">
        <di:waypoint xsi:type="dc:Point" x="706.0" y="239.0" />
        <di:waypoint xsi:type="dc:Point" x="706.0" y="183.0" />
        <di:waypoint xsi:type="dc:Point" x="810.0" y="183.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_20" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_13" bpmnElement="SequenceFlow_13" sourceElement="BPMNShape_b_container_overheated" targetElement="BPMNShape_te_process_failed">
        <di:waypoint xsi:type="dc:Point" x="712.0" y="307.0" />
        <di:waypoint xsi:type="dc:Point" x="712.0" y="345.0" />
        <di:waypoint xsi:type="dc:Point" x="742.0" y="345.0" />
        <di:waypoint xsi:type="dc:Point" x="742.0" y="392.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_39" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_14" bpmnElement="SequenceFlow_14" sourceElement="BPMNShape_te_process_failed" targetElement="BPMNShape_ExclusiveGateway_1">
        <di:waypoint xsi:type="dc:Point" x="760.0" y="410.0" />
        <di:waypoint xsi:type="dc:Point" x="1255.0" y="410.0" />
        <di:waypoint xsi:type="dc:Point" x="1255.0" y="264.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_40" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_16" bpmnElement="SequenceFlow_16" sourceElement="BPMNShape_ExclusiveGateway_1" targetElement="BPMNShape_e_processended">
        <di:waypoint xsi:type="dc:Point" x="1280.0" y="239.0" />
        <di:waypoint xsi:type="dc:Point" x="1298.0" y="239.0" />
        <di:waypoint xsi:type="dc:Point" x="1298.0" y="240.0" />
        <di:waypoint xsi:type="dc:Point" x="1320.0" y="240.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_41" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_17" bpmnElement="SequenceFlow_17" sourceElement="BPMNShape_Task_6" targetElement="BPMNShape_te_c_portion_ended">
        <di:waypoint xsi:type="dc:Point" x="1110.0" y="183.0" />
        <di:waypoint xsi:type="dc:Point" x="1132.0" y="183.0" />
        <di:waypoint xsi:type="dc:Point" x="1132.0" y="189.0" />
        <di:waypoint xsi:type="dc:Point" x="1160.0" y="189.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_42" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_18" bpmnElement="SequenceFlow_18" sourceElement="BPMNShape_te_c_portion_ended" targetElement="BPMNShape_ExclusiveGateway_1">
        <di:waypoint xsi:type="dc:Point" x="1196.0" y="189.0" />
        <di:waypoint xsi:type="dc:Point" x="1255.0" y="189.0" />
        <di:waypoint xsi:type="dc:Point" x="1255.0" y="214.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_43" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_DataOutputAssociation_3" bpmnElement="DataOutputAssociation_2">
        <di:waypoint xsi:type="dc:Point" x="712.0" y="307.0" />
        <di:waypoint xsi:type="dc:Point" x="712.0" y="394.0" />
        <di:waypoint xsi:type="dc:Point" x="544.0" y="394.0" />
        <di:waypoint xsi:type="dc:Point" x="544.0" y="502.0" />
        <bpmndi:BPMNLabel id="BPMNLabel_3" labelStyle="BPMNLabelStyle_1" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
    <bpmndi:BPMNLabelStyle id="BPMNLabelStyle_1">
      <dc:Font name="arial" size="9.0" />
    </bpmndi:BPMNLabelStyle>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>`