export const PUBLIC_IMAGE_FOLDER = '/images/';
export const DEFAULT_BANNER_IMAGE = '/images/banners/default.png';
export const banners = ['banners/cloud.jpg', 'banners/dns-server.png', 'banners/js.jpg', 'banners/full-stack-web-development.jpg', 'banners/load-balancer.png'];
export const total = banners.length;

const selectOptions = [
  {
    label: 'Cricket',
    value: 'cricket',
  },
  {
    label: 'Football',
    value: 'football',
  },
];
const radioOptionsCricket = [
  {
    label: 'Wicket Keeper',
    value: 'wicket keeper',
  },
  {
    label: 'Batsman',
    value: 'batsman',
  },
  {
    label: 'Bowler',
    value: 'bowler',
  },
  {
    label: 'All Rounder',
    value: 'all rounder',
  },
];

const radioOptionsFootball = [
  {
    label: 'Striker',
    value: 'striker',
  },
  {
    label: 'Defender',
    value: 'defender',
  },
];
export { selectOptions, radioOptionsCricket, radioOptionsFootball };
