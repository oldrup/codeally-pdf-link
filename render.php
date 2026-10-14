<?php
/**
 * Dynamic Block Template: Codeally PDF Link
 *
 * Runs when the plugin is enabled. Queries live database information via fileId
 * so media library title/file updates are reflected automatically across the site.
 *
 * @var array $attributes Block attributes passed from Gutenberg.
 */

declare(strict_types=1);

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$file_id = (int) ( $attributes['fileId'] ?? 0 );

if ( ! $file_id ) {
    return;
}

// Get intrinsic thumbnail image data, passing 'true' as the 3rd argument to enable the icon fallback: [ url, width, height ]
$image_data = wp_get_attachment_image_src( $file_id, 'thumbnail', true );
if ( ! $image_data ) {
    return;
}

[ $src, $width, $height ] = $image_data;

// If falling back to the core generic icon, override dimensions to match JS editor defaults for visual consistency.
if ( str_contains( $src, 'wp-includes/images/media/' ) ) {
    $width  = 192;
    $height = 272;
}

$file_url   = wp_get_attachment_url( $file_id ) ?: '';
$file_title = get_the_title( $file_id ) ?: __( 'Download Document', 'codeally-pdf-link' );
?>

<div <?php
    // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- get_block_wrapper_attributes() escapes output internally.
    echo get_block_wrapper_attributes( array(
        'style' => sprintf(
            '--cdly-pdf-thumb-url: url(\'%s\'); --cdly-pdf-ratio: %d / %d;',
            esc_url( $src ),
            (int) $width,
            (int) $height
        ),
    ) );
?>>
    <a href="<?php echo esc_url( $file_url ); ?>" class="cdly-pdf-link__link" type="application/pdf">
        <?php echo esc_html( $file_title ); ?>
        <span class="screen-reader-text">
            <?php echo esc_html__( '(PDF)', 'codeally-pdf-link' ); ?>
        </span>
    </a>
</div>