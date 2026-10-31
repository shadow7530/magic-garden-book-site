# มหัศจรรย์สวนเวทมนตร์ — เว็บไซต์แนะนำหนังสือ

เว็บไซต์แนะนำหนังสือแบบ One-page สำหรับ **มหัศจรรย์สวนเวทมนตร์ เล่ม 1: สูตรพิศวงของแม่มดสมุนไพร** ใช้ภาพปกจริงจากผู้ใช้และองค์ประกอบ SVG วาดขึ้นเฉพาะโปรเจกต์ เพื่อเลี่ยงหน้าตาเทมเพลตสำเร็จรูป

## เปิดใช้งาน
1. แตกไฟล์ ZIP
2. เปิดโฟลเดอร์ `magic-garden-book-site` ใน VS Code
3. เปิด `index.html` โดยตรง หรือใช้ส่วนขยาย Live Server เพื่อทดลองบนเบราว์เซอร์

## โครงสร้างไฟล์
- `index.html` — Header, Hero, เรื่องย่อ, กลุ่มผู้อ่าน, พื้นฐานการอ่าน, ข้อคิด, รายละเอียดหนังสือ, ปุ่มสั่งซื้อ และ SEO/AEO
- `css/style.css` — โทนสี รูปแบบกระดาษ ภาพตกแต่ง การจัดวาง Responsive และ animation
- `js/script.js` — เมนูมือถือ เอฟเฟกต์ปุ่ม Scroll reveal และเมนู active ตาม section
- `images/book-cover.jpg` — ภาพปกหนังสือที่ผู้ใช้ส่งมา ตัดเฉพาะขอบว่างด้านข้าง
- `images/motion/jarrett-hero.webp` — ภาพจาเรตต์ถือช่อดอกไม้ที่ปรับขนาดสำหรับใช้ใน Hero
- `assets/vine-corner.svg` — เถาวัลย์มุมหน้าเว็บ
- `assets/pressed-flower.svg` — ดอกไม้แห้งตกแต่ง
- `assets/sealed-letter.svg` — จดหมายปิดผนึกแบบวาดมือ
- `assets/herb-bottles.svg` — ขวดสมุนไพรและบันทึกสวน
- `assets/open-herb-book.svg` — สมุดพฤกษศาสตร์เปิดหน้า
- `assets/garden-gate.svg` — ประตูสวนแฟนตาซี

## เทคโนโลยี
- HTML5, CSS3, JavaScript
- Bootstrap 5.3.3 ผ่าน CDN
- Google Fonts: Kanit และ Mali
- Structured data แบบ Schema.org Book, title/meta description, Open Graph, semantic headings, alt text และเนื้อหาตอบ AEO ที่แสดงจริงบนหน้าเว็บ

## หมายเหตุ
Bootstrap และ Google Fonts โหลดจาก CDN จึงต้องเชื่อมต่ออินเทอร์เน็ตเพื่อให้แสดงผลครบถ้วน ปุ่มสั่งซื้อเปิดหน้าสินค้า Nanmeebooks ที่ผู้ใช้ให้มา ไม่มีระบบรีวิวหรือเก็บข้อมูลผู้ใช้เพราะไม่จำเป็นสำหรับเว็บแนะนำหนังสือเล่มเดียว


## JavaScript feature for the assignment

This version selects **Animate On Scroll (AOS)** as the one assessed feature from the three allowed options. AOS is loaded from its CDN and initialized in `js/script.js`. Major sections and the supplied Jarrett character use `data-aos` attributes with gentle, one-time reveal animations. The character also has a subtle floating animation, disabled for reduced-motion preferences. If AOS fails to load or the visitor requests reduced motion, the content remains visible.

The page keeps the supplied book cover, the Nanmeebooks purchase URL, responsive breakpoints, SEO metadata, and the four AEO answers.


## Enchanted Garden Animation update

This build keeps **AOS (Animate On Scroll)** as the primary animation library for the assignment and adds lightweight CSS/JavaScript motion using the uploaded image assets:

- Gentle parallax movement on two separate watercolor garden panoramas (one in the Hero, one in the purchase section). These are distinct images, not a matched three-layer scene.
- Butterfly gliding and subtle flutter motion.
- Falling petals, drifting leaves, floating flowers and twinkling golden sparkles generated from the transparent PNG artwork.
- A slow floating effect on Jarrett's reading illustration.
- Paper/card hover lift on mouse-capable devices.
- Staggered AOS reveals for cards and reader traits.

The animation system respects `prefers-reduced-motion`. When reduced motion is requested, decorative particles and parallax are not initialized and AOS data attributes are removed so all content remains visible.

New optimized assets are stored in `images/motion/` as transparent WebP files to reduce file size while retaining alpha transparency.


## Animation and artwork package (current build)

The latest build retains AOS as its primary scroll-animation library and supplements it with lightweight CSS/JavaScript effects:

- Scroll parallax on the greenhouse panorama in the Hero and the garden-path panorama in the purchase section. These are two separate artworks, not a matched three-layer parallax scene.
- Gentle butterfly gliding/flutter, drifting petals and leaves, floating blossoms, and twinkling stars.
- A slow floating effect for Jarrett's reading illustration.
- Staggered AOS reveals for reader-trait notes, takeaways cards, and book details.
- Paper/card hover lift on pointer devices, matching watercolor icons beside section headings, and a center-out reveal of the single gate illustration. The gate reveal is not a physically swinging two-panel animation because the supplied gate is one complete image.
- `prefers-reduced-motion` support: ambient motion is disabled and all content stays visible.

Optimized, transparent WebP assets used by the website are stored in `images/motion/`. The additional supplied artwork is retained in compressed form in `images/source-artwork/` for possible future use. The original book cover remains unchanged in `images/book-cover.jpg`.


## Visual refinements from the latest review

- The garden gate image now uses `height: auto` and `object-fit: contain` so its natural aspect ratio is preserved instead of stretching vertically.
- The reader recommendation section has a narrower column gap and a slightly larger, better-aligned herb illustration, bringing it closer to the explanatory text.
- The Hero invitation line “ค่อย ๆ เปิดหน้ากระดาษ แล้วออกเดินทางไปด้วยกัน” uses a darker sage-ink color, stronger font weight, and slightly larger type for better contrast on the cream background.
