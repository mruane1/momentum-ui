import { ThemeNameValues } from "@/components/theme/Theme";
import { boolean, select } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "./Accordion";
import mdx from "./Accordion.mdx";
import "./AccordionItem";

export default {
  title: "Components/Accordion",
  component: "md-accordion",
  parameters: {
    a11y: {
      element: "md-accordion"
    },
    docs: {
      page: mdx
    }
  }
};

export const Accordion = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const disabled = boolean("disabled", false);
  const expanded = boolean("expanded", false);
  const multiple = boolean("multiple", false);

  return html`
    <md-theme class="theme-toggle" id="activity-button" ?darkTheme=${darkTheme} theme=${theme}>
      <md-accordion ?multiple=${multiple}>
        <md-accordion-item slot="accordion-item" label="Header №1" ?expanded=${expanded}>
          <div>Panel №1</div>
        </md-accordion-item>
        <md-accordion-item slot="accordion-item" label="Header №2" ?disabled=${disabled}>
          <div>Panel №2</div>
        </md-accordion-item>
        <md-accordion-item slot="accordion-item" label="Header №3">
          <div>Panel №3</div>
        </md-accordion-item>
      </md-accordion>
    </md-theme>
  `;
};
