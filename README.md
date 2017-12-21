# Atom Builder
                
This plugin simply allows you to build your page content with widgets instead of using the default page layout for your theme.

By default, only basic pages are supported. It basically registers a widget area for all of your pages.
To avoir cluttering the admin area, the newly registered widget areas do not appear alongside your theme's standard ones, and you have to access them directly in the customizer.

To see it in action :
* Just visit any page on your site while logged in, and click the 'Customize' link. 
* In the Customizer panel, click on 'Widgets' and you should see a widget area registered for your page.
* Just use the widgets you need to build your page content. 

This plugin provides you with 3 additional widgets to help you build your page with interesting content and layout: Atom Builder Page, Atom Builder Post, and Atom Builder Posts widgets.

These basic widgets will probably get a bit more complex and have more options in the future, and a few more custom widgets will be added later, but that's a start.

## Adding theme support for the Atom Builder

By default, the Atom Builder replaces your page content using `the_content` filter. That means any markup you have before, such as the title for example, will be kept. 
Only your content as it appears in the editor in the admin area is replaced.

If you want to replace the whole content for your page, you'll have to tweak your theme's code a little bit.

* Add theme support for the Atom builder in your child theme's `functions.php` file by simply adding this snippet.

```
add_action( 'after_setup_theme', 'mythemeprefix_add_atom_builder_support' );
/**
 * Add theme support for the Atom Builder
 * This deactivate the basic filter on the_content. 
 * Just replace your get_template_part() call in page.php with atom_builder_get_template_part() to replace your whole page content template with registered widgets.
 **/
function mythemeprefix_add_atom_builder_support(){
    add_theme_support( 'atom-builder' );
}
```

* Duplicate the `page.php` template from your theme in your child theme's folder.
* Replace the `get_template_part()` function call with `atom_builder_get_template_part()`, with the same parameters. (Basically all you need to do is prefix it.)
* Now everything should work fine. Your whole template is replaced with widgets now, not just your content.

If you have any questions, email me at [vincentdubroeucq.com](https://vincentdubroeucq.com/contact/ "Contact")

[https://vincentdubroeucq.com](https://vincentdubroeucq.com)

