# Kirby CMS Starter kit with Gulp
A template to kickstart a new project using Kirby CMS.
Using Gulp for handling SCSS, Javascript and Bower packages.

#### Contents
- Takes Bower packages into account
- Lints and uglifies Javascript
- Compiles SCSS and uses Autoprefixer

## Installation
- Download the Kirby CMS and place the contents in the folder named `public/`.
- Add `define(ENV, 'development');` to `public/index.php`
- Refer to CSS and JS files with `<?php echo FTMD::css('main'); ?>` (this would load: assets/styles/main.css in development)
