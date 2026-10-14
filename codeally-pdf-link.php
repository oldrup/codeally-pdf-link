<?php
/**
 * Plugin Name:       Codeally PDF Link
 * Plugin URI:        https://github.com/oldrup/codeally-pdf-link
 * Description:       Displays a PDF document link using its Media Library thumbnail preview using CSS only.
 * Version:           1.5.0
 * Requires at least: 6.9
 * Requires PHP:      8.2
 * Author:            Codeally
 * Author URI:        https://codeally.dk
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       codeally-pdf-link
 * Domain Path:       /languages
 */

declare(strict_types=1);

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Registers the block using metadata from block.json and hooks JS translation files.
 */
add_action( 'init', static function (): void {
    $block_type = register_block_type( __DIR__ );

    // Enqueue JS translation files from /languages directory
    if ( $block_type && ! empty( $block_type->editor_script_handles ) ) {
        foreach ( $block_type->editor_script_handles as $handle ) {
            wp_set_script_translations( $handle, 'codeally-pdf-link', plugin_dir_path( __FILE__ ) . 'languages' );
        }
    }
} );

/**
 * Displays an admin notice on the Plugins screen if the server lacks PDF thumbnail support.
 */
add_action( 'admin_notices', static function (): void {
    // 1. Only show this to administrators who can manage plugins.
    if ( ! current_user_can( 'activate_plugins' ) ) {
        return;
    }

    // 2. Unobtrusive UX: Only display the notice on the main Plugins screen.
    $screen = get_current_screen();
    if ( ! $screen || 'plugins' !== $screen->id ) {
        return;
    }

    // 3. Check if WordPress core can natively process PDFs (requires Imagick + Ghostscript).
    if ( wp_image_editor_supports( array( 'mime_type' => 'application/pdf' ) ) ) {
        return;
    }
    ?>
    <div class="notice notice-info is-dismissible">
        <p>
            <strong><?php esc_html_e( 'Codeally PDF Link:', 'codeally-pdf-link' ); ?></strong>
            <?php esc_html_e( 'Your server environment is missing Imagick or Ghostscript. The plugin will still function, but will display a generic fallback icon instead of a PDF thumbnail.', 'codeally-pdf-link' ); ?>
        </p>
    </div>
    <?php
} );