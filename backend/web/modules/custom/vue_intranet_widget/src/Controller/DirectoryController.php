<?php

namespace Drupal\vue_intranet_widget\Controller;

use Drupal\Core\Controller\ControllerBase;

final class DirectoryController extends ControllerBase {

  public function page(): array {
    return [
      '#markup' => '<div id="vue-directory-page-mount"></div>',
      '#attached' => [
        'library' => [
          'vue_intranet_widget/vue_app',
        ],
        'drupalSettings' => [
          'vue_intranet_widget' => [
            'page_type' => 'directory',
          ],
        ],
      ],
    ];
  }

}