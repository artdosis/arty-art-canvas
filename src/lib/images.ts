import murals from "@/assets/work-murals.jpg";
import liveArt from "@/assets/work-live-art.jpg";
import commissions from "@/assets/work-commissions.jpg";
import music from "@/assets/work-music.jpg";
import distribution from "@/assets/work-distribution.jpg";
import sound from "@/assets/work-sound.jpg";
import wellbeing from "@/assets/work-wellbeing.jpg";
import originals from "@/assets/shop-originals.jpg";
import prints from "@/assets/shop-prints.jpg";
import wearable from "@/assets/shop-wearable.jpg";
import awakening from "@/assets/awakening.jpg";
import pfPeace from "@/assets/pf-peace.jpg";
import pfWho from "@/assets/pf-who.jpg";
import pfSchool from "@/assets/pf-school.jpg";
import pfGala from "@/assets/pf-gala.jpg";
import pfValley from "@/assets/pf-valley.jpg";
import pfWedding from "@/assets/pf-wedding.jpg";
import pfPortrait from "@/assets/pf-portrait.jpg";
import pfPet from "@/assets/pf-pet.jpg";
import pfBrand from "@/assets/pf-brand.jpg";
import pfWheels from "@/assets/pf-wheels.jpg";
import exFestival from "@/assets/ex-festival.jpg";
import exLiveband from "@/assets/ex-liveband.jpg";
import exOpening from "@/assets/ex-opening.jpg";
import exImmersive from "@/assets/ex-immersive.jpg";

export const SHOP_IMG = { originals, prints, wearable };
export const AWAKENING_IMG = awakening;

export const EXP_IMG: Record<string, string> = {
  awakening,
  opening: exOpening,
  immersive: exImmersive,
  festival: exFestival,
  liveband: exLiveband,
  sound,
  music,
  wellbeing,
  "pf-peace": pfPeace,
  "pf-valley": pfValley,
  "pf-wedding": pfWedding,
  "pf-gala": pfGala,
  "pf-school": pfSchool,
};

export function expImage(key: string) {
  return EXP_IMG[key] ?? exOpening;
}


export const SERVICE_IMG: Record<string, string> = {
  murals,
  "live-art": liveArt,
  commissions,
  "music-production": music,
  "music-distribution": distribution,
  "sound-engineering": sound,
  "wellbeing-programs": wellbeing,
};

export const PORTFOLIO_IMG: Record<string, string> = {
  Peace: pfPeace,
  "Who are you?": pfWho,
  "School mural, Melbourne": pfSchool,
  "UNESCO fundraiser": pfGala,
  "Doctors Without Borders": pfGala,
  "Hunter Valley": pfValley,
  "Wedding live painting": pfWedding,
  "Portrait commission": pfPortrait,
  "Pet portrait": pfPet,
  "Single release": music,
  "EP distribution": distribution,
  "Live recording session": sound,
  "Brand activation wall": pfBrand,
  "Art wheels": pfWheels,
  Awakening: awakening,
};

export function pfImage(title: string) {
  return PORTFOLIO_IMG[title] ?? pfPeace;
}
