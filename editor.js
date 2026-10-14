/**
 * Editor Script: Codeally PDF Link
 *
 * Native, build-step-free Gutenberg block script using vanilla WordPress dependencies.
 */
( function ( wp ) {
    const { registerBlockType } = wp.blocks;
    const { MediaUpload, MediaUploadCheck, InspectorControls, useBlockProps } = wp.blockEditor;
    const { Button, PanelBody, Placeholder } = wp.components;
    const { createElement: el } = wp.element;
    const { __ } = wp.i18n;

    /**
     * Extracts root-relative path (/wp-content/uploads/...) from full URL.
     * Guarantees domain migrations do not break stored fallback links.
     */
    const getRelativePath = function ( fullUrl ) {
        if ( ! fullUrl ) return '';
        try {
            return new URL( fullUrl ).pathname;
        } catch ( e ) {
            return fullUrl;
        }
    };

    registerBlockType( 'cdly/pdf-link', {
        edit: function ( props ) {
            const { attributes, setAttributes } = props;
            const { fileId, relativeFileUrl, fileTitle, relativeThumbUrl, width, height } = attributes;

            // Single top-level wrapper receiving CSS vars and Gutenberg supports
            const blockProps = useBlockProps( {
                style: {
                    '--cdly-pdf-thumb-url': relativeThumbUrl ? "url('" + relativeThumbUrl + "')" : undefined,
                    '--cdly-pdf-ratio': width && height ? width + ' / ' + height : undefined,
                },
            } );

            const onSelectMedia = function ( media ) {
                const thumb = media.sizes && media.sizes.thumbnail ? media.sizes.thumbnail : null;

                setAttributes( {
                    fileId: media.id,
                    relativeFileUrl: getRelativePath( media.url ),
                    fileTitle: media.title || media.filename || __( 'Download Document', 'codeally-pdf-link' ),
                    relativeThumbUrl: getRelativePath( thumb ? thumb.url : ( media.icon || '' ) ),
                    width: thumb ? thumb.width : 192,
                    height: thumb ? thumb.height : 272,
                } );
            };

            const mediaPickerButton = el(
                MediaUploadCheck,
                {},
                el( MediaUpload, {
                    onSelect: onSelectMedia,
                    allowedTypes: [ 'application/pdf' ],
                    multiple: false,
                    value: fileId,
                    render: function ( obj ) {
                        return el(
                            Button,
                            {
                                variant: 'primary',
                                onClick: obj.open,
                            },
                            fileId 
                                ? __( 'Replace PDF Link', 'codeally-pdf-link' )
                                : __( 'Select PDF Link', 'codeally-pdf-link' )
                        );
                    },
                } )
            );

            const inspector = el(
                InspectorControls,
                {},
                el(
                    PanelBody,
                    { title: __( 'PDF Settings', 'codeally-pdf-link' ), initialOpen: true },
                    mediaPickerButton
                )
            );

            // 1. Placeholder state (no file selected)
            if ( ! fileId ) {
                return el(
                    'div',
                    blockProps,
                    inspector,
                    el(
                        Placeholder,
                        {
                            icon: 'pdf',
                            label: __( 'Codeally PDF Link', 'codeally-pdf-link' ),
                            instructions: __( 'Select a PDF Link from the media library to generate the preview link.', 'codeally-pdf-link' ),
                        },
                        mediaPickerButton
                    )
                );
            }

            // 2. Direct Canvas Render (1:1 with frontend, zero double-padding)
            return el(
                'div',
                blockProps,
                inspector,
                el(
                    'a',
                    {
                        href: relativeFileUrl,
                        className: 'cdly-pdf-link__link',
                        type: 'application/pdf',
                        onClick: function ( e ) {
                            e.preventDefault(); // Prevent link click inside the block editor
                        },
                    },
                    fileTitle,
                    el(
                        'span',
                        { className: 'screen-reader-text' },
                        ' ' + __( '(PDF)', 'codeally-pdf-link' )
                    )
                )
            );
        },

        /**
         * STATIC FALLBACK SAVER
         */
        save: function ( props ) {
            const { attributes } = props;
            const { relativeFileUrl, fileTitle, relativeThumbUrl, width, height } = attributes;

            if ( ! relativeFileUrl ) {
                return null;
            }

            const blockProps = useBlockProps.save( {
                style: {
                    '--cdly-pdf-thumb-url': relativeThumbUrl ? "url('" + relativeThumbUrl + "')" : undefined,
                    '--cdly-pdf-ratio': width && height ? width + ' / ' + height : undefined,
                },
            } );

            return el(
                'div',
                blockProps,
                el(
                    'a',
                    {
                        href: relativeFileUrl,
                        className: 'cdly-pdf-link__link',
                        type: 'application/pdf',
                    },
                    fileTitle,
                    el(
                        'span',
                        { className: 'screen-reader-text' },
                        ' ' + __( '(PDF)', 'codeally-pdf-link' )
                    )
                )
            );
        },
    } );
} )( window.wp );