<?php
/**
 * Plugin Name:     Slot Fill Test Repo
 * Version:         0.1.0
 * Author:          The WordPress Contributors
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     slot-fill-test-repo
 *
 * @package         create-block
 */
add_action('woocommerce_blocks_loaded', function() {
    require_once __DIR__ . '/slot-fill-test-repo-blocks-integration.php';
	add_action(
		'woocommerce_blocks_cart_block_registration',
		function( $integration_registry ) {
			$integration_registry->register( new SlotFillTestRepo_Blocks_Integration() );
		}
	);
	add_action(
		'woocommerce_blocks_checkout_block_registration',
		function( $integration_registry ) {
			$integration_registry->register( new SlotFillTestRepo_Blocks_Integration() );
		}
	);
});

/**
 * Registers the slug as a block category with WordPress.
 */
function register_SlotFillTestRepo_block_category( $categories ) {
    return array_merge(
        $categories,
        [
            [
                'slug'  => 'slot-fill-test-repo',
                'title' => __( 'SlotFillTestRepo Blocks', 'slot-fill-test-repo' ),
            ],
        ]
    );
}
add_action( 'block_categories_all', 'register_SlotFillTestRepo_block_category', 10, 2 );
