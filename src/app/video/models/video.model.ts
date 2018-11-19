import { SafeResourceUrl } from '@angular/platform-browser';

export interface Snippet {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishedAt: string;
    thumbnails: {
        default: {
            height: number;
            url: string;
            width: number;
        };
        high: {
            height: number;
            url: string;
            width: number;
        };
        medium: {
            height: number;
            url: string;
            width: number;
        };
    };
    title: string;
}

export interface Video {
    etag: string;
    id: {
        kind: string;
        videoId: string;
    };
    kind: string;
    snippet: Snippet;
    url?: SafeResourceUrl;
}

export interface VideoSearchResponse {
    etag: string;
    items: Video[];
    kind: string;
    nextPageToken: string;
    prevPageToken: string;
    pageInfo: {
        resultsPerPage: number;
        totalResults: number;
    };
    regionCode: string;
}
