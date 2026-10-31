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

This version selects **Animate On Scroll (AOS)** as the one assessed feature from the three allowed options. AOS is loaded from its CDN and initialized in `js/script.js`. Major sections use `data-aos` attributes with gentle, one-time reveal animations. If AOS fails to load or the visitor requests reduced motion, the content remains visible.

The page keeps the supplied book cover, the Nanmeebooks purchase URL, responsive breakpoints, SEO metadata, and the four AEO answers.
