import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import DirectoryPage from '../DirectoryPage.vue';
import UserSearch from '../../components/UserSearch.vue';
import UserDirectory from '../../components/UserDirectory.vue';
import { createTestingPinia } from '@pinia/testing';

describe('DirectoryPage.vue', () => {
  it('renders the header text and descriptions correctly', () => {
    // shallowMount ensures we don't deeply render the child components, 
    // keeping this test fast and isolated.

    const wrapper = shallowMount(DirectoryPage, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false 
          })
        ],
      },
    });
    // Assert the text content exists
    expect(wrapper.text()).toContain('Directory');
    expect(wrapper.text()).toContain('Colleague directory');
    expect(wrapper.text()).toContain('Search people and open their Drupal profile page from the same view.');
  });

  it('renders the UserSearch child component', () => {
    const wrapper = shallowMount(DirectoryPage);
    
    // Check if the component was found in the DOM
    const searchComponent = wrapper.findComponent(UserSearch);
    expect(searchComponent.exists()).toBe(true);
  });

  it('renders the UserDirectory child component', () => {
    const wrapper = shallowMount(DirectoryPage);
    
    // Check if the component was found in the DOM
    const directoryComponent = wrapper.findComponent(UserDirectory);
    expect(directoryComponent.exists()).toBe(true);
  });
});