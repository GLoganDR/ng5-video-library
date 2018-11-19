import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { animate, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';

import { VideoService } from './services/video.service';
import { Video, VideoSearchResponse } from './models/video.model';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss'],
    animations: [
        trigger('videos', [
            transition('* => *', [
                query(':enter', style({opacity: 0}), {optional: true}),

                query(':enter', stagger('300ms', [
                    animate('.6s ease-in', keyframes([
                        style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
                        style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}),
                        style({opacity: 1, transform: 'translateY(0)', offset: 1.0}),
                    ]))]), {optional: true})
            ])
        ])
    ]
})
export class VideoComponent implements OnInit {

    breakpoint: number;
    length: number;
    loading = false;
    nextPageToken = '';
    pageSize = 10;
    pageTotal: number;
    prevPageToken = '';
    videos: Video[];

    constructor(private sanitizer: DomSanitizer,
                private videoService: VideoService) {
    }

    ngOnInit() {

        this.getVideos();
    }

    addUrl(videos: Video[]) {

        videos.forEach(v => {

            if (v.id && v.id.videoId) {
                const id = v.id.videoId,
                    url = `https://www.youtube.com/embed/${id}`;

                v.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
            } else {
                v.url = '';
            }
        });
    }

    checkBreakpoint(target) {

        if (target.innerWidth < 768) {
            this.breakpoint = 1;
        } else if (target.innerWidth >= 768 && target.innerWidth < 1400) {
            this.breakpoint = 2;
        } else if (target.innerWidth < 1600) {
            this.breakpoint = 3;
        } else {
            this.breakpoint = 4;
        }
    }

    getVideos(pageToken?: string) {

        this.loading = true;

        this.videoService.getVideos(pageToken)
            .subscribe((res: VideoSearchResponse) => {
                this.length = res.pageInfo.totalResults;
                this.videos = res.items;
                this.addUrl(this.videos);
                this.nextPageToken = res.nextPageToken;
                this.prevPageToken = res.prevPageToken;
                this.checkBreakpoint(window);
                this.pageTotal = Math.ceil(this.length / this.pageSize);
                this.loading = false;
            });
    }

    onResize(event) {

        this.checkBreakpoint(event.target);
    }
}
