<?php
namespace Drupal\vue_intranet_widget\Plugin\Block;
use Drupal\Core\Block\BlockBase;

/**
 * @Block(id = "user_search_block", admin_label = @Translation("Vue: User Search"))
 */
class UserSearchBlock extends BlockBase {
  public function build() {
    return [
      '#markup' => '<div id="vue-search-mount"></div>', 
      
      '#attached' => [
        'library' => [
          'vue_intranet_widget/vue_app',
        ],
        'drupalSettings' => [
          'vue_intranet_widget' => [
            'api_base' => '/jsonapi',
          ],
        ],
      ],
    ];
  }
}