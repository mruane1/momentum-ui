/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/menu/Menu";
import "@/components/menu/MenuItem";
import { ThemeNameValues } from "@/components/theme/Theme";
import { boolean, select, text } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Components/Menu",
  component: "md-menu",
  parameters: {
    a11y: {
      element: "md-menu"
    }
  }
};

const menuDirection = ["horizontal", "vertical"];

export const Menu = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const direction = select("Direction", menuDirection, "horizontal");
  const justified = boolean("Justified", false);
  const disabled = boolean("Disabled", false);
  const href = text("href", "");

  return html`
    <md-theme class="theme-toggle" style="width: 100%;" id="menu" ?darkTheme=${darkTheme} theme=${theme}>
      <md-menu .direction="${direction}" .justified=${justified}>
        <md-menu-item>
          <md-icon name="recents-bold" size="16" iconSet="momentumDesign"></md-icon>
          <span>Contact History</span>
        </md-menu-item>
        <md-menu-item .disabled=${disabled}>
          <md-icon name="apps-bold" size="16" iconSet="momentumDesign"></md-icon>
          <span>Cisco WxM</span>
        </md-menu-item>
        <md-menu-item href="${href}">
          <md-icon name="cancel-bold" size="16" iconSet="momentumDesign"></md-icon>
          <span>Cisco Test</span>
        </md-menu-item>
        <md-menu-item>
          <md-icon name="favorite-bold" size="16" iconSet="momentumDesign"></md-icon>
          <span>Cisco Favorite</span>
        </md-menu-item>
        <md-menu-item>
          <md-icon name="alarm-bold" size="16" iconSet="momentumDesign"></md-icon>
          <span>Cisco Answer</span>
        </md-menu-item>
      </md-menu>
    </md-theme>
  `;
};
