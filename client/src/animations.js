import { TweenMax } from 'gsap';

export default {
 dropDown(target, number) {
  return TweenMax.to(target, 0.5, {
   height: number
  });
 },
 dropUp(target) {
  return TweenMax.to(target, 0.5, {
   height: 20
  });
 },
 turnArrow(target, num) {
  return TweenMax.to(target, 0.5, {
   transform: `rotateZ(${num}deg)`
  });
 },
 shakeModal(target) {
  return TweenMax.to(target, 0.06, { x: '+=6', yoyo: true, repeat: 5 });
 }
};
