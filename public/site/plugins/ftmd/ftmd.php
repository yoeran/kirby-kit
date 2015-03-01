<?php

class FTMD {

  static function css( $fileName ) {
    $sep = ( ENV == 'production' ) ? '.min' : '';
    return css( "assets/styles/{$fileName}{$sep}.css" );
  }

  static function js( $fileName ) {
    $sep = ( ENV == 'production' ) ? '.min' : '';
    return js( "assets/scripts/{$fileName}{$sep}.js" );
  }
}
