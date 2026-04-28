<?php

namespace Drupal\vue_intranet_widget\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Drupal\user\UserInterface;

final class ProfileController extends ControllerBase {

  public function page(string $user_uuid): array {
    $storage = $this->entityTypeManager()->getStorage('user');
    $matches = $storage->loadByProperties(['uuid' => $user_uuid]);
    /** @var \Drupal\user\UserInterface|null $user */
    $user = $matches ? reset($matches) : NULL;

    if (!$user instanceof UserInterface) {
      throw new NotFoundHttpException();
    }

    $profile = [
      'id' => $user->id(),
      'name' => $user->getDisplayName(),
      'email' => $user->getEmail(),
      'roles' => array_values(array_filter($user->getRoles())),
      'isActive' => (bool) $user->isActive(),
      'profileUrl' => '/vue/profile/' . $user->uuid(),
    ];

    $current_user = \Drupal::currentUser();

    return [
      '#markup' => '<div id="vue-profile-mount"></div>',
      '#attached' => [
        'library' => [
          'vue_intranet_widget/vue_app',
        ],
        'drupalSettings' => [
          'vue_intranet_widget' => [
            'profile_user' => $profile,
            'page_type' => 'profile',
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
