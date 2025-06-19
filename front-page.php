<?php get_header(); ?>

<main id="main" class="site-main">

    <!-- Hero Section -->
    <section class="hero-section">
        <video class="hero-video" autoplay loop muted playsinline>
            <source src="https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-mountain-range-at-dawn-4234-large.mp4" type="video/mp4">
        </video>
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <h1>The Soul of Georgia</h1>
            <p>Discover authentic treasures, handcrafted with passion and steeped in history.</p>
            <a href="#collection" class="cta-button">Explore The Collection</a>
        </div>
    </section>

    <!-- Intro Section -->
    <section class="intro-section container">
        <h2>More Than Souvenirs</h2>
        <p>We believe that every item tells a story. From the sun-kissed vineyards of Kakheti to the ancient towers of Svaneti, our collection is a curated journey through the heart of Georgia.</p>
    </section>

    <!-- Product Collection Section -->
    <section class="product-section container" id="collection">
        <div class="grid-container">
             <a href="#" class="product-card item-1"><div class="product-image"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/svanuri-qudi.jpg"></div><div class="product-info"><h3>Svaneti Wool Hat</h3><p class="price">$45</p></div></a>
             <a href="#" class="product-card item-2"><div class="product-image"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/doqi.jpg"></div><div class="product-info"><h3>Terracotta Wine Jug</h3><p class="price">$70</p></div></a>
             <a href="#" class="product-card item-3"><div class="product-image"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/xanjali.jpg"></div><div class="product-info"><h3>Traditional Khanjali</h3><p class="price">$120</p></div></a>
             <a href="#" class="product-card item-4"><div class="product-image"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/leather.jpg"></div><div class="product-info"><h3>Handmade Leather Goods</h3><p class="price">From $80</p></div></a>
             <a href="#" class="product-card item-5"><div class="product-image"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/yanci.jpg"></div><div class="product-info"><h3>Kantsi Drinking Horns</h3><p class="price">$90</p></div></a>
             <a href="#" class="product-card item-6"><div class="product-image"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/nardi.jpg"></div><div class="product-info"><h3>Carved Backgammon</h3><p class="price">$150</p></div></a>
             <a href="#" class="product-card item-7"><div class="product-image"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/saqule.jpg"></div><div class="product-info"><h3>Men's Wallet</h3><p class="price">$85</p></div></a>
        </div>
    </section>

    <!-- Parallax Section -->
    <section class="parallax-section" style="background-image: url('<?php echo get_stylesheet_directory_uri(); ?>/assets/images/parallax-bg.jpg');">
        <div class="hero-overlay"></div>
        <div class="parallax-content container">
            <h2>"Every piece has a story. Let us share it with you."</h2>
        </div>
    </section>

    <!-- Artisans Section -->
    <section class="artisans-section container">
        <div class="intro-section" style="padding:0; margin-bottom: 50px;"><h2>The Hands Behind The Art</h2></div>
        <div class="artisans-grid">
             <div class="artisan-card"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/artisan1.jpg" alt="Artisan 1"><h3>Nino K.</h3><h4>Potter from Imereti</h4><blockquote>"Clay remembers the touch of the hand. I try to make it remember kindness."</blockquote></div>
             <div class="artisan-card"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/artisan2.jpg" alt="Artisan 2"><h3>Levan S.</h3><h4>Woodcarver from Racha</h4><blockquote>"The patterns are not just decoration; they are ancient symbols of protection and prosperity."</blockquote></div>
             <div class="artisan-card"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/artisan3.jpg" alt="Artisan 3"><h3>Mariam B.</h3><h4>Felt Maker from Tusheti</h4><blockquote>"With every hat, I weave a piece of the mountain spirit and the resilience of our people."</blockquote></div>
        </div>
    </section>

</main>

<?php get_footer(); ?>