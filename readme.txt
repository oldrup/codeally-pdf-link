=== Codeally - PDF Link ===
Contributors: oldrup
Tags: pdf, block, media library, download, thumbnail
Requires at least: 6.5
Tested up to: 7.1
Requires PHP: 8.2
Stable tag: 1.3.0-beta.1
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Displays a PDF document link alongside its Media Library thumbnail preview.

== Description ==

A lightweight, native WordPress block that displays a PDF document link alongside its Media Library thumbnail preview.

= Requirements & Dependencies =
* **WordPress:** 6.5 or higher
* **PHP:** 8.2 or higher
* **Server:** **Imagick** PHP extension and **Ghostscript**.

*(Note: If your hosting environment lacks Imagick or Ghostscript, the plugin will still function normally but will fall back to displaying a generic document icon instead of a PDF thumbnail preview.)*

= Key Features =
* **Flexible Layouts:** Choose between vertical alignment styles (Top, Center, Bottom) or a column layout with the link below the thumbnail[cite: 4].
* **Accessible & Hitbox-Optimized:** Both the text link and thumbnail are fully clickable while strictly respecting container padding[cite: 4, 6].
* **Theme Integrated:** Inherits native block supports including padding, background color, text color, and font size[cite: 4].
* **Zero Build Step:** Built natively using standard WordPress scripts[cite: 3, 4].
* **Migration Safe:** Uses root-relative paths (`/wp-content/uploads/...`) for document URLs to prevent broken links during domain migrations[cite: 4].

= Customizing via CSS Custom Properties =
You can override visual styles globally or target a parent Group block to style multiple PDF links simultaneously[cite: 4]. Apply any of the following custom properties in your Theme File Editor, Additional CSS, or a parent Group block's Custom CSS panel[cite: 4]:

* `--cdly-pdf-width`: Controls the thumbnail width (Default: `2.5em`)[cite: 4, 6].
* `--cdly-pdf-gap`: Controls spacing between the thumbnail and link text (Default: `0.5em`)[cite: 4, 6].
* `--cdly-pdf-shadow`: Customizes the thumbnail drop shadow filter (Default: multi-layered `drop-shadow`)[cite: 4, 6].
* `--cdly-pdf-hover`: Filter applied to the thumbnail when hovering over the link (Default: `saturate(115%) contrast(115%)`)[cite: 4, 6].

**Example usage on a parent Group element:**
`
.my-pdf-group {
  --cdly-pdf-width: 4em;
  --cdly-pdf-gap: 1em;
  --cdly-pdf-shadow: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.15));
}
`

= Recommended WordPress Media Settings =
For optimal PDF thumbnail presentation fitting A4 and Letter pages[cite: 4]:
1. Disable hard cropping under **Settings > Media**, as PDF thumbnails vary in aspect ratio[cite: 4].
2. Set thumbnail dimensions to **Width:** `192px` and **Height:** `288px` (1:1.5 aspect ratio)[cite: 4].

== Installation ==

1. Upload the `cdly-pdf-link` directory to the `/wp-content/plugins/` directory[cite: 7].
2. Activate the plugin through the 'Plugins' menu in WordPress[cite: 7].
3. Insert the "Codeally - PDF Link" block in the Gutenberg editor and click **Select PDF Link** to choose a document[cite: 4, 7].

== Frequently Asked Questions ==

= Does this plugin generate PDF thumbnails dynamically? =
No[cite: 4, 7]. The block relies on existing thumbnail images generated automatically by WordPress when a PDF is uploaded to the Media Library[cite: 4, 7].

= What happens if I deactivate the plugin? =
Deactivating the plugin leaves standard functional file links and accessible screen reader text intact in your post content[cite: 4].

== Screenshots ==

1. The PDF Link block in the Gutenberg editor[cite: 4, 7].

== Changelog ==

= 1.3.0-beta.1 =
* Refactored CSS custom properties to concise `--cdly-pdf-*` variables and implemented locally scoped `--_` prefixes.

= 1.2.0-beta.5 =
* Feat: Simplified PDF Thumb Width to font size scale; can be inherited via custom property[cite: 7].

= 1.1.0-beta.1 =
* Chore: Changed block name to PDF Link instead of PDF File to avoid confusion with core block[cite: 7].
* Added "Link Below" column layout style variant[cite: 7].
* Updated layout CSS properties for improved padding isolation and alignment control[cite: 7].