export class ConfigEnviroment {
    public NEXT_PUBLIC_API_URL = "";
    public NEXT_PUBLIC_SUPABASE_URL = "";
    public NEXT_PUBLIC_SUPABASE_KEY = "";
    public NEXT_PUBLIC_APP_VERSION = "";
    public NEXT_PUBLIC_MARKETPLACE_PROJECT_DOMAIN = "";
    public NEXT_PUBLIC_PROJECT_DOMAIN = "";
    public NEXT_PUBLIC_FB_API_KEY = "";
    public NEXT_PUBLIC_FB_AUTH_DOMAIN = "";
    public NEXT_PUBLIC_FB_PROJECT_ID = "";
    public NEXT_PUBLIC_FB_STORAGE_BUCKET_ID = "";
    public NEXT_PUBLIC_FB_MESSAGING_SENDER_ID = "";
    public NEXT_PUBLIC_FB_APP_ID = "";
    public NEXT_PUBLIC_FB_VAPID_KEY = "";
    public NEXT_PUBLIC_SENDGRID_API_KEY = "";

    constructor() {
        this.NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
        this.NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
        this.NEXT_PUBLIC_SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
        this.NEXT_PUBLIC_APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? "";
        this.NEXT_PUBLIC_MARKETPLACE_PROJECT_DOMAIN = process.env.NEXT_PUBLIC_MARKETPLACE_PROJECT_DOMAIN ?? "";
        this.NEXT_PUBLIC_PROJECT_DOMAIN = process.env.NEXT_PUBLIC_PROJECT_DOMAIN ?? "";
        this.NEXT_PUBLIC_FB_API_KEY = process.env.NEXT_PUBLIC_FB_API_KEY ?? "";
        this.NEXT_PUBLIC_FB_AUTH_DOMAIN = process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN ?? "";
        this.NEXT_PUBLIC_FB_PROJECT_ID = process.env.NEXT_PUBLIC_FB_PROJECT_ID ?? "";
        this.NEXT_PUBLIC_FB_STORAGE_BUCKET_ID = process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET_ID ?? "";
        this.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID = process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID ?? "";
        this.NEXT_PUBLIC_FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID ?? "";
        this.NEXT_PUBLIC_FB_VAPID_KEY = process.env.NEXT_PUBLIC_FB_VAPID_KEY ?? "";
        this.NEXT_PUBLIC_SENDGRID_API_KEY = process.env.NEXT_PUBLIC_SENDGRID_API_KEY ?? "";
    }

    public get nextPublicAPIUrl(): string {
        if (this.NEXT_PUBLIC_API_URL.length === 0) {
            console.error("Logger error: The environment variable NEXT_PUBLIC_API_URL is not found")
            throw new Error("The environment variable NEXT_PUBLIC_API_URL is not found");
        }

        return this.NEXT_PUBLIC_API_URL;
    }

    public get nextPublicSupabaseUrl(): string {
        if (this.NEXT_PUBLIC_SUPABASE_URL.length === 0) {
            console.error("Logger error: The environment variable NEXT_PUBLIC_SUPABASE_URL is not found")
            throw new Error("The environment variable NEXT_PUBLIC_SUPABASE_URL is not found");
        }

        return this.NEXT_PUBLIC_SUPABASE_URL;
    }

    public get nextPublicSupabaseKey(): string {
        if (this.NEXT_PUBLIC_SUPABASE_KEY.length === 0) {
            console.error("Logger error: The environment variable NEXT_PUBLIC_SUPABASE_KEY is not found")
            throw new Error("The environment variable NEXT_PUBLIC_SUPABASE_KEY is not found");
        }

        return this.NEXT_PUBLIC_SUPABASE_KEY;
    }

    public get nextPublicAppVersion(): string {
        if (this.NEXT_PUBLIC_APP_VERSION.length === 0) {
            console.error("Logger error: The environment variable NEXT_PUBLIC_APP_VERSION is not found")
            throw new Error("The environment variable NEXT_PUBLIC_APP_VERSION is not found");
        }

        return this.NEXT_PUBLIC_APP_VERSION;
    }

