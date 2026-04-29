<?php

namespace Drupal\vue_intranet_widget\Controller;

use Drupal\Core\Controller\ControllerBase;

final class DirectoryController extends ControllerBase {

  public function page(): array {
    $current_user = \Drupal::currentUser();
    return [
      '#markup' => '<div id="vue-directory-page-mount"></div>',
      '#attached' => [
        'library' => [
          'vue_intranet_widget/vue_app',
        ],
        'drupalSettings' => [
          'vue_intranet_widget' => [
            'page_type' => 'directory',
            'csrf_token' => \Drupal::csrfToken()->get('rest'),
            'current_user' => [
              'id' => (int) $current_user->id(),
              'name' => $current_user->getAccountName(),
              'roles' => array_values($current_user->getRoles()),
              'isAuthenticated' => $current_user->isAuthenticated(),
            ],
          ],
        ],
      ],
    ];
  }

}
