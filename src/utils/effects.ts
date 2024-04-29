import {type ImageSourcePropType} from 'react-native';

import flashImageSrc from '../assets/ic_effect_flash.gif';
import invertImageSrc from '../assets/ic_effect_invert.gif';
import marqueeImageSrc from '../assets/ic_effect_marquee.gif';

interface effectType {
  imagePath: ImageSourcePropType;
  placeholder: string;
  name: string;
}

export const effects = [
  {
    imagePath: flashImageSrc,
    placeholder: 'Flash',
    name: 'effects.flash',
  },
  {
    imagePath: marqueeImageSrc,
    placeholder: 'Marquee',
    name: 'effects.marquee',
  },
  {
    imagePath: invertImageSrc,
    placeholder: 'Invert LED',
    name: 'effects.invertLed',
  },
] as const satisfies effectType[];
