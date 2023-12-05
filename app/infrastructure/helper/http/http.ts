import { ConfigEnviroment } from "infrastructure/config/env/env";
import { HttpResponse, HttpResponseError, HttpResponseMetadata } from "./httpResponse";

export class Http {
    private apiDomain: string = new ConfigEnviroment().nextPublicAPIUrl;

    getApiDomain(): string {
        return this.apiDomain;
    }

    getApiUrl(obj: { uri: string; query?: string | null; }): string {
        let url: string = this.getApiDomain() + obj.uri;

        if (obj.query && obj.query.length > 0) {
            url = url + "?" + obj.query;
        }

        return url;
    }

    async get(obj: {
        uri: string;
        headers?: HeadersInit | undefined;
        query?: string | null;
    }): Promise<HttpResponse> {
        try {
            const apiUrl: string = this.getApiUrl({ uri: obj.uri, query: obj.query });

            const response = await fetch(apiUrl, {
                method: "GET",
                headers: obj.headers
            });

            const httpResponse: HttpResponse = new HttpResponse({
                data: null,
                metadata: new HttpResponseMetadata({
                    success: false,
                    error: null
                }),
            });

            if (response.status === 200) {
                const json = await response.json();

                httpResponse.data = json.data;

                if (json.data.metadata) {
                    httpResponse.metadata = new HttpResponseMetadata({
                        success: true,
                        error: null,
                    });
                }
            }

            if (response.status >= 400) {
                const json = await response.json();

                httpResponse.data = json.data;

                if (json.detail && json.detail.meta) {
                    httpResponse.metadata = new HttpResponseMetadata({
                        success: false,
                        error: null,
                    });

                    if (json.detail.meta.error) {
                        httpResponse.metadata.error = new HttpResponseError({
                            type: json.detail.meta.error.type
                        });
                    }
                }
            }

            return httpResponse;
        } catch (error) {
            const response: HttpResponse = new HttpResponse({
                data: null,
                metadata: new HttpResponseMetadata({
                    success: false,
                    error: new HttpResponseError({
                        type: "SERVER_ERROR"
                    }),
                }),
            });
    
            return response;
        }
    }

    async post(obj: {
        uri: string;
        body: BodyInit;
        headers?: HeadersInit | undefined;
        query?: string | null;
    }): Promise<HttpResponse> {
        try {
            const apiUrl: string = this.getApiUrl({ uri: obj.uri, query: obj.query });

            const response = await fetch(apiUrl, {
                method: "POST",
                body: JSON.stringify(obj.body),
                headers: obj.headers
            });

            const httpResponse: HttpResponse = new HttpResponse({
                data: null,
                metadata: new HttpResponseMetadata({
                    success: false,
                    error: null
                }),
            });

            if (response.status === 200 || response.status === 201) {
                const json = await response.json();

                httpResponse.data = json.data;

                if (json.data.metadata) {
                    httpResponse.metadata = new HttpResponseMetadata({
                        success: json.data.metadata?.success ?? false,
                        error: null,
                    });
                }
            }

            if (response.status >= 400) {
                const json = await response.json();

                httpResponse.data = json.data;

                if (json.detail && json.detail.meta) {
                    httpResponse.metadata = new HttpResponseMetadata({
                        success: false,
                        error: null,
                    });

                    if (json.detail.meta.error) {
                        httpResponse.metadata.error = new HttpResponseError({
                            type: json.detail.meta.error.type
                        });
                    }
                }
            }

            return httpResponse;
        } catch (error) {
            const response: HttpResponse = new HttpResponse({
                data: null,
                metadata: new HttpResponseMetadata({
                    success: false,
                    error: new HttpResponseError({
                        type: "SERVER_ERROR"
                    }),
                }),
            });
    
            return response;
        }
    }

    async put(obj: {
        uri: string;
        body: BodyInit;
        headers?: HeadersInit | undefined;
        query?: string | null;
    }): Promise<HttpResponse> {
        try {
            const apiUrl: string = this.getApiUrl({ uri: obj.uri, query: obj.query });

            const response = await fetch(apiUrl, {
                method: "PUT",
                body: JSON.stringify(obj.body),
                headers: obj.headers
            });

            const httpResponse: HttpResponse = new HttpResponse({
                data: null,
                metadata: new HttpResponseMetadata({
                    success: false,
                    error: null
                }),
            });

            if (response.status === 200) {
                const json = await response.json();

                httpResponse.data = json.data;

                if (json.data.metadata) {
                    httpResponse.metadata = new HttpResponseMetadata({
                        success: true,
                        error: null,
                    });
                }
            }

            if (response.status >= 400) {
                const json = await response.json();

                httpResponse.data = json.data;

                if (json.detail && json.detail.meta) {
                    httpResponse.metadata = new HttpResponseMetadata({
                        success: false,
                        error: null,
                    });

                    if (json.detail.meta.error) {
                        httpResponse.metadata.error = new HttpResponseError({
                            type: json.detail.meta.error.type
                        });
                    }
                }
            }

            return httpResponse;
        } catch (error) {
            const response: HttpResponse = new HttpResponse({
                data: null,
                metadata: new HttpResponseMetadata({
                    success: false,
                    error: new HttpResponseError({
                        type: "SERVER_ERROR"
                    }),
                }),
            });
    
            return response;
        }
    }

    async delete(obj: {
        uri: string;
        headers?: HeadersInit | undefined;
        query?: string | null;
    }): Promise<HttpResponse> {
        try {
            const apiUrl: string = this.getApiUrl({ uri: obj.uri, query: obj.query });

            const response = await fetch(apiUrl, {
                method: "DELETE",
                headers: obj.headers
            });

            const httpResponse: HttpResponse = new HttpResponse({
                data: null,
                metadata: new HttpResponseMetadata({
                    success: false,
                    error: null
                }),
            });

            if (response.status === 200) {
                const json = await response.json();

                httpResponse.data = json.data;

                if (json.data.metadata) {
                    httpResponse.metadata = new HttpResponseMetadata({
                        success: true,
                        error: null,
                    });
                }
            }

            if (response.status >= 400) {
                const json = await response.json();

                httpResponse.data = json.data;

                if (json.detail && json.detail.meta) {
                    httpResponse.metadata = new HttpResponseMetadata({
                        success: false,
                        error: null,
                    });

                    if (json.detail.meta.error) {
                        httpResponse.metadata.error = new HttpResponseError({
                            type: json.detail.meta.error.type
                        });
                    }
                }
            }

            return httpResponse;
        } catch (error) {
            const response: HttpResponse = new HttpResponse({
                data: null,
                metadata: new HttpResponseMetadata({
                    success: false,
                    error: new HttpResponseError({
                        type: "SERVER_ERROR"
                    }),
                }),
            });
    
            return response;
        }
    }
}