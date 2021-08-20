import { Component, Input, ViewEncapsulation } from '@angular/core';
import { VideoStats } from '@core/models';

@Component({
  selector: 'app-video-statistics',
  templateUrl: './video-statistics.component.html'
})
export class VideoStatisticsComponent {
  @Input() videoStatistics: VideoStats | null | undefined = null;
}
