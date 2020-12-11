import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'car-side',
      sanitizer.bypassSecurityTrustResourceUrl('assets/imagens/icons/car-side-solid.svg'));

    iconRegistry.addSvgIcon(
      'chart-bar',
      sanitizer.bypassSecurityTrustResourceUrl('assets/imagens/icons/chart-bar-solid.svg'));

    iconRegistry.addSvgIcon(
      'border-all-solid',
      sanitizer.bypassSecurityTrustResourceUrl('assets/imagens/icons/border-all-solid.svg'));
  }

  ngOnInit() {
  }

}
