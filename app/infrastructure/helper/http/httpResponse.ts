export class HttpResponse {
    public data: any | null = null;
    public metadata: HttpResponseMetadata | null = null;

    constructor(obj: { data: any | null, metadata: HttpResponseMetadata | null }) {
        this.data = obj.data
        this.metadata = obj.metadata
    }
}

export class HttpResponseMetadata {
    public success: boolean = false;
    public error: HttpResponseError | null = null;

    constructor(obj: { success: boolean, error: HttpResponseError | null }) {
        this.success = obj.success
        this.error = obj.error
    }
}

export class HttpResponseError {
    public type: string = "";

    constructor(obj: { type: string }) {
        this.type = obj.type
    }
}