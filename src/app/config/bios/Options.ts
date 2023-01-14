import {biosOptionElement} from "../../bios/components/configuration/ConfigurationElements";
import {BiosConfigurationOptionsInterface} from "../../bios/components/configuration/interface/BiosConfiguration";

export const BIOS_OPTIONS: BiosConfigurationOptionsInterface[] = [
  {
    name: "Main",
    options: [
      biosOptionElement("information", {
        name: "NULL",
        value: "NULL"
      }),
      biosOptionElement("action", {
        name: "NULL",
        valueTest: "NULL",
        action: () => {}
      })
    ]
  },
  {
    name: "Advanced",
    options: []
  },
  {
    name: "Boot",
    options: []
  },
  {
    name: "Tools",
    options: []
  },
  {
    name: "Exit",
    options: []
  }
]

