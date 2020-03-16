import { shallowMount, createLocalVue } from '@vue/test-utils';
import { expect } from 'chai';
import Vuex from 'vuex';
import AddProject from '../../src/views/AddProject.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('AddProject', () => {
  it('isLastDeadlineDateDefine return false when there are one deadline but date isn\'t defined yet', () => {
    const wrapper = shallowMount(AddProject);
    wrapper.vm.$data.addProjectForm.deadlinesDate.push({
      date: '',
    });
    /* eslint-disable no-unused-expressions */
    expect(wrapper.vm.isLastDeadlinesDateDefined).to.be.false;
  });
  it('isDeadlineDateFull return true when reach the deadlines limit', () => {
    const store = {
      state: {
        settings: {
          project: {
            maxDeadlines: 3,
          },
        },
      },
    };
    const wrapper = shallowMount(AddProject, {
      localVue,
      store,
    });
    wrapper.vm.$data.addProjectForm.deadlinesDate.push(
      {},
      {},
    );
    /* eslint-disable no-unused-expressions */
    expect(wrapper.vm.isDeadlinesDateFull).to.be.true;
  });
  it('isDeadlineDateEmpty return true when there are no deadlines', () => {
    const store = {
      state: {
        settings: {
          project: {
            maxDeadlines: 3,
          },
        },
      },
    };
    const wrapper = shallowMount(AddProject, {
      localVue,
      store,
    });
    wrapper.vm.$data.addProjectForm.deadlinesDate.push();
    /* eslint-disable no-unused-expressions */
    expect(wrapper.vm.isDeadlinesDateEmpty).to.be.true;
  });
  it('is deadline added', () => {
    const store = {
      state: {
        settings: {
          project: {
            maxDeadlines: 3,
          },
        },
      },
    };
    const wrapper = shallowMount(AddProject, {
      localVue,
      store,
    });
    expect(wrapper.vm.$data.addProjectForm.deadlinesDate.length).to.equal(1);
    wrapper.vm.addDeadline();
    /* eslint-disable no-unused-expressions */
    expect(wrapper.vm.$data.addProjectForm.deadlinesDate.length).to.equal(2);
  });
  it('deadline was not added if the limit was reached', () => {
    const store = {
      state: {
        settings: {
          project: {
            maxDeadlines: 3,
          },
        },
      },
    };
    const wrapper = shallowMount(AddProject, {
      localVue,
      store,
    });
    wrapper.vm.$data.addProjectForm.deadlinesDate.push(
      {},
      {},
      {},
      {},
    );
    expect(wrapper.vm.$data.addProjectForm.deadlinesDate.length).to.equal(5);
    wrapper.vm.addDeadline();
    /* eslint-disable no-unused-expressions */
    expect(wrapper.vm.$data.addProjectForm.deadlinesDate.length).to.equal(5);
  });
  it('is deadline removed', () => {
    const wrapper = shallowMount(AddProject);
    wrapper.vm.$data.addProjectForm.deadlinesDate.push(
      {},
    );
    expect(wrapper.vm.$data.addProjectForm.deadlinesDate.length).to.equal(2);
    wrapper.vm.removeDeadline();
    /* eslint-disable no-unused-expressions */
    expect(wrapper.vm.$data.addProjectForm.deadlinesDate.length).to.equal(1);
  });
  it('isn\'t deadline removed if there is only one', () => {
    const wrapper = shallowMount(AddProject);
    expect(wrapper.vm.$data.addProjectForm.deadlinesDate.length).to.equal(1);
    wrapper.vm.removeDeadline();
    /* eslint-disable no-unused-expressions */
    expect(wrapper.vm.$data.addProjectForm.deadlinesDate.length).to.equal(1);
  });
});
