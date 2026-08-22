import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import sharp from 'sharp';

const assetsDir = 'e:/project/Portfolio/public/assets';

const videos = [
  'Final Render (1).mp4',
  'MainFortuner.mp4',
  'Ktm_final.mp4',
  'final1.mp4',
  'AQMdlYRlPx1d2YcTibXG2fF_E_YcotNIUBb0SVvg3ahUcaZ0Q2PBalYlmnDP_sdJYWIlNWt.mp4',
  'AQMf8MPwwu4AdBycM29pSX4ISYu5C5irI8qsZOmSnptIb_NVFkF_Egta7Bv3ATL.mp4',
  'AQPJkkFIq_j4ZSqrDdaBU2q7wf36ZX2i2zaSlheSjKlEQDfHwiYakx9JAFRsFk3j.mp4',
  'AQPWFQ_Ltuc38ziD_PP1Ugnjix6hEpQzEfEDB3A6rxJm5HOLpS6heKtLrTV4KhFjm09HD88i.mp4',
];

const images = [
  'fuezo text.jpg',
  'Eid.jpg',
  'Logo FUezo.png',
  'yathra.jpg',
  'porsche.jpg',
  'ds.jpg',
  'Academic counsellor.jpg',
  'Artboard 2.jpg',
  'Bike Taxi.png',
  'Cognita Poster1.jpg',
  'DM Hiring.jpg',
  'Fitness Trainer.jpg',
  'Fuezo2.jpg',
  'Hiring.png',
  'Join Poster.jpg',
  'SA.jpg',
  'Speakify Typo.jpg',
  'Speakify.png',
  'image.png'
];

async function run() {
  console.log('--- Starting Video Compression & Poster Generation ---');
  for (const vid of videos) {
    const inputPath = path.join(assetsDir, vid);
    const ext = path.extname(vid);
    const base = path.basename(vid, ext);

    const optVidName = `opt_${base}.mp4`;
    const optVidPath = path.join(assetsDir, optVidName);

    const posterJpgName = `poster_${base}.jpg`;
    const posterJpgPath = path.join(assetsDir, posterJpgName);

    const posterWebpName = `poster_${base}.webp`;
    const posterWebpPath = path.join(assetsDir, posterWebpName);

    console.log(`Processing video: ${vid}...`);
    
    // 1. Extract poster frame at 00:00:01
    try {
      execSync(`"${ffmpegPath}" -ss 00:00:01 -i "${inputPath}" -vframes 1 -q:v 2 "${posterJpgPath}" -y`, { stdio: 'ignore' });
      // Convert poster to webp
      await sharp(posterJpgPath)
        .resize({ width: 960, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(posterWebpPath);
      if (fs.existsSync(posterJpgPath)) fs.unlinkSync(posterJpgPath);
      console.log(`  -> Poster created: ${posterWebpName} (${(fs.statSync(posterWebpPath).size / 1024).toFixed(1)} KB)`);
    } catch (e) {
      console.error(`  Error creating poster for ${vid}:`, e.message);
    }

    // 2. Compress video using H.264, faststart, crf 27, scale 1280 max
    try {
      const origSize = fs.statSync(inputPath).size;
      execSync(
        `"${ffmpegPath}" -i "${inputPath}" -c:v libx264 -crf 27 -preset fast -vf "scale='min(1280,iw)':-2" -c:a aac -b:a 96k -movflags +faststart "${optVidPath}" -y`,
        { stdio: 'ignore' }
      );
      const newSize = fs.statSync(optVidPath).size;
      console.log(
        `  -> Video compressed: ${optVidName} | ${(origSize / 1024 / 1024).toFixed(2)} MB -> ${(newSize / 1024 / 1024).toFixed(2)} MB`
      );
    } catch (e) {
      console.error(`  Error compressing video ${vid}:`, e.message);
    }
  }

  console.log('\n--- Starting Image Compression (WebP Conversion) ---');
  for (const img of images) {
    const inputPath = path.join(assetsDir, img);
    const ext = path.extname(img);
    const base = path.basename(img, ext);
    const optWebpName = `opt_${base}.webp`;
    const optWebpPath = path.join(assetsDir, optWebpName);

    try {
      const origSize = fs.statSync(inputPath).size;
      await sharp(inputPath)
        .resize({ width: 1400, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(optWebpPath);
      const newSize = fs.statSync(optWebpPath).size;
      console.log(
        `Compressed image: ${img} -> ${optWebpName} | ${(origSize / 1024).toFixed(1)} KB -> ${(newSize / 1024).toFixed(1)} KB`
      );
    } catch (e) {
      console.error(`Error compressing image ${img}:`, e.message);
    }
  }

  console.log('\n--- All Processing Finished! ---');
}

run();
