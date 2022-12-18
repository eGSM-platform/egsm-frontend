export interface Engine {
    index: Number,
    name: string;
    type: string,
    perspective: string,
    uptime: string,
    status: string,
    worker_host: string,
    worker_api_port: Number
}

export interface Artifact {
    type: string,
    id: string,
    host: string,
    port: number,
    stakeholders: string[],
    faulty_rates?: Object,
    timing_faulty_rates?: Object,
    stakeholders_str?: String
}

export interface Process {
    name: string;
    id: string,
    description: string;
    engines: Engine[]
}

export interface EGSMWorker {
    index: number;
    name: string;
    capacity: number;
    engine_mumber: number;
    uptime: string;
    hostname: string;
    port: number;
}

export interface Aggregator {
    index: number;
    name: string;
    activity_mumber: number;
    capacity: number,
    uptime: string;
    hostname: string,
    port: number
}

export interface Stakeholder {
    name: string,
    notification_type: string
}

//TODO:VERIFY
/*export interface Notification {
    //index: Number, //Index in the table for visualization
    timestamp: string,
    id: string,

    notification_type: string,
    notification_message: string,
    notification_source_agent: string,
    notification_source_job: string,
    notification_addressee: string,

    process_group: string,
    processes: Process[],
}*/

export interface Notification {
    id: String
    timestamp: Number
    source_job: String
    source_aggregator: String
    notified: String[]
    type: String
    message: String
    errors: Object

}

export interface ArtifactNotification extends Notification {
    artifact_type: String
    artifact_id: String
}

export interface ProcessNotification extends Notification {

    process_type: String
    instance_id: String
    perspective: String
    processgroupmembers: String[]

}

export interface ProcessGroup {
    name: string,
    membership_rules: Object
}