    public get nextPublicMarketPlaceDomain(): string {
        if (this.NEXT_PUBLIC_MARKETPLACE_PROJECT_DOMAIN.length === 0) {
            console.error("Logger error: The environment variable NEXT_PUBLIC_MARKETPLACE_PROJECT_DOMAIN is not found")
            throw new Error("The environment variable NEXT_PUBLIC_MARKETPLACE_PROJECT_DOMAIN is not found");
        }

        return this.NEXT_PUBLIC_MARKETPLACE_PROJECT_DOMAIN;
    }

    public get nextPublicProjectDomain(): string {
        if (this.NEXT_PUBLIC_PROJECT_DOMAIN.length === 0) {
            console.error("Logger error: The environment variable NEXT_PUBLIC_PROJECT_DOMAIN is not found")
            throw new Error("The environment variable NEXT_PUBLIC_PROJECT_DOMAIN is not found");
        }

        return this.NEXT_PUBLIC_PROJECT_DOMAIN;
    }

    public get nextPublicFbApiKey(): string {
        if (this.NEXT_PUBLIC_FB_API_KEY.length === 0) {
            console.error("Logger error: The environment variable NEXT_PUBLIC_FB_API_KEY is not found")
            throw new Error("The environment variable NEXT_PUBLIC_FB_API_KEY is not found");
        }

        return this.NEXT_PUBLIC_FB_API_KEY;
    }

    public get nextPublicFbAuthDomain(): string {
        if (this.NEXT_PUBLIC_FB_AUTH_DOMAIN.length === 0) {
            console.error("Logger error: The environment variable NEXT_PUBLIC_FB_AUTH_DOMAIN is not found")
            throw new Error("The environment variable NEXT_PUBLIC_FB_AUTH_DOMAIN is not found");
        }

        return this.NEXT_PUBLIC_FB_AUTH_DOMAIN;
    }

    public get nextPublicFbProjectId(): string {
        if (this.NEXT_PUBLIC_FB_PROJECT_ID.length === 0) {
            console.error("Logger error: The environment variable NEXT_PUBLIC_FB_PROJECT_ID is not found")
            throw new Error("The environment variable NEXT_PUBLIC_FB_PROJECT_ID is not found");
        }

        return this.NEXT_PUBLIC_FB_PROJECT_ID;
    }

    public get nextPublicFbStorageBucketId(): string {
        if (this.NEXT_PUBLIC_FB_STORAGE_BUCKET_ID.length === 0) {
            console.error("Logger error: The environment variable NEXT_PUBLIC_FB_STORAGE_BUCKET_ID is not found")
            throw new Error("The environment variable NEXT_PUBLIC_FB_STORAGE_BUCKET_ID is not found");
        }

        return this.NEXT_PUBLIC_FB_STORAGE_BUCKET_ID;
    }

    public get nextPublicFbMessagingSenderId(): string {
        if (this.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID.length === 0) {
            console.error("Logger error: The environment variable NEXT_PUBLIC_FB_MESSAGING_SENDER_ID is not found")
            throw new Error("The environment variable NEXT_PUBLIC_FB_MESSAGING_SENDER_ID is not found");
        }

        return this.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID;
    }

    public get nextPublicFbAppId(): string {
        if (this.NEXT_PUBLIC_FB_APP_ID.length === 0) {
            console.error("Logger error: The environment variable NEXT_PUBLIC_FB_APP_ID is not found")
            throw new Error("The environment variable NEXT_PUBLIC_FB_APP_ID is not found");
        }

        return this.NEXT_PUBLIC_FB_APP_ID;
    }

    public get nextPublicFbVapidKey(): string {
        if (this.NEXT_PUBLIC_FB_VAPID_KEY.length === 0) {
            console.error("Logger error: The environment variable NEXT_PUBLIC_FB_VAPID_KEY is not found")
            throw new Error("The environment variable NEXT_PUBLIC_FB_VAPID_KEY is not found");
        }

        return this.NEXT_PUBLIC_FB_VAPID_KEY;
    }

    public get nextPublicSendgridApiKey(): string {
        if (this.NEXT_PUBLIC_SENDGRID_API_KEY.length === 0) {
            console.error("Logger error: The environment variable NEXT_PUBLIC_SENDGRID_API_KEY is not found")
            throw new Error("The environment variable NEXT_PUBLIC_SENDGRID_API_KEY is not found");
        }

        return this.NEXT_PUBLIC_SENDGRID_API_KEY;
    }
}

