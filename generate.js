const fs = require('fs');
const path = require('path');

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Portfolio | 作品合集</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Great+Vibes&family=Caveat:wght@400;600;700&family=Noto+Serif+SC:wght@300;400;500;700&display=swap" rel="stylesheet">
<style>
:root{--pink-deep:#e8a0bf;--pink-medium:#f2c4d7;--pink-light:#fce4ec;--pink-pale:#fff0f5;--cream:#faf5f0;--cream-dark:#f5ede4;--text-dark:#2d2024;--text-medium:#5a4a4f;--text-light:#8a7a7f;--black-soft:#1a1015;--ribbon-pink:#f0a8c0;--star-pink:#f5b0c8;--tape:#e8dcc8;--shadow-soft:rgba(180,140,150,0.15);--shadow-medium:rgba(180,140,150,0.25)}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth;font-size:16px}
body{font-family:'Noto Serif SC','Georgia',serif;color:var(--text-dark);background:var(--cream);overflow-x:hidden;line-height:1.6}
a{text-decoration:none;color:inherit}
.nav{position:fixed;top:0;left:0;right:0;z-index:1000;padding:1rem 2rem;display:flex;justify-content:center;align-items:center;background:rgba(250,245,240,0.92);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:1px solid rgba(200,160,170,0.15);transition:all 0.3s ease}
.nav.scrolled{padding:0.7rem 2rem;box-shadow:0 2px 20px var(--shadow-soft)}
.nav-links{display:flex;gap:3rem;list-style:none}
.nav-links a{font-family:'Caveat',cursive;font-size:1.3rem;color:var(--text-medium);position:relative;padding:0.3rem 0;transition:color 0.3s ease}
.nav-links a::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:2px;background:var(--pink-deep);transition:width 0.3s ease}
.nav-links a:hover{color:var(--text-dark)}
.nav-links a:hover::after,.nav-links a.active::after{width:100%}
.hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:5px;z-index:1001}
.hamburger span{width:25px;height:2px;background:var(--text-dark);transition:all 0.3s ease}
.hamburger.active span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}
.hamburger.active span:nth-child(2){opacity:0}
.hamburger.active span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative;overflow:hidden;background-color:var(--cream);background-image:radial-gradient(ellipse at 20% 80%,rgba(240,180,190,0.25) 0%,transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(230,200,180,0.15) 0%,transparent 50%)}
.hero-content{text-align:center;position:relative;z-index:2}
.hero-torn-paper{position:relative;display:inline-block;padding:1.5rem 3rem 2rem;margin:1rem}
.hero-torn-paper::before{content:'';position:absolute;inset:0;background:#faf5f0;filter:drop-shadow(0 8px 25px rgba(180,140,150,0.2));clip-path:polygon(0% 8%,2% 2%,5% 7%,8% 1%,12% 6%,15% 0%,18% 5%,22% 2%,25% 8%,28% 1%,32% 6%,35% 0%,38% 5%,42% 2%,45% 8%,48% 1%,52% 6%,55% 0%,58% 5%,62% 2%,65% 8%,68% 1%,72% 6%,75% 0%,78% 5%,82% 2%,85% 8%,88% 1%,92% 6%,95% 0%,98% 4%,100% 10%,98% 92%,95% 98%,92% 94%,88% 99%,85% 95%,82% 100%,78% 96%,75% 100%,72% 95%,68% 100%,65% 95%,62% 100%,58% 96%,55% 100%,52% 95%,48% 100%,45% 96%,42% 100%,38% 95%,35% 100%,32% 96%,28% 100%,25% 95%,22% 100%,18% 96%,15% 100%,12% 95%,8% 100%,5% 96%,2% 100%,0% 95%);z-index:-1}
.hero-title{font-family:'Caveat',cursive;font-size:clamp(5rem,15vw,12rem);font-weight:700;color:var(--black-soft);letter-spacing:0.05em;line-height:1;position:relative;display:inline-block}
.ribbon-bow-container{position:absolute;top:-40px;left:50%;transform:translateX(-50%);width:clamp(80px,15vw,160px);z-index:3}
.hero-subtitle{font-family:'Noto Serif SC',serif;font-size:clamp(0.9rem,2vw,1.2rem);font-weight:400;color:var(--cream);background:var(--text-dark);padding:0.4rem 1.2rem;display:inline-block;margin-top:-0.5rem;letter-spacing:0.1em}
.hero-decorations{position:absolute;inset:0;pointer-events:none;z-index:1}
.deco-star{position:absolute;animation:twinkle 3s ease-in-out infinite}
.deco-star:nth-child(1){top:15%;left:8%;font-size:3.5rem}
.deco-star:nth-child(2){top:10%;left:20%;font-size:1.5rem;animation-delay:0.5s}
.deco-star:nth-child(3){bottom:20%;right:10%;font-size:2.5rem;animation-delay:1s;color:var(--star-pink)}
.deco-star:nth-child(4){top:30%;right:15%;font-size:1.2rem;animation-delay:1.5s}
.deco-star:nth-child(5){bottom:15%;left:12%;font-size:1rem;animation-delay:0.8s}
.deco-star:nth-child(6){top:25%;left:5%;font-size:1.8rem;animation-delay:2s}
.deco-plus{position:absolute;font-family:'Caveat',cursive;font-size:1.5rem;color:var(--text-light);opacity:0.5;animation:float 4s ease-in-out infinite}
.deco-plus:nth-child(7){top:40%;left:10%}
.deco-plus:nth-child(8){top:50%;right:8%;animation-delay:1s}
.deco-plus:nth-child(9){bottom:30%;right:15%;animation-delay:2s}
.deco-plus:nth-child(10){top:60%;left:5%;animation-delay:0.5s}
.deco-circle{position:absolute;width:20px;height:20px;border:2px solid var(--text-light);border-radius:50%;opacity:0.4}
.deco-circle:nth-child(11){top:55%;left:12%}
.deco-circle:nth-child(12){bottom:25%;right:8%}
.deco-tape{position:absolute;width:80px;height:25px;background:var(--tape);opacity:0.5;transform:rotate(-15deg);top:8%;right:12%;border-radius:2px}
.deco-splash{position:absolute;border-radius:50%;background:radial-gradient(circle,rgba(240,160,180,0.3) 0%,transparent 70%)}
.deco-splash:nth-child(13){bottom:0;left:0;width:300px;height:200px}
.deco-splash:nth-child(14){bottom:5%;right:5%;width:150px;height:150px}
.scroll-hint{position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:0.5rem;animation:bounce 2s ease-in-out infinite}
.scroll-hint span{font-family:'Caveat',cursive;font-size:0.9rem;color:var(--text-light)}
.scroll-hint .arrow{width:20px;height:20px;border-right:2px solid var(--text-light);border-bottom:2px solid var(--text-light);transform:rotate(45deg)}
.about{min-height:100vh;padding:8rem 2rem 6rem;position:relative;overflow:hidden;background-color:var(--pink-pale);background-image:radial-gradient(ellipse at 30% 30%,rgba(255,180,200,0.2) 0%,transparent 60%),radial-gradient(ellipse at 70% 70%,rgba(240,160,180,0.15) 0%,transparent 60%)}
.about-inner{max-width:1200px;margin:0 auto}
.about-me-label{text-align:center;margin-bottom:3rem;position:relative}
.about-me-label .envelope-group{display:inline-block;position:relative}
.about-me-text{font-family:'Great Vibes',cursive;font-size:clamp(2rem,5vw,3.5rem);color:var(--text-dark);position:relative;z-index:1}
.hi-section{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start;margin-top:2rem}
.hi-left{position:relative}
.hi-greeting{font-family:'Great Vibes',cursive;font-size:clamp(3rem,6vw,5rem);color:rgba(255,255,255,0.7);margin-bottom:-1rem;line-height:1}
.hi-greeting-there{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3.5rem);color:rgba(255,255,255,0.6);margin-left:1rem}
.section-number{font-family:'Playfair Display',serif;font-size:1.2rem;color:var(--text-light);text-align:right;margin-bottom:1rem}
.info-card{background:var(--cream);padding:2rem 2rem 2.5rem;position:relative;box-shadow:0 4px 30px var(--shadow-soft)}
.info-card::before{content:'';position:absolute;inset:0;background:var(--cream);clip-path:polygon(0% 0%,3% 0.5%,5% 0%,8% 0.5%,10% 0%,15% 0.5%,20% 0%,25% 0.5%,30% 0%,35% 0.5%,40% 0%,45% 0.5%,50% 0%,55% 0.5%,60% 0%,65% 0.5%,70% 0%,75% 0.5%,80% 0%,85% 0.5%,90% 0%,95% 0.5%,97% 0%,100% 0%,100% 3%,99.5% 5%,100% 8%,99.5% 10%,100% 15%,99.5% 20%,100% 25%,99.5% 30%,100% 35%,99.5% 40%,100% 45%,99.5% 50%,100% 55%,99.5% 60%,100% 65%,99.5% 70%,100% 75%,99.5% 80%,100% 85%,99.5% 90%,100% 95%,99.5% 97%,100% 100%,97% 100%,95% 99.5%,90% 100%,85% 99.5%,80% 100%,75% 99.5%,70% 100%,65% 99.5%,60% 100%,55% 99.5%,50% 100%,45% 99.5%,40% 100%,35% 99.5%,30% 100%,25% 99.5%,20% 100%,15% 99.5%,10% 100%,5% 99.5%,3% 100%,0% 99.5%);z-index:-1}
.info-card .tape-deco{position:absolute;top:-10px;left:-5px;width:60px;height:20px;background:linear-gradient(135deg,rgba(230,200,180,0.8),rgba(240,180,200,0.6));transform:rotate(-5deg);border-radius:1px}
.info-intro{font-size:0.95rem;line-height:2;color:var(--text-medium);margin-bottom:1.5rem}
.info-intro .heart-deco{color:var(--pink-deep);font-size:1.2rem;float:right;margin-top:0.5rem}
.info-sub{margin-bottom:1.2rem}
.info-sub-title{font-family:'Caveat',cursive;font-size:1.1rem;font-weight:600;color:var(--text-dark);background:linear-gradient(90deg,rgba(240,180,190,0.3),transparent);padding:0.2rem 0.8rem;display:inline-block;margin-bottom:0.5rem;border-radius:2px}
.info-sub-content{font-size:0.85rem;color:var(--text-medium);padding-left:0.8rem;line-height:1.9}
.info-sub-content p{margin-bottom:0.2rem}
.hi-right{position:relative;display:flex;justify-content:center;align-items:center}
.heart-frame{position:relative;width:clamp(250px,25vw,380px);height:clamp(280px,28vw,420px)}
.heart-photo{width:100%;height:100%;position:relative;clip-path:path('M190 30 C190 30,260 -5,310 25 C360 55,360 125,310 175 L190 350 L70 175 C20 125,20 55,70 25 C120 -5,190 30,190 30Z');overflow:hidden}
.heart-photo-inner{width:100%;height:100%;background:linear-gradient(135deg,#c5e8c0 0%,#a8d8a0 30%,#8cc890 60%,#70b880 100%);transform:scale(1.05)}
.heart-lace{position:absolute;inset:-6px;pointer-events:none;z-index:2}
.heart-lace svg{width:100%;height:100%}
.heart-bow-deco{position:absolute;bottom:-20px;right:-30px;width:120px;height:auto;z-index:5}
.deco-star-pink{position:absolute;bottom:20px;left:-20px;z-index:4}
.deco-flower{position:absolute;bottom:-10px;left:50px;z-index:4}
.works{min-height:100vh;padding:6rem 2rem;position:relative;overflow:hidden;background-color:var(--pink-pale);background-image:radial-gradient(ellipse at 50% 50%,rgba(255,180,200,0.15) 0%,transparent 70%)}
.works-inner{max-width:1200px;margin:0 auto}
.works-title{font-family:'Great Vibes',cursive;font-size:clamp(2.5rem,5vw,4rem);color:var(--text-dark);text-align:center;margin-bottom:3rem}
.works-title::after{content:'✦';display:block;font-size:1rem;color:var(--pink-deep);margin-top:0.5rem}
.xhs-showcase{display:grid;grid-template-columns:1fr 1.5fr;gap:3rem;align-items:start}
.xhs-profile-card{background:rgba(255,255,255,0.7);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:12px;padding:1.5rem;box-shadow:0 8px 40px var(--shadow-medium);border:1px solid rgba(255,255,255,0.5)}
.xhs-profile-header{display:flex;align-items:center;gap:1rem;margin-bottom:1rem}
.xhs-avatar{width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,#fce4ec,#f8bbd0);display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0}
.xhs-user-info h4{font-size:0.95rem;color:var(--text-dark);margin-bottom:0.2rem}
.xhs-user-info span{font-size:0.75rem;color:var(--text-light)}
.xhs-stats{display:flex;justify-content:space-around;padding:0.8rem 0;border-top:1px solid rgba(0,0,0,0.06);border-bottom:1px solid rgba(0,0,0,0.06);margin-bottom:1rem}
.xhs-stat{text-align:center}
.xhs-stat .num{font-size:1.1rem;font-weight:700;color:var(--text-dark)}
.xhs-stat .label{font-size:0.7rem;color:var(--text-light)}
.xhs-bio{font-size:0.8rem;color:var(--text-medium);line-height:1.7;margin-bottom:1rem}
.xhs-tags{display:flex;flex-wrap:wrap;gap:0.5rem}
.xhs-tag{font-size:0.7rem;padding:0.2rem 0.6rem;background:var(--pink-light);color:var(--pink-deep);border-radius:20px}
.works-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.work-card{background:rgba(255,255,255,0.8);border-radius:10px;overflow:hidden;box-shadow:0 4px 20px var(--shadow-soft);transition:transform 0.3s ease,box-shadow 0.3s ease;cursor:pointer}
.work-card:hover{transform:translateY(-5px);box-shadow:0 8px 30px var(--shadow-medium)}
.work-card-thumb{width:100%;aspect-ratio:3/4;overflow:hidden}
.work-card-thumb .thumb-placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem}
.work-card-info{padding:0.6rem 0.8rem}
.work-card-info h5{font-size:0.75rem;color:var(--text-dark);margin-bottom:0.3rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.work-card-info .card-stats{display:flex;align-items:center;gap:0.3rem;font-size:0.7rem;color:var(--text-light)}
.work-card-info .card-stats .likes{color:#ff6b6b}
.data-showcase{margin-top:4rem;display:grid;grid-template-columns:1fr 2fr;gap:3rem;align-items:center}
.data-card-left{background:rgba(255,255,255,0.8);border-radius:12px;overflow:hidden;box-shadow:0 8px 40px var(--shadow-medium)}
.video-preview{width:100%;aspect-ratio:9/16}
.video-preview-inner{width:100%;height:100%;background:linear-gradient(180deg,#a8d8ea 0%,#f5d5e0 50%,#c5e8c0 100%);display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1rem;position:relative}
.video-preview-inner .play-overlay{font-size:3rem;color:white;opacity:0.9}
.video-preview-inner .video-title{font-family:'Caveat',cursive;font-size:1.5rem;color:white;text-shadow:0 2px 8px rgba(0,0,0,0.2)}
.video-preview-inner .video-views{display:flex;align-items:center;gap:0.5rem;color:white;font-size:0.9rem}
.video-preview-inner .pin-badge{position:absolute;top:10px;left:10px;background:#ffd700;color:#333;padding:0.2rem 0.8rem;border-radius:4px;font-size:0.75rem;font-weight:700}
.phone-mockups{display:flex;gap:1.5rem;justify-content:center}
.phone-frame{width:clamp(180px,18vw,250px);background:#1a1a1a;border-radius:20px;padding:8px;box-shadow:0 10px 40px rgba(0,0,0,0.2)}
.phone-screen{background:#fff;border-radius:14px;overflow:hidden}
.phone-notch{height:20px;background:#1a1a1a;display:flex;justify-content:center;align-items:center}
.phone-notch::after{content:'';width:40%;height:6px;background:#333;border-radius:3px}
.phone-content{padding:0.8rem}
.notebook-deco{width:20px;display:flex;flex-direction:column;gap:12px;padding:1rem 0}
.notebook-ring{width:16px;height:16px;border:2px solid #ccc;border-radius:50%}
.footer{text-align:center;padding:3rem 2rem;background:var(--cream-dark);border-top:1px solid rgba(200,160,170,0.15)}
.footer p{font-family:'Caveat',cursive;font-size:1.1rem;color:var(--text-light)}
.footer .footer-deco{font-size:1.5rem;margin-bottom:0.5rem}
@keyframes twinkle{0%,100%{opacity:1;transform:scale(1) rotate(0deg)}50%{opacity:0.7;transform:scale(0.9) rotate(10deg)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(8px)}}
.reveal{opacity:0;transform:translateY(40px);transition:opacity 0.8s ease,transform 0.8s ease}
.reveal.visible{opacity:1;transform:translateY(0)}
.reveal-delay-1{transition-delay:0.1s}
.reveal-delay-2{transition-delay:0.2s}
.reveal-delay-3{transition-delay:0.3s}
.reveal-delay-4{transition-delay:0.4s}
.reveal-delay-5{transition-delay:0.5s}
@media(max-width:1023px){.hi-section{grid-template-columns:1fr;gap:3rem}.hi-right{order:-1}.heart-frame{width:clamp(200px,40vw,300px);height:clamp(220px,45vw,340px)}.xhs-showcase{grid-template-columns:1fr}.data-showcase{grid-template-columns:1fr}.data-card-left{max-width:300px;margin:0 auto}.works-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:767px){.nav-links{position:fixed;top:0;right:-100%;width:70%;height:100vh;background:rgba(250,245,240,0.98);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);flex-direction:column;justify-content:center;align-items:center;gap:2rem;transition:right 0.4s ease}.nav-links.open{right:0}.nav-links a{font-size:1.6rem}.hamburger{display:flex}.hero-title{font-size:clamp(3.5rem,18vw,7rem)}.hero-torn-paper{padding:1rem 1.5rem 1.5rem}.about{padding:6rem 1.5rem 4rem}.info-card{padding:1.5rem}.works-grid{grid-template-columns:repeat(2,1fr);gap:0.8rem}.phone-mockups{flex-direction:column;align-items:center}.notebook-deco{display:none}.data-showcase{grid-template-columns:1fr;gap:2rem}.deco-star:nth-child(3),.deco-star:nth-child(6),.deco-plus:nth-child(9),.deco-plus:nth-child(10){display:none}}
@media(max-width:480px){.works-grid{grid-template-columns:1fr 1fr;gap:0.6rem}.work-card-info h5{font-size:0.65rem}.xhs-profile-card{padding:1rem}}
</style>
</head>
<body>

<nav class="nav" id="nav">
  <div class="hamburger" id="hamburger"><span></span><span></span><span></span></div>
  <ul class="nav-links" id="navLinks">
    <li><a href="#hero" class="active">首页</a></li>
    <li><a href="#about">关于</a></li>
    <li><a href="#works">作品</a></li>
  </ul>
</nav>

<section class="hero" id="hero">
  <div class="hero-decorations">
    <span class="deco-star">★</span>
    <span class="deco-star">★</span>
    <span class="deco-star">★</span>
    <span class="deco-plus">+</span>
    <span class="deco-plus">+</span>
    <span class="deco-plus">+</span>
    <div class="deco-circle"></div>
    <div class="deco-circle"></div>
    <div class="deco-tape"></div>
    <div class="deco-splash"></div>
    <div class="deco-splash"></div>
  </div>
  <div class="hero-content">
    <div class="hero-torn-paper">
      <div class="ribbon-bow-container">
        <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;filter:drop-shadow(0 4px 8px rgba(200,140,160,0.3))">
          <path d="M100 55 C80 30,30 10,25 40 C20 65,70 65,100 55Z" fill="#f0a8c0" opacity="0.9"/>
          <path d="M100 55 C120 30,170 10,175 40 C180 65,130 65,100 55Z" fill="#f0a8c0" opacity="0.9"/>
          <ellipse cx="100" cy="55" rx="12" ry="8" fill="#e898b0"/>
          <ellipse cx="100" cy="53" rx="10" ry="6" fill="#f5b8cc"/>
          <path d="M92 58 L75 95 L82 95 L96 62Z" fill="#f0a8c0" opacity="0.85"/>
          <path d="M108 58 L125 95 L118 95 L104 62Z" fill="#f0a8c0" opacity="0.85"/>
        </svg>
      </div>
      <h1 class="hero-title">Portfolio</h1>
      <div class="hero-subtitle">work collection</div>
    </div>
  </div>
  <div class="scroll-hint"><span>向下滚动</span><div class="arrow"></div></div>
</section>

<section class="about" id="about">
  <div class="about-inner">
    <div class="about-me-label reveal">
      <div class="envelope-group">
        <span class="about-me-text">About Me</span>
      </div>
    </div>
    <div class="hi-section">
      <div class="hi-left">
        <div class="hi-greeting reveal">Hi</div>
        <div class="hi-greeting-there reveal reveal-delay-1">there</div>
        <div class="section-number reveal reveal-delay-2">/02</div>
        <div class="info-card reveal reveal-delay-3">
          <div class="tape-deco"></div>
          <p class="info-intro">我是一名数字媒体方向的视觉创作者，专注于摄影、视频剪辑与新媒体内容表达。目前就读于南京传媒学院数字媒体技术专业，在学习过程中不断探索影像、设计与叙事之间的关系。我擅长通过视觉语言表达情绪与故事感，喜欢偏少女感、杂志拼贴风格的视觉创作方式。<span class="heart-deco">♡</span></p>
          <div class="info-sub">
            <div class="info-sub-title">Experience 经历</div>
            <div class="info-sub-content">
              <p>· 参与校融媒体中心宣传与视觉内容制作</p>
              <p>· 负责摄影拍摄、活动记录与公众号排版编辑</p>
            </div>
          </div>
          <div class="info-sub">
            <div class="info-sub-title">Specialized in 擅长领域</div>
            <div class="info-sub-content">
              <p>· 摄影拍摄（人像/活动记录）</p>
              <p>· 视频剪辑（信息流/vlog/口播）</p>
              <p>· 新媒体账号运营（小红书/抖音）</p>
              <p>· 公众号文案与内容编辑</p>
              <p>· 分镜头脚本设计</p>
              <p>· 基础3D视觉（3ds Max）</p>
              <p>· AI辅助视觉创作</p>
            </div>
          </div>
          <div class="info-sub">
            <div class="info-sub-title">Tools 工具</div>
            <div class="info-sub-content">
              <p>· Photoshop · Premiere · After Effects</p>
              <p>· Illustrator · 3ds Max · Notion · CapCut</p>
            </div>
          </div>
          <div class="info-sub">
            <div class="info-sub-title">Style 风格关键词</div>
            <div class="info-sub-content">视觉叙事 · 少女感 · 杂志风 · 拼贴感 · 氛围感 · 新媒体内容</div>
          </div>
        </div>
      </div>
      <div class="hi-right reveal reveal-delay-2">
        <div class="heart-frame">
          <div class="heart-photo"><div class="heart-photo-inner"></div></div>
          <div class="heart-lace">
            <svg viewBox="0 0 400 440" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;z-index:2;pointer-events:none">
              <path d="M200 30 C200 30,280 -8,335 25 C390 58,390 130,335 183 L200 370 L65 183 C10 130,10 58,65 25 C120 -8,200 30,200 30Z" fill="none" stroke="white" stroke-width="4" opacity="0.8"/>
              <path d="M200 30 C200 30,280 -8,335 25 C390 58,390 130,335 183 L200 370 L65 183 C10 130,10 58,65 25 C120 -8,200 30,200 30Z" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1" stroke-dasharray="3 5"/>
            </svg>
          </div>
          <svg class="heart-bow-deco" viewBox="0 0 140 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M70 45 C50 20,15 5,10 35 C5 60,45 60,70 45Z" fill="#e8a0bf" opacity="0.85"/>
            <path d="M70 45 C90 20,125 5,130 35 C135 60,95 60,70 45Z" fill="#e8a0bf" opacity="0.85"/>
            <ellipse cx="70" cy="45" rx="10" ry="7" fill="#d88fa0"/>
            <ellipse cx="70" cy="43" rx="8" ry="5" fill="#e8a0bf"/>
            <path d="M62 48 L50 80 L56 80 L66 52Z" fill="#e8a0bf" opacity="0.8"/>
            <path d="M78 48 L90 80 L84 80 L74 52Z" fill="#e8a0bf" opacity="0.8"/>
          </svg>
          <svg class="deco-star-pink" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <polygon points="20,2 25,14 38,14 28,23 31,36 20,29 9,36 12,23 2,14 15,14" fill="#f5b0c8" opacity="0.8" stroke="white" stroke-width="1"/>
          </svg>
          <svg class="deco-flower" width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="8" r="6" fill="#e8a0bf" opacity="0.7"/>
            <circle cx="8" cy="15" r="6" fill="#e8a0bf" opacity="0.7"/>
            <circle cx="22" cy="15" r="6" fill="#e8a0bf" opacity="0.7"/>
            <circle cx="15" cy="22" r="6" fill="#e8a0bf" opacity="0.7"/>
            <circle cx="15" cy="15" r="4" fill="#d4879a"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="works" id="works">
  <div class="works-inner">
    <h2 class="works-title reveal">Works</h2>
    <div class="xhs-showcase">
      <div class="xhs-profile reveal reveal-delay-1">
        <div class="xhs-profile-card">
          <div class="xhs-profile-header">
            <div class="xhs-avatar">🌸</div>
            <div class="xhs-user-info">
              <h4>早川池子 tttt_</h4>
              <span>小红书号：88096936 · IP：江苏</span>
            </div>
          </div>
          <div class="xhs-stats">
            <div class="xhs-stat"><div class="num">149</div><div class="label">关注</div></div>
            <div class="xhs-stat"><div class="num">4711</div><div class="label">粉丝</div></div>
            <div class="xhs-stat"><div class="num">9万</div><div class="label">获赞与收藏</div></div>
          </div>
          <p class="xhs-bio">hello! 欢迎您来～<br>这里是tt05女大 isfp<br>分享平价穿搭好物 | vlog日常<br>快跟我一起发现更多宝藏好物吧</p>
          <div class="xhs-tags">
            <span class="xhs-tag">穿搭</span>
            <span class="xhs-tag">好物分享</span>
            <span class="xhs-tag">vlog</span>
            <span class="xhs-tag">日常</span>
          </div>
        </div>
      </div>
      <div class="works-grid">
        <div class="work-card reveal reveal-delay-1">
          <div class="work-card-thumb"><div class="thumb-placeholder" style="background:linear-gradient(135deg,#fce4ec,#f8bbd0)">👟</div></div>
          <div class="work-card-info"><h5>05高二 | 平价鞋分享👟鞋好不好看校裤知道</h5><div class="card-stats"><span class="likes">♥ 4171</span></div></div>
        </div>
        <div class="work-card reveal reveal-delay-2">
          <div class="work-card-thumb"><div class="thumb-placeholder" style="background:linear-gradient(135deg,#e8eaf6,#c5cae9)">👗</div></div>
          <div class="work-card-info"><h5>05女高 | 平价鞋分享 鞋好不好看校裤知道</h5><div class="card-stats"><span class="likes">♥ 1.9万</span></div></div>
        </div>
        <div class="work-card reveal reveal-delay-3">
          <div class="work-card-thumb"><div class="thumb-placeholder" style="background:linear-gradient(135deg,#fff3e0,#ffe0b2)"></div></div>
          <div class="work-card-info"><h5>高中生🎒 | 开学清单教室好物干货分享</h5><div class="card-stats"><span class="likes">♥ 1万</span></div></div>
        </div>
        <div class="work-card reveal reveal-delay-1">
          <div class="work-card-thumb"><div class="thumb-placeholder" style="background:linear-gradient(135deg,#e8f5e9,#c8e6c9)"></div></div>
          <div class="work-card-info"><h5>准高一 | 第一次住宿🎒宿舍好物分享</h5><div class="card-stats"><span class="likes">♥ 4399</span></div></div>
        </div>
        <div class="work-card reveal reveal-delay-2">
          <div class="work-card-thumb"><div class="thumb-placeholder" style="background:linear-gradient(135deg,#fce4ec,#f8bbd0)">💝</div></div>
          <div class="work-card-info"><h5>高三😭 | 超级重量感🎧治愈歌曲分享</h5><div class="card-stats"><span class="likes">♥ 5314</span></div></div>
        </div>
        <div class="work-card reveal reveal-delay-3">
          <div class="work-card-thumb"><div class="thumb-placeholder" style="background:linear-gradient(135deg,#f3e5f5,#e1bee7)"></div></div>
          <div class="work-card-info"><h5>05女高中生 | 平价书包分享🎒</h5><div class="card-stats"><span class="likes">♥ 1837</span></div></div>
        </div>
        <div class="work-card reveal reveal-delay-1">
          <div class="work-card-thumb"><div class="thumb-placeholder" style="background:linear-gradient(135deg,#e0f7fa,#b2ebf2)">✨</div></div>
          <div class="work-card-info"><h5>高三 | 缓解压力幸福感续命好物分享</h5><div class="card-stats"><span class="likes">♥ 1362</span></div></div>
        </div>
        <div class="work-card reveal reveal-delay-2">
          <div class="work-card-thumb"><div class="thumb-placeholder" style="background:linear-gradient(135deg,#fff8e1,#ffecb3)">🍀</div></div>
          <div class="work-card-info"><h5>05高三 | 提升幸福感教室实用好物</h5><div class="card-stats"><span class="likes">♥ 1118</span></div></div>
        </div>
        <div class="work-card reveal reveal-delay-3">
          <div class="work-card-thumb"><div class="thumb-placeholder" style="background:linear-gradient(135deg,#fce4ec,#f48fb1)">🏡</div></div>
          <div class="work-card-info"><h5>准高一 | 超级值!! 六年住宿经验分享</h5><div class="card-stats"><span class="likes">♥ 4487</span></div></div>
        </div>
      </div>
    </div>

    <div class="data-showcase">
      <div class="data-card-left reveal reveal-delay-1">
        <div class="video-preview">
          <div class="video-preview-inner">
            <span class="pin-badge">置顶</span>
            <div class="play-overlay">▶</div>
            <div class="video-title">Day1 vlog</div>
            <div class="video-views"><span class="play-icon">▶</span><span>3.2万</span></div>
          </div>
        </div>
      </div>
      <div class="phone-mockups">
        <div class="reveal reveal-delay-2">
          <div class="phone-frame">
            <div class="phone-screen">
              <div class="phone-notch"></div>
              <div class="phone-content">
                <div style="text-align:center;font-size:0.75rem;color:#999;margin-bottom:0.5rem">作品实时数据表现</div>
                <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.5rem;text-align:center;margin-bottom:0.8rem">
                  <div><div style="font-size:1.2rem;font-weight:700">3.25万</div><div style="font-size:0.6rem;color:#999">播放量</div></div>
                  <div><div style="font-size:1.2rem;font-weight:700">92</div><div style="font-size:0.6rem;color:#999">弹幕量</div></div>
                  <div><div style="font-size:1.2rem;font-weight:700">412</div><div style="font-size:0.6rem;color:#999">点赞量</div></div>
                </div>
                <div style="background:#f5f5f5;border-radius:20px;padding:0.4rem;text-align:center;font-size:0.65rem;color:#666">查看作品详细数据</div>
                <div style="margin-top:0.8rem;text-align:center">
                  <span style="display:inline-block;width:6px;height:6px;background:#4caf50;border-radius:50%;margin-right:4px"></span>
                  <span style="font-size:0.6rem;color:#4caf50">作品状态正常</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="notebook-deco reveal reveal-delay-3">
          <div class="notebook-ring"></div><div class="notebook-ring"></div><div class="notebook-ring"></div>
          <div class="notebook-ring"></div><div class="notebook-ring"></div><div class="notebook-ring"></div><div class="notebook-ring"></div>
        </div>
        <div class="reveal reveal-delay-4">
          <div class="phone-frame">
            <div class="phone-screen">
              <div class="phone-notch"></div>
              <div class="phone-content">
                <div style="display:flex;gap:0.5rem;border-bottom:1px solid #f0f0f0;padding-bottom:0.5rem;margin-bottom:0.5rem">
                  <span style="font-size:0.7rem;font-weight:600">互动消息</span>
                  <span style="font-size:0.7rem;color:#999">新关注我的</span>
                </div>
                <div style="display:flex;align-items:center;gap:0.5rem;padding:0.3rem 0;border-bottom:1px solid #f8f8f8">
                  <div style="width:28px;height:28px;border-radius:50%;background:#fce4ec;flex-shrink:0"></div>
                  <div style="flex:1;font-size:0.6rem;color:#666"><strong style="color:#333">圆圆</strong> 赞了你的图文</div>
                  <div style="width:24px;height:24px;border-radius:3px;background:#e8e8e8;flex-shrink:0"></div>
                </div>
                <div style="display:flex;align-items:center;gap:0.5rem;padding:0.3rem 0;border-bottom:1px solid #f8f8f8">
                  <div style="width:28px;height:28px;border-radius:50%;background:#e8f5e9;flex-shrink:0"></div>
                  <div style="flex:1;font-size:0.6rem;color:#666"><strong style="color:#333">HUK</strong> 等 79 人近期访问过你的主页</div>
                  <div style="width:24px;height:24px;border-radius:3px;background:#e8e8e8;flex-shrink:0"></div>
                </div>
                <div style="display:flex;align-items:center;gap:0.5rem;padding:0.3rem 0;border-bottom:1px solid #f8f8f8">
                  <div style="width:28px;height:28px;border-radius:50%;background:#fff3e0;flex-shrink:0"></div>
                  <div style="flex:1;font-size:0.6rem;color:#666"><strong style="color:#333">十秋.</strong> 等 70 人近期访问过你的主页</div>
                  <div style="width:24px;height:24px;border-radius:3px;background:#e8e8e8;flex-shrink:0"></div>
                </div>
                <div style="display:flex;align-items:center;gap:0.5rem;padding:0.3rem 0;border-bottom:1px solid #f8f8f8">
                  <div style="width:28px;height:28px;border-radius:50%;background:#fce4ec;flex-shrink:0"></div>
                  <div style="flex:1;font-size:0.6rem;color:#666"><strong style="color:#333">九月 .</strong> 收藏了你的图文</div>
                  <div style="width:24px;height:24px;border-radius:3px;background:#e8e8e8;flex-shrink:0"></div>
                </div>
                <div style="display:flex;align-items:center;gap:0.5rem;padding:0.3rem 0">
                  <div style="width:28px;height:28px;border-radius:50%;background:#fff8e1;flex-shrink:0"></div>
                  <div style="flex:1;font-size:0.6rem;color:#666"><strong style="color:#333">创作里程碑</strong> 累计 6 万人浏览了你的作品</div>
                  <div style="width:24px;height:24px;border-radius:3px;background:#e8e8e8;flex-shrink:0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="footer-deco">♡</div>
  <p>感谢你的观看 · Thanks for watching</p>
  <p style="margin-top:0.5rem;font-size:0.9rem;opacity:0.6">© 2025 早川池子 · 南京传媒学院</p>
</footer>

<script>
(function(){'use strict';
var reveals=document.querySelectorAll('.reveal');
var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting)entry.target.classList.add('visible')})},{threshold:0.1,rootMargin:'0px 0px -50px 0px'});
reveals.forEach(function(el){observer.observe(el)});
var nav=document.getElementById('nav');
var navLinks=document.querySelectorAll('.nav-links a');
var sections=document.querySelectorAll('section');
var navObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){var id=entry.target.getAttribute('id');navLinks.forEach(function(link){link.classList.toggle('active',link.getAttribute('href')==='#'+id)})}})},{threshold:0.3,rootMargin:'-80px 0px -50% 0px'});
sections.forEach(function(s){navObserver.observe(s)});
window.addEventListener('scroll',function(){nav.classList.toggle('scrolled',window.pageYOffset>50)},{passive:true});
var hamburger=document.getElementById('hamburger');
var navMenu=document.getElementById('navLinks');
hamburger.addEventListener('click',function(){hamburger.classList.toggle('active');navMenu.classList.toggle('open')});
navLinks.forEach(function(link){link.addEventListener('click',function(){hamburger.classList.remove('active');navMenu.classList.remove('open')})});
document.addEventListener('click',function(e){if(!nav.contains(e.target)){hamburger.classList.remove('active');navMenu.classList.remove('open')}});
navLinks.forEach(function(link){link.addEventListener('click',function(e){e.preventDefault();var target=document.querySelector(link.getAttribute('href'));if(target){window.scrollTo({top:target.offsetTop-nav.offsetHeight,behavior:'smooth'})}})});
var heroContent=document.querySelector('.hero-content');
if(heroContent){heroContent.style.opacity='0';heroContent.style.transform='translateY(30px)';heroContent.style.transition='opacity 1.2s ease,transform 1.2s ease';window.addEventListener('load',function(){setTimeout(function(){heroContent.style.opacity='1';heroContent.style.transform='translateY(0)'},200)})}
document.querySelectorAll('.work-card').forEach(function(card){card.addEventListener('mouseenter',function(){card.style.transform='translateY(-8px) scale(1.02)'});card.addEventListener('mouseleave',function(){card.style.transform='translateY(0) scale(1)'})});
var decoEls=document.querySelectorAll('.deco-star,.deco-plus,.deco-circle');
window.addEventListener('scroll',function(){var scrolled=window.pageYOffset;decoEls.forEach(function(el,i){el.style.transform='translateY('+(scrolled*(0.02+i*0.01))+'px)'})},{passive:true});
})();
</script>
</body>
</html>`;

const target = path.join(process.env.USERPROFILE, 'Desktop', 'portfolio', 'index.html');
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, html, 'utf8');
console.log('File written successfully to:', target);
console.log('File size:', fs.statSync(target).size, 'bytes');
