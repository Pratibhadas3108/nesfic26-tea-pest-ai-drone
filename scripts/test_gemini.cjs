const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  try {
    console.log("Connecting to Chrome on port 9223...");
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9223', defaultViewport: null });
    const pages = await browser.pages();
    let geminiPage = pages.find(p => p.url().includes('gemini.google.com'));
    if (!geminiPage) {
      geminiPage = await browser.newPage();
      await geminiPage.goto('https://gemini.google.com/app', { waitUntil: 'networkidle2' });
    } else {
      await geminiPage.bringToFront();
    }

    console.log("Navigating to new chat session...");
    await geminiPage.goto('https://gemini.google.com/app', { waitUntil: 'networkidle2' });
    await sleep(2500);

    const inputFound = await geminiPage.evaluate(() => {
      const el = document.querySelector('rich-textarea div[contenteditable="true"]');
      return !!el;
    });
    console.log("Input found on fresh app page:", inputFound);

    const existingImages = await geminiPage.evaluate(() => {
      return Array.from(document.querySelectorAll('img')).map(img => img.src).filter(Boolean);
    });
    console.log("Existing images count:", existingImages.length);

    browser.disconnect();
  } catch (err) {
    console.error("Test error:", err.message);
  }
})();
