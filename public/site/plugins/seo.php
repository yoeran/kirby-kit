<?php

  class SEO {

    public static function tags () {
      $tags = array();

      $pageDescription = self::getValue(array(
        page()->seo_description(),
        page()->description(),
        site()->seo_description(),
        site()->description()
      ));

      $pageKeywords = self::getValue(array(
        page()->keywords(),
        site()->keywords()
      ));

      self::setTitle($tags);

      self::setMetaProperty($tags, 'description', $pageDescription);
      self::setMetaProperty($tags, 'keywords', $pageKeywords);

      self::setOgProperty($tags, 'description', $pageDescription);
      self::setOgProperty($tags, 'site_name', site()->title());
      self::setOgProperty($tags, 'title', page()->title());
      self::setOgProperty($tags, 'type', array(site()->seo_type(), 'website'));
      self::setOgProperty($tags, 'url', page()->url());

      self::renderTags($tags);
    }

    private function setMetaProperty (&$tags, $propName, $propValues) {
      self::createProperty($tags, 'name', $propName, $propValues);
    }

    private function setOgProperty (&$tags, $propName, $propValues) {
      self::createProperty($tags, 'property', 'og:' . $propName, $propValues);
    }

    private function createProperty (&$tags, $propKey, $propName, $propValues) {
      $propValue = self::getValue($propValues);
      if ($propValue) {
        array_push($tags,
          new Brick('meta', false, array(
            $propKey => $propName,
            'content' => $propValue
          ))
        );
      }
    }

    private function setTitle (&$tags) {
      $pageTitle = site()->page()->title();
      $siteTitle = site()->title();
      $divider = site()->title_divider()->isNotEmpty() ? site()->title_divider() : '|';

      array_push($tags,
        new Brick('title', "{$pageTitle} {$divider} {$siteTitle}")
      );
    }

    private function getValue ($values) {
      if (is_array($values)) {
        foreach ($values as $val) {
          if (trim($val) !== "" && $val != false) {
            return $val;
          }
        }
        return false;
      } else {
        return $values;
      }
    }

    private function renderTags($tags) {
      echo implode($tags, "\n");
    }
  }
