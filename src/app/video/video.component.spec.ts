import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { VideoComponent } from './video.component';
import { VideoService } from './services/video.service';
import { VideoSearchResponse } from './models/video.model';

@Pipe({name: 'truncate'})
class MockPipe implements PipeTransform {
    transform(value: number): number {
        return value;
    }
}

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
        },
        {
            kind: 'youtube#searchResult',
            etag: 'XI7nbFXulYBIpL0ayR_gDh3eu1k/N52kFjk8E_D5Nv7nE-OQWY3iXQk2',
            id: {
                kind: 'youtube#video',
                videoId: ''
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

describe('VideoComponent', () => {
    let component: VideoComponent;
    let fixture: ComponentFixture<VideoComponent>;
    let service: VideoService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                VideoComponent,
                MockPipe
            ],
            providers: [
                VideoService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VideoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = TestBed.get(VideoService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add a url to each item passed to it', () => {
        const videos = dummySearchResponse.items;

        component.addUrl(videos);

        expect(videos.length).toBe(3);
        expect(videos[0].url).toBeTruthy();
    });

    it('should not add a url to the last item passed to it', () => {
        const videos = dummySearchResponse.items;

        component.addUrl(videos);

        expect(videos.length).toBe(3);
        expect(videos[2].url).toBeFalsy();
    });

    it('should update the breakpoint variable to 1', () => {
        const target = {
            innerWidth: 767
        };

        component.checkBreakpoint(target);

        expect(component.breakpoint).toBe(1);
    });

    it('should update the breakpoint variable to 4', () => {
        const target = {
            innerWidth: 1700
        };

        component.checkBreakpoint(target);

        expect(component.breakpoint).toBe(4);
    });

    it('should fire checkBreakpoint when onResize is called', () => {
        const event = {
            target: {
                innerWidth: 1700
            }
        };

        spyOn(component, 'checkBreakpoint');

        component.onResize(event);

        expect(component.checkBreakpoint).toHaveBeenCalled();
        expect(component.checkBreakpoint).toHaveBeenCalledWith(event.target);
    });

    it('should call getVideos and return results', () => {
        spyOn(service, 'getVideos').and.returnValue(Observable.of(dummySearchResponse));
        spyOn(component, 'addUrl');
        spyOn(component, 'checkBreakpoint');

        component.getVideos();

        expect(component.loading).toBeFalsy();
        expect(service.getVideos).toHaveBeenCalled();
        expect(component.addUrl).toHaveBeenCalled();
        expect(component.checkBreakpoint).toHaveBeenCalled();
    });

    it('should call getVideos with nextPageToken and return results', () => {
        spyOn(service, 'getVideos').and.returnValue(Observable.of(dummySearchResponse));
        spyOn(component, 'addUrl');
        spyOn(component, 'checkBreakpoint');

        component.getVideos('NextPage');

        expect(component.loading).toBeFalsy();
        expect(service.getVideos).toHaveBeenCalled();
        expect(component.addUrl).toHaveBeenCalled();
        expect(component.checkBreakpoint).toHaveBeenCalled();
    });

    it('should call getVideos with prevPageToken and return results', () => {
        spyOn(service, 'getVideos').and.returnValue(Observable.of(dummySearchResponse));
        spyOn(component, 'addUrl');
        spyOn(component, 'checkBreakpoint');

        component.getVideos('PrevPage');

        expect(component.loading).toBeFalsy();
        expect(service.getVideos).toHaveBeenCalled();
        expect(component.addUrl).toHaveBeenCalled();
        expect(component.checkBreakpoint).toHaveBeenCalled();
    });
});
