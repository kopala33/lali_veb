<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header" id="site-header">
    <div class="container header-container">
        <div class="logo">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>">GeoBrand</a>
        </div>
        <nav class="main-nav">
             <?php
                wp_nav_menu( array(
                    'theme_location' => 'main_menu',
                    'menu_id'        => 'primary-menu',
                ) );
            ?>
        </nav>
        <div class="header-actions">
            <a href="#" class="icon"><i class="fas fa-search"></i></a>
            <a href="#" class="icon"><i class="fas fa-heart"></i></a>
            <a href="<?php echo wc_get_cart_url(); ?>" class="icon"><i class="fas fa-shopping-bag"></i></a>
        </div>
    </div>
</header>