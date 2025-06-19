<?php

function geobrand_setup() {
    // დინამიური მენიუების მხარდაჭერის ჩართვა
    register_nav_menus( array(
        'main_menu' => __( 'Main Menu', 'geobrand' ),
    ) );
}
add_action( 'after_setup_theme', 'geobrand_setup' );


function geobrand_scripts() {
    // 1. ვტვირთავთ ჩვენს მთავარ სტილს (style.css)
    wp_enqueue_style( 'geobrand-main-style', get_stylesheet_uri() );

    // 2. ვტვირთავთ Google Fonts-ს
    wp_enqueue_style( 'geobrand-google-fonts', 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@300;400;500&display=swap', array(), null );
    
    // 3. ვტვირთავთ Font Awesome-ის ხატულებს
    wp_enqueue_style( 'geobrand-font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css', array(), null );

    // 4. ვტვირთავთ JavaScript ფაილს
    // შევქმნათ assets/js/main.js ფაილი და ჩავწეროთ იქ სქროლის ლოგიკა
    wp_enqueue_script( 'geobrand-main-script', get_stylesheet_directory_uri() . '/assets/js/main.js', array(), '1.0', true );
}
add_action( 'wp_enqueue_scripts', 'geobrand_scripts' );

?>