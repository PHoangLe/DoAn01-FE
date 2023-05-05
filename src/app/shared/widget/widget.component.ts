import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.less']
})
export class WidgetComponent {
  @Input() breadcrumbItimes: MenuItem[];
}
