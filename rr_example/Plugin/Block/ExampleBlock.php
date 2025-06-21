<?php

namespace Drupal\rr_example\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Url;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a 'ExampleBlock' block.
 * 
 * @Block(
 *  id = "example_block",
 *  admin_label = @Translation("Example Block"),
 *  category = @Translation("Custom"),
 * )
 */
class ExampleBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * The entity type manager service.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Constructs a new ExampleBlock instance.
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   */
  public function __construct( array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity_type_manager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->entityTypeManager = $entity_type_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(
    ContainerInterface $container,
    array $configuration,
    $plugin_id,
    $plugin_definition
  ) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('entity_type.manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $items = [];

    // Node storage service.
    $node_storage = $this->entityTypeManager->getStorage('node');

    // Get nid of all the article contents which are published and field_show_in_list is set as true and sort by updated time.
    $nids = $node_storage->getQuery()
            ->condition('type', 'article')
            ->condition('status', 1)
            ->condition('field_show_in_list', TRUE)
            ->sort('changed', 'DESC')
            ->accessCheck(TRUE)
            ->execute();
    
    if ($nids) {
        // Load all the nodes retrieved from the above query.
        $nodes_data = $node_storage->loadMultiple($nids);
        foreach($nodes_data as $node_data) {
            // Get node cacnonical url.
            $url = Url::fromRoute('entity.node.canonical', ['node' => $node_data->id()]);
            // Create a link item for each node.
            $items[] = [
                '#type' => 'link',
                '#title' => $node_data->label(),
                '#url' => $url,
            ];
        }
    }

    return [
        '#theme' => 'list_view_article_content',
        '#articles' => $items,
        '#count' => count($items),
        '#cache' => [
            'tags' => ['node_list:article'],
            'contexts' => ['user.permissions']
        ]
    ];

  }
}