<?php
namespace Drupal\vue_intranet_widget\Plugin\Block;
use Drupal\Core\Block\BlockBase;

/**
 * @Block(id = "user_directory_block", admin_label = @Translation("Vue: User Directory"))
 */
class UserDirectoryBlock extends BlockBase {
  public function build() {
    $current_user = \Drupal::currentUser();
    return [
      '#markup' => '<div id="vue-directory-mount"></div>',
      '#attached' => [
        'library' => [
          'vue_intranet_widget/vue_app',
        ],
        'drupalSettings' => [
          'vue_intranet_widget' => [
            'api_base' => '/jsonapi',
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
