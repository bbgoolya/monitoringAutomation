import { test, expect } from '@playwright/test';
const { KeycloakPage } = require('../src/pages/keycloakPage');
const { BasePage } = require('../src/pages/base-page');
// const { HeaderPage } = require('../../pages/header-page');
// const { SidebarPage } = require('../../pages/sidebar-page');
// const { DataPage } = require('../../pages/data-page');

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

test('Auth', async ({ page, baseURL, context }) => {
  const keycloak = new KeycloakPage(page);
  const base = new BasePage(page);

  await base.goto(baseURL);
//   await keycloak.loginFormVisible();
  await keycloak.login(username, password);
  await new Promise((r) => setTimeout(r, 5000));

});
