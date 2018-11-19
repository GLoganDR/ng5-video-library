import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { VideoService } from './video.service';
import { VideoSearchResponse } from '../models/video.model';

const dummySearchResponse: VideoSearchResponse = {
    etag: 'XI7nbFXulYBIpL0ayR_gDh3eu1k/pOioS_jma7ASaOnaTezL-u0nukE1',
    items: [
        {
            kind: 'youtube#searchResult',
            etag: 'XI7nbFXulYBIpL0ayR_gDh3eu1k/pOioS_jma7ASaOnaTezL-u0nukE1',
            id: {
                kind: 'youtube#video',
                videoId: '1HC4RNHTw7o'
            },
            snippet: {
                publishedAt: '2018-10-08T15:30:01.000Z',
                channelId: 'UCbn1OgGei-DV7aSRo_HaAiw',
                title: 'Introducing Angular Console - Ayşegül Yönet at Angular MTV',
                description: 'Ayşegül demos Angular Console--a more approachable way of using the Angular CLI. ' +
                    'She shows how Angular Console helps you create new projects, build ...',
                thumbnails: {
                    default: {
                        url: 'https://i.ytimg.com/vi/1HC4RNHTw7o/default.jpg',
                        width: 120,
                        height: 90
                    },
                    medium: {
                        url: 'https://i.ytimg.com/vi/1HC4RNHTw7o/mqdefault.jpg',
                        width: 320,
                        height: 180
                    },
                    high: {
                        url: 'https://i.ytimg.com/vi/1HC4RNHTw7o/hqdefault.jpg',
                        width: 480,
                        height: 360
                    }
                },
                channelTitle: 'Angular',
                liveBroadcastContent: 'none'
            }
        },
        {
            kind: 'youtube#searchResult',
            etag: 'XI7nbFXulYBIpL0ayR_gDh3eu1k/N52kFjk8E_D5Nv7nE-OQWY3iXQk2',
            id: {
                kind: 'youtube#video',
                videoId: '3K98yzaOww4'
            },
            snippet: {
                publishedAt: '2018-10-01T15:30:01.000Z',
                channelId: 'UCbn1OgGei-DV7aSRo_HaAiw',
                title: 'Predictive Prefetching - Minko Gechev at Angular MTV',
                description: 'Websites are slow! Double-click shows that the average ' +
                    'load time on a 3G network is 19 seconds! ' +
                    'On top of that, on mobile devices, JavaScript compared to a ...',
                thumbnails: {
                    default: {
                        url: 'https://i.ytimg.com/vi/3K98yzaOww4/default.jpg',
                        width: 120,
                        height: 90
                    },
                    medium: {
                        url: 'https://i.ytimg.com/vi/3K98yzaOww4/mqdefault.jpg',
                        width: 320,
                        height: 180
                    },
                    high: {
                        url: 'https://i.ytimg.com/vi/3K98yzaOww4/hqdefault.jpg',
                        width: 480,
                        height: 360
                    }
                },
                channelTitle: 'Angular',
                liveBroadcastContent: 'none'
            }
        }
    ],
    kind: 'Neat',
    nextPageToken: 'OldStuff',
    prevPageToken: 'NewStuff',
    pageInfo: {
        resultsPerPage: 10,
        totalResults: 100,
    },
    regionCode: 'US'
};

describe('VideoService', () => {
    let service: VideoService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [VideoService]
        });

        service = TestBed.get(VideoService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should GET the video object from the API.', () => {

        service.getVideos().subscribe(res => {
            expect(res.items.length).toBe(2);
            expect(res.items).toEqual(dummySearchResponse.items);
        });

        const request = httpMock.expectOne(`${service.baseUrl}`);

        expect(request.request.method).toBe('GET');

        request.flush(dummySearchResponse);
    });

    it('should GET the UPDATED video object from the API.', () => {

        service.getVideos('NewStuff').subscribe(res => {
            expect(res.items.length).toBe(2);
            expect(res.items).toEqual(dummySearchResponse.items);
        });

        const request = httpMock.expectOne(`${service.baseUrl}&pageToken=NewStuff`);

        expect(request.request.method).toBe('GET');

        request.flush(dummySearchResponse);
    });
});
