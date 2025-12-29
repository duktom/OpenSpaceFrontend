import { expect } from 'detox';

describe('Authentication', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('shows login form on initial launch', async () => {
    await expect(element(by.id('AUTH.FORM_CONTAINER'))).toBeVisible();
    await expect(element(by.id('AUTH.FORM_CONTAINER.TITLE'))).toBeVisible();
    await expect(element(by.id('AUTH.FORM_CONTAINER.EMAIL_INPUT'))).toBeVisible();
    await expect(element(by.id('AUTH.FORM_CONTAINER.PASSWORD_INPUT'))).toBeVisible();
    await expect(element(by.id('AUTH.FORM_CONTAINER.SUBMIT_BUTTON'))).toBeVisible();
    await expect(element(by.id('AUTH.FORM_CONTAINER.TOGGLE_LOGIN_REGISTER_BUTTON'))).toBeVisible();
  });

  describe('User session flow', () => {
    it('logs in successfully with valid credentials', async () => {
      await element(by.id('AUTH.FORM_CONTAINER.EMAIL_INPUT')).typeText('test@gmail.com');
      await element(by.id('AUTH.FORM_CONTAINER.PASSWORD_INPUT')).typeText('password');
      await element(by.id('AUTH.FORM_CONTAINER.SUBMIT_BUTTON')).tap();

      await expect(element(by.id('HOME.SCREEN_CONTAINER'))).toBeVisible();
      await expect(element(by.id('AUTH.FORM_CONTAINER'))).not.toBeVisible();
    });

    it('persists active session after reload', async () => {
      await device.reloadReactNative();
      await waitFor(element(by.id('HOME.SCREEN_CONTAINER')))
        .toBeVisible()
        .withTimeout(20000);
    });

    it('logs out successfully', async () => {
      await expect(element(by.id('HOME.SCREEN_CONTAINER'))).toBeVisible();

      await element(by.id('HOME.LIST.SCROLL_VIEW')).scrollTo('bottom');
      await element(by.id('HOME.LOGOUT_BUTTON')).tap();

      await expect(element(by.id('AUTH.FORM_CONTAINER'))).toBeVisible();
    });

    it('persists logged-out state after reload', async () => {
      await device.reloadReactNative();
      await waitFor(element(by.id('AUTH.FORM_CONTAINER')))
        .toBeVisible()
        .withTimeout(20000);
    });
  });

  describe('Register user', () => {
    it('shows full register user form', async () => {
      await element(by.id('AUTH.FORM_CONTAINER.TOGGLE_LOGIN_REGISTER_BUTTON')).tap();
      await expect(element(by.id('AUTH.FORM_CONTAINER'))).toBeVisible();
      await element(by.id('AUTH.FORM_CONTAINER.REGISTER_USER_BUTTON')).tap();
      await expect(element(by.id('AUTH.FORM_CONTAINER.REGISTER_COMPANY_BUTTON'))).toBeVisible();

      await expect(element(by.id('AUTH.FORM_CONTAINER.FIRST_NAME_INPUT'))).toBeVisible();
      await expect(element(by.id('AUTH.FORM_CONTAINER.LAST_NAME_INPUT'))).toBeVisible();
      await expect(element(by.id('AUTH.FORM_CONTAINER.EMAIL_INPUT'))).toBeVisible();
      await expect(element(by.id('AUTH.FORM_CONTAINER.PASSWORD_INPUT'))).toBeVisible();
      await expect(element(by.id('AUTH.FORM_CONTAINER.CONFIRM_PASSWORD_INPUT'))).toBeVisible();

      await expect(element(by.id('AUTH.FORM_CONTAINER.SUBMIT_BUTTON'))).toBeVisible();
      await expect(
        element(by.id('AUTH.FORM_CONTAINER.TOGGLE_LOGIN_REGISTER_BUTTON'))
      ).toBeVisible();
      await element(by.id('AUTH.FORM_CONTAINER.TOGGLE_LOGIN_REGISTER_BUTTON')).tap();
    });

    // Should register & login user
  });

  describe('Register company', () => {
    it('shows full register company form', async () => {
      await element(by.id('AUTH.FORM_CONTAINER.TOGGLE_LOGIN_REGISTER_BUTTON')).tap();
      await expect(element(by.id('AUTH.FORM_CONTAINER'))).toBeVisible();
      await expect(element(by.id('AUTH.FORM_CONTAINER.REGISTER_USER_BUTTON'))).toBeVisible();
      await element(by.id('AUTH.FORM_CONTAINER.REGISTER_COMPANY_BUTTON')).tap();

      await expect(element(by.id('AUTH.FORM_CONTAINER.COMPANY_NAME_INPUT'))).toBeVisible();
      await expect(element(by.id('AUTH.FORM_CONTAINER.EIN_INPUT'))).toBeVisible();
      await expect(element(by.id('AUTH.FORM_CONTAINER.EMAIL_INPUT'))).toBeVisible();
      await expect(element(by.id('AUTH.FORM_CONTAINER.PASSWORD_INPUT'))).toBeVisible();
      await expect(element(by.id('AUTH.FORM_CONTAINER.CONFIRM_PASSWORD_INPUT'))).toBeVisible();

      await expect(element(by.id('AUTH.FORM_CONTAINER.SUBMIT_BUTTON'))).toBeVisible();
      await expect(
        element(by.id('AUTH.FORM_CONTAINER.TOGGLE_LOGIN_REGISTER_BUTTON'))
      ).toBeVisible();
      await element(by.id('AUTH.FORM_CONTAINER.TOGGLE_LOGIN_REGISTER_BUTTON')).tap();
    });

    // Should register & login company
  });
});
