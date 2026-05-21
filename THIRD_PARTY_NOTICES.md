# Third-party notices

`@procurifai/maritime-ui` is a clean-room rewrite of the OpenBridge design
language. No OpenBridge source code is incorporated; the design language was
re-implemented from the publicly available OpenBridge Figma community file
(CC BY 4.0) and the IEC 62288 standard for bridge equipment displays.

## OpenBridge

- Project: https://www.openbridge.no/
- Code repository: https://github.com/OpenBridge-org/openbridge-webcomponents
- License: Apache License, Version 2.0
- Figma file license: Creative Commons Attribution 4.0 International (CC BY 4.0)

The Apache 2.0 NOTICE file from the OpenBridge project is preserved below.

```
OpenBridge Web Components
Copyright 2023 OpenBridge contributors

This product includes software developed by the OpenBridge organisation
(https://www.openbridge.no/).

Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy
of the License at:

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations
under the License.
```

## IEC 62288

The semantic colour palette (`safe` / `caution` / `warning` / `alarm`) and
the four canonical theme variants (`day` / `dusk` / `night` / `bright`) are
informed by IEC 62288:2021 _Maritime navigation and radiocommunication
equipment and systems — Presentation of navigation-related information on
shipborne navigational displays — General requirements, methods of testing
and required test results_.

IEC 62288 is a copyrighted standard published by the International
Electrotechnical Commission. This library does not redistribute the standard;
the semantic categories and luminance characteristics referenced here are
derivative of the publicly known posture (alarm = red, warning = yellow-orange,
caution = yellow, safe = green; day = high-luminance, night = low-luminance
red-shifted) that has been adopted broadly across the maritime industry.

Practitioners should consult the official standard for normative requirements.

## Bundled runtime dependencies

The published `@procurifai/maritime-ui` package bundles no third-party runtime
code beyond its own source. `react` and `react-dom` are listed as peer
dependencies and are NOT vendored.

## Build-time dependencies

The dev-only build, test, and Storybook tooling is enumerated in
`packages/maritime-ui/package.json` (`devDependencies`). Each is used under
the terms of its own licence as declared on npm.
