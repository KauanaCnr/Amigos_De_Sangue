import { Component, OnInit } from '@angular/core';
import { Swiper } from 'swiper';
import { register } from 'swiper/element/bundle';
// import { SwiperOptions } from 'swiper/types';
register()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
 config = {
    pagination: { dynamicBullets: true },
    keyboard: true,
    navigation: { nextEl: "#swiper-forward", prevEl: "#swiper-back" },
  };
  constructor() { }

  ngOnInit() {
      setTimeout(() => {
      const swiper = new Swiper('.swiper', this.config);
      swiper.update();
    }, 300);
  }

}
