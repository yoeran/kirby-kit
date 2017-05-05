<?php

$ignore = array('sitemap', 'error');

// send the right header
header('Content-type: text/xml; charset="utf-8"');

// echo the doctype
echo '<?xml version="1.0" encoding="utf-8"?>';

?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc><?php echo html($site->url()) ?></loc>
    <lastmod><?php echo $site->modified('c') ?></lastmod>
    <priority>0.5</priority>
  </url>

  <?php foreach($pages->index()->visible() as $p): ?>
  <?php if(in_array($p->uri(), $ignore)) continue; ?>
  <url>
    <loc><?php echo html($p->url()) ?></loc>
    <lastmod><?php echo $p->modified('c') ?></lastmod>
    <priority><?php echo number_format(0.5/$p->depth(), 1) ?></priority>
  </url>
  <?php endforeach ?>
</urlset>
