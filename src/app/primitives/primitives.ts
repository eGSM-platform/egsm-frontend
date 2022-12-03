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
    artifacttype: string,
    artifactid: string,
    host: string,
    port: number,
    stakeholders: [],
    faultyrates: Object,
    timingfaultyrates: Object,
    stakeholderstr: String,
    //attached_to: string[]
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
    id: string,
    notificationdetails: string
}

//TODO:VERIFY
export interface Notification {
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
}